/**
 * Songi Songi Mabé — Shadow tokens
 * --------------------------------------------------------------
 * Ombres douces et diffuses, basse opacité (jamais de drop-shadow
 * dur). Glow vert subtil pour les éléments « voix ».
 */
export const shadows = {
  none: "none",
  sm: "0 1px 2px 0 rgba(0,0,0,0.25)",
  md: "0 4px 16px -2px rgba(0,0,0,0.35)",
  lg: "0 12px 32px -8px rgba(0,0,0,0.45)",
  premium: "0 20px 60px -20px rgba(0,0,0,0.6)",
  glowGreen: "0 0 24px -4px rgba(15,61,50,0.7)",
  glowCopper: "0 0 24px -6px rgba(199,106,45,0.5)",
} as const;

/** Anneau de focus accessible (vert sur fond sombre). */
export const focusRing = {
  className: "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vert-light focus-visible:ring-offset-2 focus-visible:ring-offset-noir",
  color: "#1a5c4b",
} as const;

export type ShadowToken = keyof typeof shadows;
