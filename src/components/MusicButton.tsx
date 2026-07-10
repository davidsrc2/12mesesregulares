import { useEffect, useRef, useState } from "react";

const musicFiles = import.meta.glob<string>("../assets/music/*.mp3", {
  eager: true,
  import: "default",
  query: "?url",
});

const songUrl = musicFiles["../assets/music/song.mp3"];

type MusicState = "missing" | "idle" | "playing" | "paused" | "error";

export function MusicButton() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [musicState, setMusicState] = useState<MusicState>(
    songUrl ? "idle" : "missing",
  );

  useEffect(() => {
    return () => {
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
      audio.volume = 0.65;
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
