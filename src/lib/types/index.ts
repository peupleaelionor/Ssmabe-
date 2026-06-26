// ============================================================
// SONGI SONGI MABÉ – Core TypeScript Types
// ============================================================

// ── Enums ──────────────────────────────────────────────────

export enum CountryCode {
  CD = "CD", // RDC – République Démocratique du Congo
  CG = "CG", // Congo-Brazzaville
  FR = "FR", // France (diaspora)
  BE = "BE", // Belgique (diaspora)
  CA = "CA", // Canada (diaspora)
  CI = "CI", // Côte d'Ivoire
  CM = "CM", // Cameroun
  SN = "SN", // Sénégal
}

export enum LanguageCode {
  FR = "fr", // Français
  LN = "ln", // Lingala
  SW = "sw", // Swahili
  KG = "kg", // Kikongo
  LU = "lu", // Tshiluba
  EN = "en", // English
  PT = "pt", // Portugais
}

export enum CallMode {
  MBOKA = "MBOKA",       // Amour local – même ville
  LINGALA = "LINGALA",   // Musique & culture lingala
  SERIEUX = "SERIEUX",   // Rencontre sérieuse
  DIASPORA = "DIASPORA", // Connexion diaspora-patrie
  MONDE = "MONDE",       // Ouvert au monde entier
  NUIT = "NUIT",         // Mode nocturne (21h-5h)
  RESPECT = "RESPECT",   // Mode slow, voix qui respecte
}

export enum CallStatus {
  IDLE = "IDLE",
  SEARCHING = "SEARCHING",
  MATCHED = "MATCHED",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  ENDING = "ENDING",
  ENDED = "ENDED",
  CANCELLED = "CANCELLED",
  FAILED = "FAILED",
}

export enum ConsentStatus {
  PENDING = "PENDING",
  YES = "YES",
  NO = "NO",
  EXTEND = "EXTEND",
  SKIP = "SKIP",
  BLOCK = "BLOCK",
  REPORT = "REPORT",
}

export enum TrustLevel {
  NEW = "new",
  TRUSTED = "trusted",
  VERIFIED = "verified",
  VIP = "vip",
}

export enum PaymentProvider {
  MPESA = "mpesa",
  AIRTEL_MONEY = "airtel_money",
  ORANGE_MONEY = "orange_money",
  MTN_MONEY = "mtn_money",
  WAVE = "wave",
  PAYPAL = "paypal",
  STRIPE = "stripe",
  PAYLIB = "paylib",
  INTERAC = "interac",
}

// ── Country & Language ─────────────────────────────────────

export interface LocalTexts {
  tagline: string;
  cta: string;
  waitingMessage: string;
  matchedMessage: string;
  endMessage: string;
  safetyReminder: string;
}

export interface Country {
  code: CountryCode;
  name: string;
  nameLocal: string;
  flag: string;
  currency: string;
  phonePrefix: string;
  languages: LanguageCode[];
  cities: string[];
  payments: PaymentProvider[];
  modes: CallMode[];
  safetyLevel: number; // 1-5
  marketingTone: "warmth" | "trust" | "pride" | "aspiration";
  localTexts: LocalTexts;
  startingPrice: number; // in local currency
  matchingRules: MatchingRules;
  isDiaspora: boolean;
  homelandCodes?: CountryCode[];
}

export interface Language {
  code: LanguageCode;
  name: string;
  nameLocal: string;
  flag: string;
  countries: CountryCode[];
  rtl: boolean;
}

// ── Mode ──────────────────────────────────────────────────

export interface MatchingRules {
  requireSameCity?: boolean;
  requireSameCountry?: boolean;
  requireSameLanguage?: boolean;
  ageRange?: [number, number];
  allowedModes?: CallMode[];
  prioritizeDiaspora?: boolean;
  requireVerified?: boolean;
  maxTrustDifference?: number;
}

export interface Mode {
  id: CallMode;
  label: string;
  labelFr: string;
  description: string;
  icon: string;
  safetyLevel: number; // 1-5
  defaultCallDuration: number; // seconds
  free: boolean;
  creditCost: number; // credits per minute
  matchingRules: MatchingRules;
  availableCountries: CountryCode[];
  timeRestriction?: { start: number; end: number }; // hours in 24h
  color: string;
}

// ── User & Profile ─────────────────────────────────────────

export interface User {
  id: string;
  phone?: string; // never exposed to other users
  email?: string;
  pseudo: string;
  countryCode: CountryCode;
  languageCode: LanguageCode;
  preferredMode: CallMode;
  createdAt: Date;
  lastActiveAt: Date;
  isBanned: boolean;
  isVerified: boolean;
  role: "user" | "moderator" | "admin";
}

export interface Profile {
  userId: string;
  bio?: string;
  age?: number;
  ageConfirmed: boolean;
  cities: string[];
  interests: string[];
  preferredGender?: "any" | "male" | "female";
  trustScore: number;
  trustLevel: TrustLevel;
  callCount: number;
  reportCount: number;
  blockCount: number;
  averageCallDuration: number;
  createdAt: Date;
  updatedAt: Date;
}

// ── Call Session ───────────────────────────────────────────

