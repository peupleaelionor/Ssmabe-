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
} from "@/lib/safety-shield";

export { SAFETY_RULES, REPORT_REASONS } from "@/lib/constants/config";
