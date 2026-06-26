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

// ════════════════════════════════════════════════════════════
//  Anti-fraude / anti-arnaque — couche renforcée
// ════════════════════════════════════════════════════════════

export type ScamCategory =
  | "money_request"
  | "code_request"
  | "recharge"
  | "romance_scam"
  | "intimidation"
  | "fake_support"
  | "spam"
  | "external_contact"
  | "identity_request";

/** Mots-clés catégorisés. Tout est comparé en minuscules, sans accents stricts. */
export const scamKeywordsByCategory: Record<ScamCategory, string[]> = {
  money_request: [
    "envoie de l'argent", "envoie argent", "envoie-moi de l'argent", "transfert",
    "western union", "moneygram", "mandat cash", "money transfer", "wire transfer",
    "aide urgente", "urgence argent", "frais de dossier", "frais dossier", "faux frais",
    "paypal ami", "besoin d'argent", "depanne moi", "dépanne-moi", "prête-moi",
  ],
  code_request: [
    "code", "code secret", "code de recharge", "bon de recharge", "code pcs",
    "envoie le code", "donne le code", "code à 6 chiffres", "code de validation",
    "otp", "code reçu par sms",
  ],
  recharge: [
    "recharge", "pcs", "neosurf", "transcash", "coupon", "carte cadeau",
    "carte google play", "google play", "steam card", "itunes",
  ],
  romance_scam: [
    "je t'aime déjà", "âme sœur", "destin", "100% garanti", "richesse rapide",
    "investissement", "crypto", "crypto urgente", "bitcoin", "usdt", "trading",
    "double ton argent", "argent facile",
  ],
  intimidation: [
    "je connais où tu habites", "je vais te retrouver", "tu vas regretter",
    "je vais te dénoncer", "menace", "chantage", "photo de toi", "je publie",
  ],
  fake_support: [
    "service client", "faux support", "support officiel", "votre compte est bloqué",
    "vérifie ton compte", "confirme tes informations", "agent songi", "équipe mabé",
  ],
  spam: [
    "abonne-toi", "clique ici", "lien dans la bio", "promo", "gagne un iphone",
    "tu as gagné", "félicitations tu as gagné", "http://", "https://", "bit.ly",
  ],
  external_contact: [
    "envoie moi ton numéro", "envoie-moi ton numéro", "donne ton whatsapp",
    "donne ton whatsapp directement", "ton numéro", "appelle-moi sur whatsapp",
    "ajoute-moi sur", "mon snap", "mon instagram", "passe sur telegram",
  ],
  identity_request: [
    "carte bancaire", "carte d'identité", "pièce d'identité", "passeport",
    "numéro de compte", "rib", "pin bancaire", "bank details", "account number",
  ],
};

/** Liste plate dédupliquée, utile pour un scan rapide. */
export const allScamKeywords: string[] = Array.from(
  new Set(Object.values(scamKeywordsByCategory).flat())
);

/** Signaux d'un utilisateur pour le scoring de risque. */
export interface UserSignals {
  reportsLast7d?: number;
  totalReports?: number;
  actionedReports?: number;
  blockedByCount?: number;
  scamFlags?: number;
  accountAgeHours?: number;
  rapidContactAttempts?: number;
}

export interface ScamRiskResult {
  risk: RiskLevel;
  score: number; // 0-100 (100 = très risqué)
  categories: ScamCategory[];
  matched: string[];
}

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

/** Analyse un texte et retourne un risque d'arnaque catégorisé. */
export function detectScamRisk(text: string): ScamRiskResult {
  const t = normalize(text);
  const categories: ScamCategory[] = [];
  const matched: string[] = [];

  for (const [category, keywords] of Object.entries(scamKeywordsByCategory)) {
    for (const kw of keywords) {
      if (t.includes(normalize(kw))) {
        matched.push(kw);
        if (!categories.includes(category as ScamCategory)) {
          categories.push(category as ScamCategory);
        }
      }
    }
  }

  // Score : chaque catégorie touchée pèse, certaines plus lourdes.
  const weights: Partial<Record<ScamCategory, number>> = {
    money_request: 35, code_request: 30, identity_request: 30,
    recharge: 25, romance_scam: 20, intimidation: 30,
    fake_support: 25, external_contact: 15, spam: 10,
  };
  let score = 0;
  for (const c of categories) score += weights[c] ?? 10;
  score = Math.min(100, score);

  const risk: RiskLevel =
    score >= 70 ? "critical" : score >= 45 ? "high" : score >= 20 ? "medium" : "low";

  return { risk, score, categories, matched };
}

