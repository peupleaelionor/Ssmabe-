/**
 * Songi Songi Mabé — Typography tokens
 * --------------------------------------------------------------
 * La marque vise Poppins (titres) / Inter (corps). Le code charge
 * actuellement Inter via next/font. Ces tokens documentent l'échelle
 * et restent compatibles tant que Poppins n'est pas branché (reco,
 * non bloquant — changement design à valider).
 */
export const fontFamily = {
  heading: 'var(--font-poppins, var(--font-inter, "Sora", "Manrope", system-ui, sans-serif))',
  body: 'var(--font-inter, "Manrope", system-ui, sans-serif)',
} as const;

/** Échelle typographique (rem) alignée Tailwind. */
export const fontSize = {
  xs: "0.75rem",
  sm: "0.875rem",
  base: "1rem",
  lg: "1.125rem",
  xl: "1.25rem",
  "2xl": "1.5rem",
  "3xl": "1.875rem",
  "4xl": "2.25rem",
  "5xl": "3rem",
  "6xl": "3.75rem",
} as const;

export const fontWeight = {
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  black: 900,
} as const;

export const lineHeight = {
  tight: 1.1,
  snug: 1.25,
  normal: 1.5,
  relaxed: 1.7,
} as const;

export type FontSizeToken = keyof typeof fontSize;
