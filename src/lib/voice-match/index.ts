import {
  CallMode,
  CallStatus,
  ConsentStatus,
  CountryCode,
  LanguageCode,
  TrustLevel,
  type UserPreference,
  type MatchResult,
  type MockCandidate,
  type CallSession,
} from "@/lib/types";

// ── Mock candidate pool ─────────────────────────────────────

const MOCK_CANDIDATES: MockCandidate[] = [
  {
    id: "c_001",
    pseudo: "Masamba",
    countryCode: CountryCode.CD,
    city: "Kinshasa",
    languageCode: LanguageCode.LN,
    mode: CallMode.MBOKA,
    age: 26,
    trustScore: 78,
    trustLevel: TrustLevel.TRUSTED,
    isOnline: true,
    waitingTime: 12,
  },
  {
    id: "c_002",
    pseudo: "Clarisse",
    countryCode: CountryCode.CD,
    city: "Kinshasa",
    languageCode: LanguageCode.FR,
    mode: CallMode.SERIEUX,
    age: 29,
    trustScore: 88,
    trustLevel: TrustLevel.VERIFIED,
    isOnline: true,
    waitingTime: 34,
  },
  {
    id: "c_003",
    pseudo: "Boyoma",
    countryCode: CountryCode.CG,
    city: "Brazzaville",
    languageCode: LanguageCode.FR,
    mode: CallMode.LINGALA,
    age: 31,
    trustScore: 65,
    trustLevel: TrustLevel.TRUSTED,
    isOnline: true,
    waitingTime: 7,
  },
  {
    id: "c_004",
    pseudo: "Céline_Paris",
    countryCode: CountryCode.FR,
    city: "Paris",
    languageCode: LanguageCode.FR,
    mode: CallMode.DIASPORA,
    age: 33,
    trustScore: 92,
    trustLevel: TrustLevel.VERIFIED,
    isOnline: true,
    waitingTime: 45,
  },
  {
    id: "c_005",
    pseudo: "JosBxl",
    countryCode: CountryCode.BE,
    city: "Bruxelles",
    languageCode: LanguageCode.LN,
    mode: CallMode.LINGALA,
    age: 27,
    trustScore: 71,
    trustLevel: TrustLevel.TRUSTED,
    isOnline: true,
    waitingTime: 23,
  },
  {
    id: "c_006",
    pseudo: "Ngozi_MTL",
    countryCode: CountryCode.CA,
    city: "Montréal",
    languageCode: LanguageCode.FR,
    mode: CallMode.DIASPORA,
    age: 35,
    trustScore: 85,
    trustLevel: TrustLevel.VERIFIED,
    isOnline: true,
    waitingTime: 18,
  },
  {
    id: "c_007",
    pseudo: "Abidjan_Fire",
    countryCode: CountryCode.CI,
    city: "Abidjan",
    languageCode: LanguageCode.FR,
    mode: CallMode.MONDE,
    age: 24,
    trustScore: 60,
    trustLevel: TrustLevel.TRUSTED,
    isOnline: true,
    waitingTime: 5,
  },
  {
    id: "c_008",
    pseudo: "Mbuji",
    countryCode: CountryCode.CD,
    city: "Mbuji-Mayi",
    languageCode: LanguageCode.LU,
    mode: CallMode.SERIEUX,
    age: 30,
    trustScore: 82,
    trustLevel: TrustLevel.VERIFIED,
    isOnline: true,
    waitingTime: 60,
  },
  {
    id: "c_009",
    pseudo: "Dakar_Soul",
    countryCode: CountryCode.SN,
    city: "Dakar",
    languageCode: LanguageCode.FR,
    mode: CallMode.RESPECT,
    age: 28,
    trustScore: 95,
    trustLevel: TrustLevel.VIP,
    isOnline: true,
    waitingTime: 15,
  },
  {
    id: "c_010",
    pseudo: "Kalala",
    countryCode: CountryCode.CD,
    city: "Lubumbashi",
    languageCode: LanguageCode.SW,
    mode: CallMode.NUIT,
    age: 32,
    trustScore: 74,
    trustLevel: TrustLevel.TRUSTED,
    isOnline: true,
    waitingTime: 90,
  },
  {
    id: "c_011",
    pseudo: "MiriamDLA",
    countryCode: CountryCode.CM,
    city: "Douala",
    languageCode: LanguageCode.FR,
    mode: CallMode.MBOKA,
    age: 25,
    trustScore: 67,
    trustLevel: TrustLevel.TRUSTED,
    isOnline: false,
    waitingTime: 0,
  },
  {
    id: "c_012",
    pseudo: "Goma_Amour",
    countryCode: CountryCode.CD,
    city: "Goma",
    languageCode: LanguageCode.SW,
    mode: CallMode.MBOKA,
    age: 27,
    trustScore: 79,
    trustLevel: TrustLevel.TRUSTED,
    isOnline: true,
    waitingTime: 41,
  },
];

