/**
 * Mabé Safety Shield — façade
 * --------------------------------------------------------------
 * Signalement, blocage, anti-scam et règles de protection.
 */
export {
  reportReasons,
  scamKeywords,
  harassmentRules,
  blockUser,
  isBlocked,
  getBlockedUsers,
  reportUser,
  getReportsForUser,
  calculateRiskLevel,
  detectScam,
  detectHarassment,
  getSafetyScore,
  shouldThrottleUser,
  shouldRequireReview,
  forbiddenBehaviors,
  // Couche anti-fraude renforcée
  scamKeywordsByCategory,
  allScamKeywords,
  detectScamRisk,
  detectMoneyRequest,
  detectHarassmentRisk,
  calculateSafetyScore,
  shouldThrottleUserSignals,
  shouldRequireManualReview,
  sanitizePublicCandidate,
  assertNoPhoneExposure,
} from "@/lib/safety-shield";

export type { ScamCategory, ScamRiskResult, UserSignals } from "@/lib/safety-shield";

export { SAFETY_RULES, REPORT_REASONS } from "@/lib/constants/config";
