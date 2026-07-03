/**
 * BrandMark — symbole Songi Songi Mabé (kit de marque validé).
 * Deux bulles rondes superposées : terracotta (gauche, avec queue) +
 * olive (droite), intersection crème en lentille.
 * SVG inline : net à toute taille, zéro requête réseau.
 */
export interface BrandMarkProps {
  /** Taille en px (carré). */
  size?: number;
  className?: string;
  /** Titre accessible ; décoratif si omis dans un lockup avec texte. */
  title?: string;
}

export const BRAND_COLORS = {
  ink: "#0D0F14",
  cream: "#F3EFE6",
  terra: "#E0694A",
  olive: "#7A7F62",
  gray: "#A9A69A",
} as const;

/** Géométrie partagée avec les SVG statiques de /public/brand. */
export const MARK_PATHS = {
  olive: "M365 70 a135 135 0 1 1 -0.01 0 Z",
  terraTail:
    "M118 322 C130 382 112 424 62 452 C138 428 168 380 172 340 Z",
  terra: "M190 100 a135 135 0 1 1 -0.01 0 Z",
  cream:
    "M260 120 A135 135 0 0 1 295 320 A135 135 0 0 1 260 120 Z",
} as const;

export function BrandMark({ size = 40, className, title }: BrandMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
    >
      {title ? <title>{title}</title> : null}
      {/* Bulle olive (droite) */}
      <path d={MARK_PATHS.olive} fill={BRAND_COLORS.olive} />
      {/* Queue de la bulle terracotta (bas-gauche) */}
      <path d={MARK_PATHS.terraTail} fill={BRAND_COLORS.terra} />
      {/* Bulle terracotta (gauche) */}
      <path d={MARK_PATHS.terra} fill={BRAND_COLORS.terra} />
      {/* Lentille crème = intersection */}
      <path d={MARK_PATHS.cream} fill={BRAND_COLORS.cream} />
    </svg>
  );
}
