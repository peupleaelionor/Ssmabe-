/**
 * Songi Songi Mabé — Radius tokens
 * --------------------------------------------------------------
 * Boutons en pill, cartes très arrondies (24px) = signature douce
 * et premium des planches de marque.
 */
export const radius = {
  none: "0",
  sm: "0.375rem",
  md: "0.5rem",
  lg: "0.75rem",
  xl: "1rem",
  "2xl": "1.25rem",
  "3xl": "1.5rem", // cartes
  full: "9999px", // boutons pill, badges, avatar
} as const;

export const componentRadius = {
  button: radius.full,
  buttonSquareish: radius["2xl"],
  card: radius["3xl"],
  input: radius.xl,
  badge: radius.full,
  modal: radius["3xl"],
} as const;

export type RadiusToken = keyof typeof radius;
