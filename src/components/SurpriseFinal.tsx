import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import {
  DISNEYLAND_TRIP_DATE,
  SURPRISE_TYPEWRITER_LINES,
} from "../data/surprise";

type SurpriseFinalProps = {
  onStartCountdown: () => void;
};

const sparkleItems = Array.from({ length: 26 }, (_, index) => ({
  id: index,
  left: `${4 + ((index * 37) % 92)}%`,
  delay: `${(index % 11) * 0.38}s`,
  duration: `${8 + (index % 6) * 1.4}s`,
  size: `${4 + (index % 4)}px`,
}));

const calculateDaysUntilTrip = () => {
  const target = new Date(DISNEYLAND_TRIP_DATE).getTime();
  const now = Date.now();
  const millisecondsPerDay = 1000 * 60 * 60 * 24;

  return Math.max(0, Math.ceil((target - now) / millisecondsPerDay));
};

function setMusicVolume(volume: number, duration = 1800) {
  window.dispatchEvent(
    new CustomEvent("anniversary:music-volume", {
      detail: { volume, duration },
    }),
  );
}

function TypewriterText({
  active,
  onComplete,
}: {
  active: boolean;
  onComplete: () => void;
}) {
  const shouldReduceMotion = Boolean(useReducedMotion());
  const [completedLines, setCompletedLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState("");

  useEffect(() => {
    if (!active) {
      return undefined;
    }

    if (shouldReduceMotion) {
      setCompletedLines([...SURPRISE_TYPEWRITER_LINES]);
      setCurrentLine("");
      onComplete();
      return undefined;
    }

    let lineIndex = 0;
    let characterIndex = 0;
    let timer: number | undefined;
    let cancelled = false;

    const typeCharacter = () => {
      if (cancelled) {
        return;
      }

      const line = SURPRISE_TYPEWRITER_LINES[lineIndex];
      setCurrentLine(line.slice(0, characterIndex + 1));

      if (characterIndex < line.length - 1) {
        characterIndex += 1;
        timer = window.setTimeout(typeCharacter, 42);
        return;
      }

      setCompletedLines((lines) => [...lines, line]);
      setCurrentLine("");

      if (lineIndex === SURPRISE_TYPEWRITER_LINES.length - 1) {
        timer = window.setTimeout(onComplete, 520);
        return;
      }

      lineIndex += 1;
      characterIndex = 0;
      timer = window.setTimeout(typeCharacter, 820);
    };

    timer = window.setTimeout(typeCharacter, 360);

    return () => {
      cancelled = true;

      if (timer !== undefined) {
        window.clearTimeout(timer);
      }
    };
  }, [active, onComplete, shouldReduceMotion]);

  return (
    <div className="surprise-typewriter" aria-live="polite">
      {completedLines.map((line) => (
        <p key={line}>{line}</p>
      ))}
      {currentLine ? (
        <p>
          {currentLine}
          <span className="typewriter-caret" aria-hidden="true" />
        </p>
      ) : null}
    </div>
  );
}

function CastleIllustration() {
  return (
    <svg
      className="castle-illustration"
      viewBox="0 0 260 220"
      role="img"
      aria-label="Castillo de cuento con luna y estrellas"
    >
      <defs>
        <linearGradient id="castleGlow" x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#fffaf3" />
          <stop offset="58%" stopColor="#e7d3bd" />
          <stop offset="100%" stopColor="#c98f97" />
        </linearGradient>
        <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff6d8" />
          <stop offset="100%" stopColor="#f1d99a" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="200" cy="38" r="30" fill="url(#moonGlow)" />
      <path
        d="M195 24a18 18 0 1 0 21 24 22 22 0 1 1-21-24Z"
        fill="#fffaf3"
        opacity="0.92"
      />
      <path d="M50 128h160v48H50z" fill="url(#castleGlow)" />
      <path d="M73 88h34v88H73zM153 88h34v88h-34z" fill="#fff4e7" />
      <path d="M112 66h36v110h-36z" fill="#f8e6d4" />
      <path d="M73 88l17-35 17 35M153 88l17-35 17 35M112 66l18-40 18 40" fill="#8f4a55" />
      <path d="M42 176h176" stroke="#8f4a55" strokeLinecap="round" strokeWidth="4" />
      <path d="M118 176v-28a12 12 0 0 1 24 0v28" fill="#4d352d" opacity="0.76" />
      <path
        d="M64 143h12M91 143h12M158 143h12M185 143h12M122 104h16"
        stroke="#8f4a55"
        strokeLinecap="round"
        strokeWidth="3"
        opacity="0.52"
      />
      <path d="M42 56l4 8 8 4-8 4-4 8-4-8-8-4 8-4 4-8Z" fill="#fffaf3" />
      <path d="M218 92l3 6 6 3-6 3-3 6-3-6-6-3 6-3 3-6Z" fill="#f4d589" />
      <path d="M121 32l3 6 6 3-6 3-3 6-3-6-6-3 6-3 3-6Z" fill="#fffaf3" />
    </svg>
  );
}

export function SurpriseFinal({ onStartCountdown }: SurpriseFinalProps) {
  const shouldReduceMotion = Boolean(useReducedMotion());
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.44 });
  const [polaroidVisible, setPolaroidVisible] = useState(false);
  const [polaroidRevealed, setPolaroidRevealed] = useState(false);
  const [typewriterDone, setTypewriterDone] = useState(false);
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [destinationVisible, setDestinationVisible] = useState(false);
  const [daysUntilTrip, setDaysUntilTrip] = useState(calculateDaysUntilTrip);
  const handleTypewriterComplete = useCallback(() => setTypewriterDone(true), []);

  useEffect(() => {
    if (!isInView) {
      return undefined;
    }

    const timer = window.setTimeout(
      () => {
        setPolaroidVisible(true);
        setMusicVolume(0.34, 2000);
      },
      shouldReduceMotion ? 120 : 2000,
    );

    return () => window.clearTimeout(timer);
  }, [isInView, shouldReduceMotion]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setDaysUntilTrip(calculateDaysUntilTrip());
    }, 60_000);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!envelopeOpen) {
      return undefined;
    }

    const timer = window.setTimeout(
      () => {
        setDestinationVisible(true);
        setMusicVolume(0.65, 2600);
      },
      shouldReduceMotion ? 250 : 3600,
    );

    return () => window.clearTimeout(timer);
  }, [envelopeOpen, shouldReduceMotion]);

  return (
    <section
      className={`surprise-final ${destinationVisible ? "is-destination-visible" : ""}`}
      ref={sectionRef}
      aria-label="Sorpresa final"
    >
      <AnimatePresence>
        {polaroidVisible ? (
          <motion.div
            className="surprise-polaroid-wrap"
            initial={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: -210, rotate: -13, scale: 0.98 }
            }
            animate={
              shouldReduceMotion
                ? { opacity: 1 }
                : { opacity: 1, y: 0, rotate: -2, scale: 1 }
            }
            transition={{
              type: "spring",
              stiffness: 68,
              damping: 11,
              mass: 1.05,
            }}
          >
            <motion.button
              className={`surprise-polaroid ${polaroidRevealed ? "is-revealed" : ""}`}
              type="button"
              aria-label={
                polaroidRevealed
                  ? "Recuerdo sorpresa revelado"
                  : "Revelar el último recuerdo"
              }
              aria-pressed={polaroidRevealed}
              disabled={polaroidRevealed}
              onClick={() => setPolaroidRevealed(true)}
              whileHover={
                shouldReduceMotion || polaroidRevealed
                  ? undefined
                  : {
                      y: -10,
                      scale: 1.035,
                      rotate: 0.5,
                      transition: { type: "spring", stiffness: 220, damping: 18 },
                    }
              }
            >
              <motion.span
                className="surprise-polaroid-flipper"
                animate={{
                  rotateY: polaroidRevealed ? 180 : 0,
                  rotateX: polaroidRevealed && !shouldReduceMotion ? 5 : 0,
                  y: polaroidRevealed && !shouldReduceMotion ? -16 : 0,
                }}
                transition={{
                  duration: shouldReduceMotion ? 0.01 : 1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <span className="surprise-card-face surprise-card-back">
                  <span className="paper-grain" aria-hidden="true" />
                  <span className="last-heart" aria-hidden="true">
                    ❤️
                  </span>
                  <span className="last-memory-text">Un último recuerdo...</span>
                  <span className="touch-me">Tócame</span>
                </span>
                <span className="surprise-card-face surprise-card-front">
                  <span className="paper-grain" aria-hidden="true" />
                  <span className="surprise-photo-window">
                    <CastleIllustration />
                  </span>
                  <span className="surprise-caption">Diciembre 2026</span>
                </span>
              </motion.span>
            </motion.button>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {polaroidRevealed ? (
          <motion.div
            className="surprise-story"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: shouldReduceMotion ? 0 : 0.7, duration: 0.7 }}
          >
            <TypewriterText
              active={polaroidRevealed}
              onComplete={handleTypewriterComplete}
            />

            <AnimatePresence>
              {typewriterDone ? (
                <motion.div
                  className="surprise-heart-and-envelope"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.75 }}
                >
                  <motion.div
                    className="surprise-heart"
                    aria-hidden="true"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                  >
                    ❤️
                  </motion.div>

                  <button
                    className={`reveal-envelope ${envelopeOpen ? "is-open" : ""}`}
                    type="button"
                    onClick={() => setEnvelopeOpen(true)}
                    disabled={envelopeOpen}
                    aria-label="Abrir sobre de la sorpresa"
                  >
                    <span className="reveal-envelope-label">Abrir</span>
                    <span className="reveal-envelope-paper" aria-hidden="true" />
                    <span className="reveal-envelope-body" aria-hidden="true">
                      <span className="reveal-envelope-flap" />
                      <span className="wax-seal" />
                    </span>
                  </button>
                </motion.div>
              ) : null}
            </AnimatePresence>

            <AnimatePresence>
              {envelopeOpen ? (
                <motion.div
                  className="reveal-letter"
                  initial={{ opacity: 0, height: 0, y: -14 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: shouldReduceMotion ? 0.01 : 1.15 }}
                >
                  <p>Para celebrar este primer año contigo...</p>
                  <p>He querido preparar nuestro siguiente gran recuerdo.</p>
                  <p>Porque aún nos quedan muchísimas aventuras por vivir.</p>
                  <p>Y la próxima empieza en...</p>
                </motion.div>
              ) : null}
            </AnimatePresence>

            <AnimatePresence>
              {destinationVisible ? (
                <motion.div
                  className="destination-reveal"
                  initial={{ opacity: 0, scale: 0.96, y: 18 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: shouldReduceMotion ? 0.01 : 1.1 }}
                >
                  <div className="magic-rain" aria-hidden="true">
                    {sparkleItems.map((sparkle) => (
                      <span
                        key={sparkle.id}
                        style={
                          {
                            "--sparkle-left": sparkle.left,
                            "--sparkle-delay": sparkle.delay,
                            "--sparkle-duration": sparkle.duration,
                            "--sparkle-size": sparkle.size,
                          } as CSSProperties
                        }
                      />
                    ))}
                  </div>
                  <span className="castle-emoji" aria-hidden="true">
                    🏰
                  </span>
                  <p className="destination-kicker">Nos vamos a</p>
                  <h2 id="surprise-title">
                    <span>Disneyland París</span>
                  </h2>
                  <p className="destination-date">en diciembre ❤️</p>

                  <div className="countdown-card" aria-live="polite">
                    <p>Faltan...</p>
                    <strong>{daysUntilTrip} días</strong>
                    <span>para crear nuestro recuerdo número 13 ❤️</span>
                  </div>

                  <button
                    className="countdown-button"
                    type="button"
                    onClick={onStartCountdown}
                  >
                    ✨ Empezar la cuenta atrás ✨
                  </button>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
