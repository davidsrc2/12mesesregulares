import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { FinalMessage } from "./components/FinalMessage";
import { IntroScreen } from "./components/IntroScreen";
import { MemoryTable } from "./components/MemoryTable";
import { MusicButton } from "./components/MusicButton";

function App() {
  const shouldReduceMotion = Boolean(useReducedMotion());
  const tableRef = useRef<HTMLElement | null>(null);
  const introTimerRef = useRef<number | null>(null);
  const glowTimerRef = useRef<number | null>(null);
  const [introOpening, setIntroOpening] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);
  const [albumGlow, setAlbumGlow] = useState(false);

  const openMemories = useCallback(() => {
    if (introOpening) {
      return;
    }

    setIntroOpening(true);
    introTimerRef.current = window.setTimeout(
      () => setIntroComplete(true),
      shouldReduceMotion ? 250 : 1500,
    );
  }, [introOpening, shouldReduceMotion]);

  const replayMemories = useCallback(() => {
    tableRef.current?.scrollIntoView({
      behavior: shouldReduceMotion ? "auto" : "smooth",
      block: "start",
    });
  }, [shouldReduceMotion]);

  const startCountdown = useCallback(() => {
    setAlbumGlow(true);
    tableRef.current?.scrollIntoView({
      behavior: shouldReduceMotion ? "auto" : "smooth",
      block: "start",
    });

    if (glowTimerRef.current !== null) {
      window.clearTimeout(glowTimerRef.current);
    }

    glowTimerRef.current = window.setTimeout(
      () => setAlbumGlow(false),
      shouldReduceMotion ? 600 : 4200,
    );
  }, [shouldReduceMotion]);

  const setTableRef = useCallback((node: HTMLElement | null) => {
    tableRef.current = node;
  }, []);

  useEffect(() => {
    return () => {
      if (introTimerRef.current !== null) {
        window.clearTimeout(introTimerRef.current);
      }

      if (glowTimerRef.current !== null) {
        window.clearTimeout(glowTimerRef.current);
      }
    };
  }, []);

  return (
    <div className="app">
      <MusicButton />

      <motion.div
        className="table-camera"
        initial={false}
        animate={{
          opacity: introOpening ? 1 : 0.72,
          scale: introOpening ? 1 : 1.045,
          filter: introOpening ? "blur(0px)" : "blur(2px)",
        }}
        transition={{
          duration: shouldReduceMotion ? 0 : 1.4,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <MemoryTable
          isActive={introOpening}
          isGlowing={albumGlow}
          tableRef={setTableRef}
        />
        <FinalMessage onReplay={replayMemories} onStartCountdown={startCountdown} />
      </motion.div>

      <AnimatePresence>
        {!introComplete ? (
          <IntroScreen isOpening={introOpening} onOpen={openMemories} />
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default App;
