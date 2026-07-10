import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { useCallback, useState, type PointerEvent } from "react";
import { memories } from "../data/memories";
import { PolaroidCard } from "./PolaroidCard";
import { SecretModal } from "./SecretModal";

type MemoryTableProps = {
  isActive: boolean;
  tableRef: (node: HTMLElement | null) => void;
};

const tableVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.115,
      delayChildren: 0.18,
    },
  },
};

export function MemoryTable({ isActive, tableRef }: MemoryTableProps) {
  const shouldReduceMotion = Boolean(useReducedMotion());
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [secretOpen, setSecretOpen] = useState(false);

  const closeSecret = useCallback(() => setSecretOpen(false), []);

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (shouldReduceMotion || event.pointerType !== "mouse") {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    event.currentTarget.style.setProperty("--parallax-x", `${x * 18}px`);
    event.currentTarget.style.setProperty("--parallax-y", `${y * 14}px`);
  };

  const resetParallax = (event: PointerEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty("--parallax-x", "0px");
    event.currentTarget.style.setProperty("--parallax-y", "0px");
  };

  return (
    <section
      className="memory-table"
      ref={tableRef}
      aria-labelledby="memory-table-title"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetParallax}
    >
      <div className="ambient-light" aria-hidden="true" />
      <div className="table-decorations" aria-hidden="true">
        <span className="folded-letter" />
        <span className="washi washi-one" />
        <span className="washi washi-two" />
        <span className="petal petal-one" />
        <span className="petal petal-two" />
        <span className="petal petal-three" />
        <span className="pressed-flower flower-one">
          <i />
          <i />
          <i />
        </span>
        <span className="pressed-flower flower-two">
          <i />
          <i />
          <i />
        </span>
        <span className="ceramic-cup" />
        <span className="warm-string-lights">
          <i />
          <i />
          <i />
          <i />
        </span>
        <span className="hand-scribble scribble-one" />
        <span className="hand-scribble scribble-two" />
      </div>

      <button
        className="secret-heart"
        type="button"
        aria-label="Abrir mensaje secreto"
        onClick={() => setSecretOpen(true)}
      >
        <span aria-hidden="true">♡</span>
      </button>

      <div className="table-heading">
        <p>Primer aniversario</p>
        <h2 id="memory-table-title">Doce recuerdos sobre la mesa</h2>
      </div>

      <motion.div
        className="polaroid-field"
        variants={shouldReduceMotion ? undefined : tableVariants}
        initial={shouldReduceMotion ? { opacity: 0 } : "hidden"}
        animate={isActive ? (shouldReduceMotion ? { opacity: 1 } : "visible") : undefined}
        transition={{ duration: shouldReduceMotion ? 0.01 : 0.4 }}
      >
        {memories.map((memory) => (
          <PolaroidCard
            key={memory.id}
            memory={memory}
            dimmed={hoveredId !== null && hoveredId !== memory.id}
            reducedMotion={shouldReduceMotion}
            onHoverStart={() => setHoveredId(memory.id)}
            onHoverEnd={() => setHoveredId(null)}
            onFocus={() => setHoveredId(memory.id)}
            onBlur={() => setHoveredId(null)}
          />
        ))}
      </motion.div>

      <AnimatePresence>
        {secretOpen ? <SecretModal onClose={closeSecret} /> : null}
      </AnimatePresence>
    </section>
  );
}