export interface CallSession {
  id: string;
  userId: string;
  matchedUserId: string;
  mode: CallMode;
  countryCode: CountryCode;
  languageCode: LanguageCode;
  status: CallStatus;
  startedAt?: Date;
  endedAt?: Date;
  duration: number; // seconds
  creditsUsed: number;
  userAConsent: ConsentStatus;
  userBConsent: ConsentStatus;
  channelId: string; // WebRTC channel (mocked)
  qualityScore?: number;
  flagged: boolean;
}

export interface VoiceMatch {
  id: string;
  userAId: string;
  userBId: string;
  sessionId: string;
  matchScore: number; // 0-100
  matchedAt: Date;
  mode: CallMode;
}

// ── Safety ────────────────────────────────────────────────

export type ReportReason =
  | "harassment"
  | "spam"
  | "scam"
  | "underage"
  | "offensive"
  | "inappropriate"
  | "fake"
  | "other";

export type ReportSeverity = "low" | "medium" | "high" | "critical";
export type RiskLevel = "low" | "medium" | "high" | "critical";

export interface Report {
  id: string;
  reporterId: string;
  reportedId: string;
  sessionId?: string;
  reason: ReportReason;
  severity: ReportSeverity;
  description?: string;
  status: "pending" | "reviewed" | "actioned" | "dismissed";
  createdAt: Date;
  reviewedAt?: Date;
  reviewedBy?: string;
}

export interface Block {
  id: string;
  blockerId: string;
  blockedId: string;
  reason?: string;
  createdAt: Date;
}

export interface SafetyEvent {
  id: string;
  userId: string;
  type:
    | "call_completed"
    | "call_cancelled"
    | "reported"
    | "blocked"
    | "report_received"
    | "block_received"
    | "verified"
    | "consent_given"
    | "spam_detected";
  value: number; // +/- impact on trust score
  metadata?: Record<string, unknown>;
  createdAt: Date;
}

// ── Wallet & Credits ───────────────────────────────────────

export interface CreditWallet {
  id: string;
  userId: string;
  balance: number;
  freeCallsRemaining: number;
  freeCallsResetAt: Date;
  totalSpent: number;
  totalPurchased: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreditPack {
  id: string;
  name: string;
  label: string;
  credits: number;
  priceUSD: number;
  priceLocal?: number;
  localCurrency?: string;
  bonus?: number;
  popular?: boolean;
  targetRegion: "africa" | "diaspora" | "global";
  description: string;
}

export interface Transaction {
  id: string;
  userId: string;
  type: "purchase" | "deduct" | "refund" | "bonus";
  amount: number;
  balanceBefore: number;
  balanceAfter: number;
  description: string;
  metadata?: Record<string, unknown>;
  createdAt: Date;
}

// ── Onboarding & Beta ──────────────────────────────────────

export type BetaIntention = "chill" | "serieux" | "diaspora" | "decouverte";

export interface BetaSignup {
  id: string;
  pseudo: string;
  countryCode: CountryCode;
  city?: string;
  languageCode: LanguageCode;
  intention: BetaIntention;
  contact?: string; // email or phone (optional)
  createdAt: Date;
  converted: boolean;
}

// ── Matching ──────────────────────────────────────────────

export interface UserPreference {
  userId: string;
  countryCode: CountryCode;
  languageCode: LanguageCode;
  mode: CallMode;
  city?: string;
  ageRange?: [number, number];
  preferredGender?: "any" | "male" | "female";
}

export interface MockCandidate {
  id: string;
  pseudo: string;
  countryCode: CountryCode;
  city: string;
  languageCode: LanguageCode;
  mode: CallMode;
  age: number;
  trustScore: number;
  trustLevel: TrustLevel;
  isOnline: boolean;
  waitingTime: number; // seconds they have been waiting
}

export interface MatchResult {
  success: boolean;
  candidate?: MockCandidate;
  matchScore?: number;
  estimatedWaitSeconds?: number;
  reason?: string;
}

// ── Trust Score ────────────────────────────────────────────

export interface TrustScore {
  userId: string;
  score: number; // 0-100
  level: TrustLevel;
  events: SafetyEvent[];
  lastUpdated: Date;
}

// ── Admin / Analytics ──────────────────────────────────────

export interface AdminStats {
  totalUsers: number;
  activeUsersToday: number;
  totalCalls: number;
  activeCallsNow: number;
  avgCallDuration: number; // seconds
  totalReports: number;
  pendingReports: number;
  bannedUsers: number;
  activeCountries: number;
  activeLanguages: number;
  totalRevenue: number;
  revenueToday: number;
  conversionRate: number;
  topCountries: { code: CountryCode; count: number }[];
  topModes: { mode: CallMode; count: number }[];
  recentCalls: RecentCallAdmin[];
  recentReports: RecentReportAdmin[];
}

export interface RecentCallAdmin {
  id: string;
  mode: CallMode;
  countryA: CountryCode;
  countryB: CountryCode;
  duration: number;
  startedAt: Date;
  status: CallStatus;
  flagged: boolean;
}

export interface RecentReportAdmin {
  id: string;
  reason: ReportReason;
  severity: ReportSeverity;
  status: Report["status"];
  countryCode: CountryCode;
  createdAt: Date;
}
