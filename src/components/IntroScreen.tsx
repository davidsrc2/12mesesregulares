import { motion, useReducedMotion } from "framer-motion";
import type { CSSProperties } from "react";

type IntroScreenProps = {
  isOpening: boolean;
  onOpen: () => void;
};

const dustParticles = Array.from({ length: 28 }, (_, index) => ({
  id: index,
  left: `${8 + ((index * 29) % 86)}%`,
  top: `${6 + ((index * 17) % 82)}%`,
  delay: `${(index % 9) * 0.8}s`,
  duration: `${16 + (index % 7) * 3}s`,
  drift: `${index % 2 === 0 ? 18 + index : -16 - index}px`,
}));

export function IntroScreen({ isOpening, onOpen }: IntroScreenProps) {
  const shouldReduceMotion = Boolean(useReducedMotion());

  return (
    <motion.section
      className={`intro-screen ${isOpening ? "is-opening" : ""}`}
      aria-labelledby="intro-title"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        transition: {
          duration: shouldReduceMotion ? 0.01 : 0.9,
          ease: [0.22, 1, 0.36, 1],
        },
      }}
    >
      <div className="intro-warmth" aria-hidden="true" />
      <div className="dust-field" aria-hidden="true">
        {dustParticles.map((particle) => (
          <span
            className="dust"
            key={particle.id}
            style={
              {
                "--left": particle.left,
                "--top": particle.top,
                "--delay": particle.delay,
                "--duration": particle.duration,
                "--drift": particle.drift,
              } as CSSProperties
            }
          />
        ))}
      </div>

      <motion.div
        className="intro-content"
        animate={{
          y: isOpening && !shouldReduceMotion ? -18 : 0,
          scale: isOpening && !shouldReduceMotion ? 0.985 : 1,
        }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="envelope" aria-hidden="true">
          <div className="envelope-shadow" />
          <div className="envelope-letter" />
          <div className="envelope-body">
            <span className="envelope-flap envelope-flap-left" />
            <span className="envelope-flap envelope-flap-right" />
            <span className="envelope-flap envelope-flap-bottom" />
            <span className="envelope-flap envelope-flap-top" />
          </div>
        </div>

        <p className="intro-kicker">365 días guardados con cariño</p>
        <h1 id="intro-title">
          <span>Nuestro</span>
          <span>primer año</span>
          <span className="intro-title-heart">❤️</span>
        </h1>
        <p className="intro-subtitle">
          Doce meses, doce recuerdos y toda una vida por delante.
        </p>

        <button
          className="intro-button"
          type="button"
          onClick={onOpen}
          disabled={isOpening}
        >
          Abrir nuestros recuerdos
        </button>
      </motion.div>
    </motion.section>
  );
}
