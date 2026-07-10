import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

type SecretModalProps = {
  onClose: () => void;
};

export function SecretModal({ onClose }: SecretModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const previousFocus =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.classList.add("modal-open");
    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.classList.remove("modal-open");
      previousFocus?.focus();
    };
  }, [onClose]);

  return (
    <motion.div
      className="secret-modal-backdrop"
      role="presentation"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.24 }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <motion.div
        className="secret-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="secret-title"
        aria-describedby="secret-description"
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
      >
        <button
          className="modal-close"
          type="button"
          aria-label="Cerrar mensaje"
          onClick={onClose}
          ref={closeButtonRef}
        >
          ×
        </button>
        <p className="modal-kicker" id="secret-title">
          Un rincón secreto
        </p>
        <p className="modal-message" id="secret-description">
          Entre todos estos recuerdos, mi lugar favorito siempre será contigo.
        </p>
      </motion.div>
    </motion.div>
  );
}