// ── Matching algorithm (mock) ───────────────────────────────

function computeMatchScore(candidate: MockCandidate, pref: UserPreference): number {
  let score = 50;

  // Same mode is highest priority
  if (candidate.mode === pref.mode) score += 30;

  // Language match
  if (candidate.languageCode === pref.languageCode) score += 15;

  // Country match
  if (candidate.countryCode === pref.countryCode) score += 10;

  // City match
  if (pref.city && candidate.city === pref.city) score += 10;

  // Trust score bonus
  if (candidate.trustScore >= 80) score += 5;

  return Math.min(100, score);
}

export function findVoiceMatch(preference: UserPreference): MatchResult {
  const online = MOCK_CANDIDATES.filter((c) => c.isOnline);

  if (online.length === 0) {
    return {
      success: false,
      estimatedWaitSeconds: 60,
      reason: "Aucune voix disponible pour le moment. Réessaie dans quelques minutes.",
    };
  }

  // Score all candidates
  const scored = online.map((c) => ({
    candidate: c,
    score: computeMatchScore(c, preference),
  }));

  // Sort by score descending
  scored.sort((a, b) => b.score - a.score);

  // Pick the best match with some randomness
  const top3 = scored.slice(0, 3);
  const chosen = top3[Math.floor(Math.random() * top3.length)];

  return {
    success: true,
    candidate: chosen.candidate,
    matchScore: chosen.score,
    estimatedWaitSeconds: simulateWaitTime(preference),
  };
}

export function createCallSession(matchResult: MatchResult): CallSession {
  if (!matchResult.success || !matchResult.candidate) {
    throw new Error("Cannot create session from failed match");
  }

  const candidate = matchResult.candidate;

  return {
    id: `session_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
    userId: "current_user",
    matchedUserId: candidate.id,
    mode: candidate.mode,
    countryCode: candidate.countryCode,
    languageCode: candidate.languageCode,
    status: CallStatus.ACTIVE,
    startedAt: new Date(),
    duration: 0,
    creditsUsed: 0,
    userAConsent: ConsentStatus.PENDING,
    userBConsent: ConsentStatus.PENDING,
    channelId: `ch_${Date.now()}`,
    flagged: false,
  };
}

export function endCallSession(sessionId: string): void {
  // In production, this would call an API to end the session
  console.log(`[VoiceMatch] Session ${sessionId} ended`);
}

export function simulateWaitTime(preference: UserPreference): number {
  const baseWait: Record<CallMode, number> = {
    [CallMode.MBOKA]: 5,
    [CallMode.LINGALA]: 4,
    [CallMode.SERIEUX]: 8,
    [CallMode.DIASPORA]: 10,
    [CallMode.MONDE]: 3,
    [CallMode.NUIT]: 6,
    [CallMode.RESPECT]: 5,
  };

  const base = baseWait[preference.mode] ?? 5;
  const variance = Math.floor(Math.random() * 5);
  return (base + variance) * 1000; // return in milliseconds
}

export { MOCK_CANDIDATES };
