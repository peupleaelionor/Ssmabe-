/**
 * Mabé Trust Score — façade
 * --------------------------------------------------------------
 * Score de confiance utilisateur (0–100) et niveaux associés.
 */
export {
  calculateTrustScore,
  getTrustLevel,
  updateTrustScore,
  getTrustScore,
  recordCallCompleted,
  recordCallCancelled,
  recordReportReceived,
  getTrustBadge,
} from "@/lib/trust-score";
