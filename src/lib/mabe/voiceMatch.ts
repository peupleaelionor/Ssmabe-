/**
 * Mabé Voice Match — façade
 * --------------------------------------------------------------
 * Logique de matching vocal (mockée aujourd'hui, Redis demain).
 * Ne renvoie jamais de numéro de téléphone — uniquement des
 * candidats anonymisés ou un état d'attente.
 */
export {
  findVoiceMatch,
  createCallSession,
  endCallSession,
  simulateWaitTime,
} from "@/lib/voice-match";

export type { UserPreference, MatchResult } from "@/lib/types";
