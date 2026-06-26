import { type Report, type Block, type ReportReason, type ReportSeverity, type RiskLevel } from "@/lib/types";

// ── Report reasons ─────────────────────────────────────────

export const reportReasons: { value: ReportReason; label: string; icon: string }[] = [
  { value: "harassment", label: "Harcèlement", icon: "⚡" },
  { value: "spam", label: "Spam", icon: "🔇" },
  { value: "scam", label: "Arnaque / Escroquerie", icon: "🚨" },
  { value: "underage", label: "Personne mineure", icon: "🔞" },
  { value: "offensive", label: "Propos offensants", icon: "🚫" },
  { value: "inappropriate", label: "Comportement inapproprié", icon: "❌" },
  { value: "fake", label: "Faux profil / Identité", icon: "🎭" },
  { value: "other", label: "Autre raison", icon: "📝" },
];

// ── Scam keyword detection ─────────────────────────────────

export const scamKeywords: string[] = [
  "envoie de l'argent",
  "envoie argent",
  "transfert",
  "western union",
  "money transfer",
  "crypto",
  "bitcoin",
  "investissement",
  "100% garanti",
  "gagner de l'argent",
  "richesse rapide",
  "visa urgence",
  "billets d'avion",
  "emergency money",
  "send money",
  "wire transfer",
  "bank details",
  "account number",
  "numéro de compte",
  "code secret",
  "pin bancaire",
  // Mots-clés arnaque ciblés Afrique / diaspora
  "pcs",
  "code pcs",
  "recharge",
  "moneygram",
  "code",
  "carte cadeau",
  "carte google play",
  "urgence argent",
  "frais de dossier",
  "frais dossier",
  "neosurf",
  "transcash",
  "mandat cash",
  "coupon",
  "paypal ami",
  "crypto urgente",
  "usdt",
  "faux frais",
  "aide urgente",
  "code de recharge",
  "bon de recharge",
];

// ── Harassment rules ───────────────────────────────────────

export const harassmentRules = [
  { pattern: /numéro.*téléphone/i, severity: "high" as ReportSeverity, reason: "Demande de numéro de téléphone" },
  { pattern: /whatsapp/i, severity: "medium" as ReportSeverity, reason: "Tentative de redirection vers WhatsApp" },
  { pattern: /instagram|snap|tiktok/i, severity: "low" as ReportSeverity, reason: "Demande de contact externe" },
  { pattern: /\d{8,}/g, severity: "high" as ReportSeverity, reason: "Partage possible de numéro" },
];

// ── In-memory stores (replace with DB in production) ─────

const blocksStore = new Map<string, Block[]>();
const reportsStore = new Map<string, Report[]>();

// ── Block functions ────────────────────────────────────────

export function blockUser(blockerId: string, blockedId: string, reason?: string): Block {
  const block: Block = {
    id: `block_${Date.now()}`,
    blockerId,
    blockedId,
    reason,
    createdAt: new Date(),
  };

  const existing = blocksStore.get(blockerId) ?? [];
  blocksStore.set(blockerId, [...existing, block]);

  return block;
}

export function isBlocked(blockerId: string, blockedId: string): boolean {
  const blocks = blocksStore.get(blockerId) ?? [];
  return blocks.some((b) => b.blockedId === blockedId);
}

export function getBlockedUsers(userId: string): Block[] {
  return blocksStore.get(userId) ?? [];
}

// ── Report functions ───────────────────────────────────────

export function reportUser(
  reporterId: string,
  reportedId: string,
  reason: ReportReason,
  severity: ReportSeverity,
  description?: string,
  sessionId?: string
): Report {
  const report: Report = {
    id: `report_${Date.now()}`,
    reporterId,
    reportedId,
    sessionId,
    reason,
    severity,
    description,
    status: "pending",
    createdAt: new Date(),
  };

  const existing = reportsStore.get(reportedId) ?? [];
  reportsStore.set(reportedId, [...existing, report]);

  return report;
}

export function getReportsForUser(userId: string): Report[] {
  return reportsStore.get(userId) ?? [];
}

// ── Risk calculation ───────────────────────────────────────

export function calculateRiskLevel(userId: string): RiskLevel {
  const reports = getReportsForUser(userId);

  const criticalReports = reports.filter((r) => r.severity === "critical").length;
  const highReports = reports.filter((r) => r.severity === "high").length;
  const totalActioned = reports.filter((r) => r.status === "actioned").length;

  if (criticalReports >= 1 || totalActioned >= 3) return "critical";
  if (highReports >= 2 || totalActioned >= 2) return "high";
  if (reports.length >= 3) return "medium";
  return "low";
}

// ── Scam detection ────────────────────────────────────────

export function detectScam(text: string): boolean {
  const lowerText = text.toLowerCase();
  return scamKeywords.some((keyword) => lowerText.includes(keyword.toLowerCase()));
}

export function detectHarassment(text: string): { detected: boolean; reason?: string; severity?: ReportSeverity } {
  for (const rule of harassmentRules) {
    if (rule.pattern.test(text)) {
      return { detected: true, reason: rule.reason, severity: rule.severity };
    }
  }
  return { detected: false };
}

export function getSafetyScore(userId: string): number {
  const riskLevel = calculateRiskLevel(userId);
  const scores: Record<RiskLevel, number> = {
    low: 100,
    medium: 65,
    high: 30,
    critical: 0,
  };
  return scores[riskLevel];
}

/**
 * Retourne true si l'utilisateur doit être ralenti (throttled).
 * Cas : 3+ signalements cette semaine OU risque high/critical.
 */
export function shouldThrottleUser(userId: string): boolean {
  const riskLevel = calculateRiskLevel(userId);
  if (riskLevel === "high" || riskLevel === "critical") return true;

  const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const reports = getReportsForUser(userId);
  const recentReports = reports.filter((r) => new Date(r.createdAt) > oneWeekAgo);
  return recentReports.length >= 3;
}

/**
 * Retourne true si l'utilisateur doit passer en revue manuelle.
 * Cas : score confiance < 30 OU risque critical.
 */
export function shouldRequireReview(userId: string): boolean {
  const riskLevel = calculateRiskLevel(userId);
  if (riskLevel === "critical") return true;

  const safetyScore = getSafetyScore(userId);
  return safetyScore < 30;
}

/**
 * Liste des comportements interdits affichés aux utilisateurs.
 */
export const forbiddenBehaviors: string[] = [
  "Demander un numéro de téléphone pendant l'appel",
  "Demander de l'argent sous quelque forme que ce soit",
  "Partager des liens suspects",
  "Harcèlement ou insistance après refus",
  "Usurpation d'identité",
  "Contenu à caractère sexuel non sollicité",
  "Discrimination ethnique ou religieuse",
  "Appel à la haine ou à la violence",
];