/** Détection ciblée d'une demande d'argent. */
export function detectMoneyRequest(text: string): { detected: boolean; matched: string[] } {
  const t = normalize(text);
  const matched = [
    ...scamKeywordsByCategory.money_request,
    ...scamKeywordsByCategory.recharge,
    ...scamKeywordsByCategory.code_request,
  ].filter((kw) => t.includes(normalize(kw)));
  return { detected: matched.length > 0, matched };
}

/** Détection de harcèlement (réutilise les règles + intimidation). */
export function detectHarassmentRisk(text: string): {
  detected: boolean;
  reason?: string;
  severity?: ReportSeverity;
} {
  const base = detectHarassment(text);
  if (base.detected) return base;
  const t = normalize(text);
  const hit = scamKeywordsByCategory.intimidation.find((kw) => t.includes(normalize(kw)));
  if (hit) return { detected: true, reason: "Intimidation détectée", severity: "high" };
  return { detected: false };
}

/** Score de sécurité 0-100 (100 = sûr) à partir de signaux. */
export function calculateSafetyScore(signals: UserSignals): number {
  let score = 100;
  score -= (signals.reportsLast7d ?? 0) * 8;
  score -= (signals.actionedReports ?? 0) * 15;
  score -= (signals.blockedByCount ?? 0) * 5;
  score -= (signals.scamFlags ?? 0) * 12;
  score -= (signals.rapidContactAttempts ?? 0) * 6;
  // Compte très récent = légère prudence
  if ((signals.accountAgeHours ?? 999) < 24) score -= 10;
  return Math.max(0, Math.min(100, score));
}

/** Faut-il ralentir l'utilisateur (à partir de signaux) ? */
export function shouldThrottleUserSignals(signals: UserSignals): boolean {
  return calculateSafetyScore(signals) < 50 || (signals.rapidContactAttempts ?? 0) >= 3;
}

/** Faut-il une revue manuelle (à partir de signaux) ? */
export function shouldRequireManualReview(signals: UserSignals): boolean {
  return calculateSafetyScore(signals) < 30 || (signals.actionedReports ?? 0) >= 2;
}

// ── Garde-fous privacy ─────────────────────────────────────

const PHONE_LIKE = /(\+?\d[\d\s().-]{7,}\d)/;
const SENSITIVE_KEYS = ["phone", "telephone", "tel", "msisdn", "numero", "number", "contact"];

/**
 * Nettoie un candidat avant exposition publique : retire tout champ sensible
 * (téléphone, contact, email, identité). Ne renvoie JAMAIS de numéro.
 */
export function sanitizePublicCandidate<T extends Record<string, unknown>>(
  candidate: T
): Omit<T, "phone" | "telephone" | "contact" | "email"> {
  const clone: Record<string, unknown> = { ...candidate };
  for (const key of Object.keys(clone)) {
    if (SENSITIVE_KEYS.includes(key.toLowerCase()) || key.toLowerCase() === "email") {
      delete clone[key];
    }
  }
  return clone as Omit<T, "phone" | "telephone" | "contact" | "email">;
}

/**
 * Garde-fou de développement : lève une erreur si un payload destiné au client
 * contient un champ sensible ou un numéro de téléphone en clair.
 * À utiliser dans les chemins qui renvoient des candidats / profils publics.
 */
export function assertNoPhoneExposure(payload: unknown, context = "payload"): void {
  const visit = (value: unknown, path: string): void => {
    if (value == null) return;
    if (typeof value === "string") {
      if (PHONE_LIKE.test(value)) {
        throw new Error(`[assertNoPhoneExposure] numéro potentiel exposé dans ${path}`);
      }
      return;
    }
    if (Array.isArray(value)) {
      value.forEach((v, i) => visit(v, `${path}[${i}]`));
      return;
    }
    if (typeof value === "object") {
      for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
        if (SENSITIVE_KEYS.includes(k.toLowerCase())) {
          throw new Error(`[assertNoPhoneExposure] champ sensible "${k}" dans ${path}`);
        }
        visit(v, `${path}.${k}`);
      }
    }
  };
  visit(payload, context);
}
