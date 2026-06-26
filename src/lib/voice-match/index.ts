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

// ── Mock candidate pool (20 candidats, 12 pays) ────────────

const MOCK_CANDIDATES: MockCandidate[] = [
  // Congo RDC
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
  // Congo Brazzaville
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
  // France (diaspora)
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
  // Belgique (diaspora)
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
  // Canada (diaspora)
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
  // Côte d'Ivoire
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
  // Sénégal
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
  // Cameroun
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
  // Maroc
  {
    id: "c_013",
    pseudo: "Casablanca_Voice",
    countryCode: CountryCode.MA,
    city: "Casablanca",
    languageCode: LanguageCode.FR,
    mode: CallMode.SERIEUX,
    age: 29,
    trustScore: 80,
    trustLevel: TrustLevel.VERIFIED,
    isOnline: true,
    waitingTime: 22,
  },
  {
    id: "c_014",
    pseudo: "Riad_Marrakech",
    countryCode: CountryCode.MA,
    city: "Marrakech",
    languageCode: LanguageCode.AR,
    mode: CallMode.RESPECT,
    age: 32,
    trustScore: 73,
    trustLevel: TrustLevel.TRUSTED,
    isOnline: true,
    waitingTime: 38,
  },
  // Algérie
  {
    id: "c_015",
    pseudo: "Alger_Connect",
    countryCode: CountryCode.DZ,
    city: "Alger",
    languageCode: LanguageCode.FR,
    mode: CallMode.MONDE,
    age: 26,
    trustScore: 69,
    trustLevel: TrustLevel.TRUSTED,
    isOnline: true,
    waitingTime: 14,
  },
  // Nigeria
  {
    id: "c_016",
    pseudo: "Lagos_Vibe",
    countryCode: CountryCode.NG,
    city: "Lagos",
    languageCode: LanguageCode.EN,
    mode: CallMode.MBOKA,
    age: 24,
    trustScore: 62,
    trustLevel: TrustLevel.TRUSTED,
    isOnline: true,
    waitingTime: 8,
  },
  {
    id: "c_017",
    pseudo: "Abuja_Power",
    countryCode: CountryCode.NG,
    city: "Abuja",
    languageCode: LanguageCode.EN,
    mode: CallMode.SERIEUX,
    age: 30,
    trustScore: 84,
    trustLevel: TrustLevel.VERIFIED,
    isOnline: true,
    waitingTime: 55,
  },
  // Kenya
  {
    id: "c_018",
    pseudo: "Nairobi_Tech",
    countryCode: CountryCode.KE,
    city: "Nairobi",
    languageCode: LanguageCode.EN,
    mode: CallMode.MONDE,
    age: 27,
    trustScore: 76,
    trustLevel: TrustLevel.TRUSTED,
    isOnline: true,
    waitingTime: 31,
  },
  {
    id: "c_019",
    pseudo: "Mombasa_Soul",
    countryCode: CountryCode.KE,
    city: "Mombasa",
    languageCode: LanguageCode.SW,
    mode: CallMode.RESPECT,
    age: 33,
    trustScore: 88,
    trustLevel: TrustLevel.VERIFIED,
    isOnline: true,
    waitingTime: 19,
  },
  // Canada (EN)
  {
    id: "c_020",
    pseudo: "Toronto_Voice",
    countryCode: CountryCode.CA,
    city: "Toronto",
    languageCode: LanguageCode.EN,
    mode: CallMode.NUIT,
    age: 28,
    trustScore: 77,
    trustLevel: TrustLevel.TRUSTED,
    isOnline: true,
    waitingTime: 42,
  },
];

// ── Advanced matching algorithm ────────────────────────────

/**
 * Calcule un score de matching 0-100 entre les préférences utilisateur
 * et un candidat.
 */
