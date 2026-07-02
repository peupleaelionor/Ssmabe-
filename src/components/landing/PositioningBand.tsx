/** Bandeau positionnement — une ligne, discret, bordures or fines. */
export function PositioningBand() {
  return (
    <div className="border-y border-or-doux/10 bg-vert-nuit/60">
      <p className="mx-auto flex max-w-5xl items-center justify-center gap-2.5 px-5 py-4 text-center text-xs tracking-wide text-gris-doux sm:text-sm">
        <span aria-hidden className="text-or-doux">◦</span>
        Né au Congo. Pensé pour la diaspora. Ouvert au monde.
        <span aria-hidden className="text-or-doux">◦</span>
      </p>
    </div>
  );
}
