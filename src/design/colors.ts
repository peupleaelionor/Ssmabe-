/**
 * Songi Songi Mabé — Color tokens
 * --------------------------------------------------------------
 * Source de vérité TS pour la palette. Reflète tailwind.config.
 * Univers : vert profond · noir riche · crème. Ne pas exposer en
 * dur dans les composants : préférer les classes Tailwind, et
 * n'utiliser ces constantes que pour le canvas/SVG/JS dynamique.
 */
export const colors = {
  richBlack: "#0B0B0B",
  deepGreen: "#0D3B33",
  congoGreen: "#0F3D32",
  greenLight: "#1a5c4b",
  greenDark: "#082820",
  copper: "#C76A2D",
  copperLight: "#d98040",
  white: "#FFFFFF",
  warmWhite: "#FFFDF8",
  softCream: "#F8F3EA",
  mutedText: "#6F6A63",
  noirCard: "#111111",
  noirBorder: "#222222",
  danger: "#DC2626",
  success: "#16A34A",
  warning: "#D97706",
} as const;

export type ColorToken = keyof typeof colors;

/** Mapping rôle sémantique → token, pour l'UI. */
export const semanticColors = {
  background: colors.richBlack,
  surface: colors.noirCard,
  border: colors.noirBorder,
  primary: colors.congoGreen,
  primaryHover: colors.greenLight,
  accent: colors.copper,
  textPrimary: colors.warmWhite,
  textMuted: colors.mutedText,
  danger: colors.danger,
  success: colors.success,
  warning: colors.warning,
} as const;