export function calculateMatchScore(
  userPref: UserPreference,
  candidate: MockCandidate
): number {
  let score = 0;

  // Même pays : +40
  if (candidate.countryCode === userPref.countryCode) {
    score += 40;
  }

  // Même langue : +30
  if (candidate.languageCode === userPref.languageCode) {
    score += 30;
  }

  // Mode compatible : +20
  if (candidate.mode === userPref.mode) {
    score += 20;
  }

  // TrustScore similaire (diff < 20) : +10
  const trustDiff = Math.abs(candidate.trustScore - 70); // 70 = trust score moyen d'un utilisateur standard
  if (trustDiff < 20) {
    score += 10;
  }

  return Math.min(100, score);
}

/**
 * Génère la clé de queue Redis future.
 * Format : "queue:{country}:{language}:{mode}"
 */
export function getQueueKey(pref: UserPreference): string {
  return `queue:${pref.countryCode}:${pref.languageCode}:${pref.mode}`;
}

/**
 * Vérifie si deux utilisateurs peuvent être matchés.
 */
export function canMatchUsers(
  userA: UserPreference,
  userB: UserPreference | MockCandidate
): { can: boolean; reason?: string } {
  // Vérification du mode
  const modeA = userA.mode;
  const modeB = userB.mode;

  if (modeA !== modeB) {
    // Certains modes sont compatibles entre eux
    const compatiblePairs: [CallMode, CallMode][] = [
      [CallMode.MBOKA, CallMode.SERIEUX],
      [CallMode.MONDE, CallMode.MBOKA],
      [CallMode.MONDE, CallMode.SERIEUX],
    ];
    const compatible = compatiblePairs.some(
      ([a, b]) =>
        (modeA === a && modeB === b) ||
        (modeA === b && modeB === a)
    );
    if (!compatible) {
      return { can: false, reason: `Modes incompatibles : ${modeA} ≠ ${modeB}` };
    }
  }

  // Vérification âge (si MockCandidate)
  if ("age" in userB) {
    if (userB.age < 18) {
      return { can: false, reason: "Candidat mineur détecté." };
    }
    // TrustScore minimum
    if (userB.trustScore < 20) {
      return { can: false, reason: "Score de confiance trop bas." };
    }
  }

  return { can: true };
}

/**
 * Retourne les statistiques du pool de candidats mock.
 */
export function getMatchingStats(): {
  totalCandidates: number;
  byCountry: Record<string, number>;
  byMode: Record<string, number>;
} {
  const byCountry: Record<string, number> = {};
  const byMode: Record<string, number> = {};

  for (const c of MOCK_CANDIDATES) {
    byCountry[c.countryCode] = (byCountry[c.countryCode] ?? 0) + 1;
    byMode[c.mode] = (byMode[c.mode] ?? 0) + 1;
  }

  return {
    totalCandidates: MOCK_CANDIDATES.length,
    byCountry,
    byMode,
  };
}

// ── Legacy matching (interne) ──────────────────────────────

function computeMatchScore(candidate: MockCandidate, pref: UserPreference): number {
  return calculateMatchScore(pref, candidate);
}

// ── Public API ─────────────────────────────────────────────

export function findVoiceMatch(preference: UserPreference): MatchResult {
  const online = MOCK_CANDIDATES.filter((c) => c.isOnline);

  if (online.length === 0) {
    return {
      success: false,
      estimatedWaitSeconds: 60,
      reason: "Aucune voix disponible pour le moment. Réessaie dans quelques minutes.",
    };
  }

  // Score all candidates using advanced scoring
  const scored = online
    .filter((c) => canMatchUsers(preference, c).can)
    .map((c) => ({
      candidate: c,
      score: computeMatchScore(c, preference),
    }));

  if (scored.length === 0) {
    return {
      success: false,
      estimatedWaitSeconds: 30,
      reason: "Aucune voix compatible disponible. Réessaie dans quelques instants.",
    };
  }

  // Sort by score descending
  scored.sort((a, b) => b.score - a.score);

  // Pick the best match with some randomness among top 3
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
