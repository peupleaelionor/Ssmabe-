/**
 * Songi Songi Mabé — Design tokens (barrel)
 * --------------------------------------------------------------
 * Point d'entrée unique du design system interne.
 *   import { tokens } from "@/design/tokens";
 */
import { colors, semanticColors } from "./colors";
import { fontFamily, fontSize, fontWeight, lineHeight } from "./typography";
import { spacing, sectionSpacing, containerWidth } from "./spacing";
import { radius, componentRadius } from "./radius";
import { shadows, focusRing } from "./shadows";

export const tokens = {
  colors,
  semanticColors,
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  spacing,
  sectionSpacing,
  containerWidth,
  radius,
  componentRadius,
  shadows,
  focusRing,
} as const;

export {
  colors,
  semanticColors,
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  spacing,
  sectionSpacing,
  containerWidth,
  radius,
  componentRadius,
  shadows,
  focusRing,
};

export type Tokens = typeof tokens;
