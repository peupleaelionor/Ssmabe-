/** Haptic feedback — safe no-op when unsupported (desktop, iOS Safari). */
type Pattern = "tap" | "success" | "error";
const PATTERNS: Record<Pattern, number | number[]> = {
  tap: 10,
  success: [12, 40, 12],
  error: [40, 60, 40],
};
export function haptic(pattern: Pattern = "tap"): void {
  try {
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate(PATTERNS[pattern]);
    }
  } catch {
    /* never break UX for feedback */
  }
}
