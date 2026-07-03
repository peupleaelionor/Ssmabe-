import { getContent } from "@/content";

const c = getContent("fr");

/** Bandeau positionnement — une ligne, discret, bordures or fines. */
export function PositioningBand() {
  return (
    <div className="border-y border-olive/10 bg-vert-nuit/60">
      <p className="mx-auto flex max-w-5xl items-center justify-center gap-2.5 px-5 py-4 text-center text-xs tracking-wide text-gris-doux sm:text-sm">
        <span aria-hidden className="text-terra">◦</span>
        {c.positioning}
        <span aria-hidden className="text-terra">◦</span>
      </p>
    </div>
  );
}
