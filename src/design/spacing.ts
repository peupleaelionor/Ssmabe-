/**
 * Songi Songi Mabé — Spacing tokens
 * --------------------------------------------------------------
 * Base 4px. Mobile-first : sections compactes sur mobile, aérées
 * sur desktop.
 */
export const spacing = {
  0: "0",
  1: "0.25rem",
  2: "0.5rem",
  3: "0.75rem",
  4: "1rem",
  5: "1.25rem",
  6: "1.5rem",
  8: "2rem",
  10: "2.5rem",
  12: "3rem",
  16: "4rem",
  20: "5rem",
  24: "6rem",
  32: "8rem",
} as const;

/** Espacement vertical de section recommandé. */
export const sectionSpacing = {
  mobile: spacing[16], // py-16
  desktop: spacing[20], // py-20
} as const;

/** Largeur de contenu max par contexte. */
export const containerWidth = {
  prose: "42rem", // max-w-2xl
  form: "28rem", // max-w-md
  page: "72rem", // max-w-6xl
} as const;

export type SpacingToken = keyof typeof spacing;
