/**
 * adaptiveRobot — adaptation intelligente au contexte réseau/appareil.
 * Pur et testable ; l'application DOM se fait dans AdaptiveEngine.
 */
export interface NetworkSignals {
  saveData?: boolean;
  effectiveType?: string; // "slow-2g" | "2g" | "3g" | "4g"
  deviceMemory?: number;  // Go (Chrome Android)
}

export type ConnClass = "slow" | "ok";

/** Classe la connexion : slow → animations coupées + suggestion /lite. */
export function classifyConnection(s: NetworkSignals): ConnClass {
  if (s.saveData) return "slow";
  if (s.effectiveType === "slow-2g" || s.effectiveType === "2g") return "slow";
  if (typeof s.deviceMemory === "number" && s.deviceMemory <= 1) return "slow";
  return "ok";
}

export function shouldSuggestLite(s: NetworkSignals): boolean {
  return classifyConnection(s) === "slow";
}
