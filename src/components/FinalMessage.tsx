type FinalMessageProps = {
  onReplay: () => void;
};

export function FinalMessage({ onReplay }: FinalMessageProps) {
  return (
    <section className="final-message" aria-labelledby="final-message-title">
      <article className="final-letter">
        <span className="letter-crease" aria-hidden="true" />
        <p className="final-kicker">Para ti</p>
        <h2 id="final-message-title">
          Gracias por convertir estos doce meses en el año más bonito de mi vida.
        </h2>
        <p className="final-subtitle">Esto solo es el principio ❤️</p>
        <p className="final-signature">Te quiero muchísimo.</p>
        <button className="replay-button" type="button" onClick={onReplay}>
          Volver a ver nuestros recuerdos
        </button>
      </article>
    </section>
  );
}
