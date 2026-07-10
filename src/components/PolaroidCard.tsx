import { motion, type Variants } from "framer-motion";
import { useState, type CSSProperties } from "react";
import type { Memory } from "../data/memories";

type PolaroidCardProps = {
  memory: Memory;
  dimmed: boolean;
  reducedMotion: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  onFocus: () => void;
  onBlur: () => void;
};

const cardVariants: Variants = {
  hidden: (memory: Memory) => ({
    opacity: 0,
    x: memory.entry.x,
    y: memory.entry.y,
    rotate: memory.rotation + memory.entry.rotate,
    scale: 0.94,
  }),
  visible: (memory: Memory) => ({
    opacity: 1,
    x: 0,
    y: 0,
    rotate: memory.rotation,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 82,
      damping: 15,
      mass: 0.86,
    },
  }),
};

export function PolaroidCard({
  memory,
  dimmed,
  reducedMotion,
  onHoverStart,
  onHoverEnd,
  onFocus,
  onBlur,
}: PolaroidCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.button
      type="button"
      className={`polaroid-shell ${isFlipped ? "is-flipped" : ""} ${
        dimmed ? "is-dimmed" : ""
      }`}
      custom={memory}
      variants={cardVariants}
      whileHover={
        reducedMotion
          ? undefined
          : {
              scale: 1.05,
              y: -12,
              rotate: memory.rotation * 0.22,
              transition: {
                type: "spring",
                stiffness: 260,
                damping: 19,
              },
            }
      }
      whileTap={reducedMotion ? undefined : { scale: 0.985 }}
      style={
        {
          "--x": `${memory.position.x}%`,
          "--y": `${memory.position.y}%`,
          zIndex: dimmed ? 1 : memory.position.zIndex,
        } as CSSProperties
      }
      aria-label={`${memory.month}. ${
        isFlipped ? "Mostrar la fotografía" : "Leer la nota del reverso"
      }`}
      aria-pressed={isFlipped}
      onClick={() => setIsFlipped((current) => !current)}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      <span className="polaroid-flipper">
        <span className="polaroid-face polaroid-front">
          <span className="paper-grain" aria-hidden="true" />
          <span className="photo-window">
            <img
              src={memory.image}
              alt={`Recuerdo de ${memory.month.toLowerCase()}`}
              draggable="false"
            />
          </span>
          <span className="polaroid-caption">
            <span className="polaroid-month">{memory.month}</span>
            <span className="polaroid-note">{memory.frontText}</span>
          </span>
        </span>

        <span className="polaroid-face polaroid-back">
          <span className="paper-grain" aria-hidden="true" />
          <span className="back-heart" aria-hidden="true">
            ♡
          </span>
          <span className="back-note">{memory.backNote}</span>
          <span className="back-signature">{memory.backSignature}</span>
        </span>
      </span>
    </motion.button>
  );
}
