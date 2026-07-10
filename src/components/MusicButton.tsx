import { useEffect, useRef, useState } from "react";

const musicFiles = import.meta.glob<string>("../assets/music/*.mp3", {
  eager: true,
  import: "default",
  query: "?url",
});

const songUrl = musicFiles["../assets/music/song.mp3"];
const DEFAULT_MUSIC_VOLUME = 0.65;

type MusicState = "missing" | "idle" | "playing" | "paused" | "error";
type MusicVolumeEvent = CustomEvent<{
  volume: number;
  duration?: number;
}>;

export function MusicButton() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const volumeFrameRef = useRef<number | null>(null);
  const [musicState, setMusicState] = useState<MusicState>(
    songUrl ? "idle" : "missing",
  );

  useEffect(() => {
    const handleVolumeChange = (event: Event) => {
      const audio = audioRef.current;

      if (!audio) {
        return;
      }

      const { volume, duration = 1600 } = (event as MusicVolumeEvent).detail;
      const targetVolume = Math.min(1, Math.max(0, volume));
      const startVolume = audio.volume;
      const startTime = performance.now();

      if (volumeFrameRef.current !== null) {
        window.cancelAnimationFrame(volumeFrameRef.current);
      }

      const fadeVolume = (time: number) => {
        const progress = Math.min(1, (time - startTime) / duration);
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        audio.volume = startVolume + (targetVolume - startVolume) * easedProgress;

        if (progress < 1) {
          volumeFrameRef.current = window.requestAnimationFrame(fadeVolume);
        }
      };

      volumeFrameRef.current = window.requestAnimationFrame(fadeVolume);
    };

    window.addEventListener("anniversary:music-volume", handleVolumeChange);

    return () => {
      window.removeEventListener("anniversary:music-volume", handleVolumeChange);

      if (volumeFrameRef.current !== null) {
        window.cancelAnimationFrame(volumeFrameRef.current);
      }

      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  const getAudio = () => {
    if (!songUrl) {
      return null;
    }

    if (!audioRef.current) {
      const audio = new Audio(songUrl);
      audio.loop = true;
      audio.preload = "auto";
      audio.volume = DEFAULT_MUSIC_VOLUME;
      audio.addEventListener("play", () => setMusicState("playing"));
      audio.addEventListener("pause", () => setMusicState("paused"));
      audio.addEventListener("error", () => setMusicState("error"));
      audioRef.current = audio;
    }

    return audioRef.current;
  };

  const toggleMusic = async () => {
    const audio = getAudio();

    if (!audio) {
      return;
    }

    if (!audio.paused) {
      audio.pause();
      return;
    }

    try {
      await audio.play();
    } catch {
      setMusicState("error");
    }
  };

  const labelByState: Record<MusicState, string> = {
    missing: "Sin canción",
    idle: "Reproducir música",
    playing: "Pausar música",
    paused: "Reanudar música",
    error: "Música no disponible",
  };

  const label = labelByState[musicState];

  return (
    <button
      className={`music-button music-button-${musicState}`}
      type="button"
      onClick={toggleMusic}
      disabled={musicState === "missing" || musicState === "error"}
      aria-pressed={musicState === "playing"}
      aria-label={label}
    >
      <span className="music-icon" aria-hidden="true">
        <span />
        <span />
      </span>
      <span>{label}</span>
    </button>
  );
}
