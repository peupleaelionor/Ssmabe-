/**
 * Mabé Experience Engine
 * --------------------------------------------------------------
 * Point d'entrée unique des modules produit. Importer depuis
 * `@/lib/mabe` plutôt que des modules internes individuels.
 *
 *   import { findVoiceMatch, submitBetaSignup } from "@/lib/mabe";
 */
export * as countryBrain from "@/lib/mabe/countryBrain";
export * as languageBrain from "@/lib/mabe/languageBrain";
export * as voiceMatch from "@/lib/mabe/voiceMatch";
export * as safetyShield from "@/lib/mabe/safetyShield";
export * as trustScore from "@/lib/mabe/trustScore";
export * as creditEngine from "@/lib/mabe/creditEngine";
export * as beta from "@/lib/mabe/beta";

// Raccourcis les plus utilisés
export { findVoiceMatch, calculateMatchScore, canMatchUsers, getMatchingStats } from "@/lib/mabe/voiceMatch";
export { submitBetaSignup, getBetaCount, getLocalSignups } from "@/lib/mabe/beta";
export { calculateRiskLevel, detectScam, shouldThrottleUser, shouldRequireReview, forbiddenBehaviors } from "@/lib/mabe/safetyShield";
export { getPricingForCountry, formatPrice } from "@/lib/mabe/creditEngine";
