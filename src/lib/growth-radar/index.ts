import { CallMode, CountryCode, CallStatus, type AdminStats } from "@/lib/types";

// ── Mock data generators ────────────────────────────────────

export function getAdminStats(): AdminStats {
  return {
    totalUsers: 4_827,
    activeUsersToday: 312,
    totalCalls: 18_443,
    activeCallsNow: 47,
    avgCallDuration: 387, // ~6.5 min in seconds
    totalReports: 142,
    pendingReports: 23,
    bannedUsers: 38,
    activeCountries: 8,
    activeLanguages: 5,
    totalRevenue: 12_847.50,
    revenueToday: 284.00,
    conversionRate: 18.4,
    topCountries: [
      { code: CountryCode.CD, count: 2_104 },
      { code: CountryCode.FR, count: 891 },
      { code: CountryCode.CG, count: 743 },
      { code: CountryCode.BE, count: 412 },
      { code: CountryCode.CI, count: 388 },
    ],
    topModes: [
      { mode: CallMode.MBOKA, count: 6_821 },
      { mode: CallMode.LINGALA, count: 4_322 },
      { mode: CallMode.SERIEUX, count: 3_110 },
      { mode: CallMode.DIASPORA, count: 2_443 },
      { mode: CallMode.RESPECT, count: 1_747 },
    ],
    recentCalls: [
      {
        id: "call_001",
        mode: CallMode.MBOKA,
        countryA: CountryCode.CD,
        countryB: CountryCode.CD,
        duration: 423,
        startedAt: new Date(Date.now() - 5 * 60 * 1000),
        status: CallStatus.ENDED,
        flagged: false,
      },
      {
        id: "call_002",
        mode: CallMode.DIASPORA,
        countryA: CountryCode.FR,
        countryB: CountryCode.CD,
        duration: 612,
        startedAt: new Date(Date.now() - 12 * 60 * 1000),
        status: CallStatus.ENDED,
        flagged: false,
      },
      {
        id: "call_003",
        mode: CallMode.LINGALA,
        countryA: CountryCode.CD,
        countryB: CountryCode.CG,
        duration: 189,
        startedAt: new Date(Date.now() - 18 * 60 * 1000),
        status: CallStatus.ENDED,
        flagged: true,
      },
      {
        id: "call_004",
        mode: CallMode.SERIEUX,
        countryA: CountryCode.BE,
        countryB: CountryCode.CD,
        duration: 844,
        startedAt: new Date(Date.now() - 25 * 60 * 1000),
        status: CallStatus.ENDED,
        flagged: false,
      },
      {
        id: "call_005",
        mode: CallMode.NUIT,
        countryA: CountryCode.CD,
        countryB: CountryCode.SN,
        duration: 0,
        startedAt: new Date(Date.now() - 2 * 60 * 1000),
        status: CallStatus.ACTIVE,
        flagged: false,
      },
    ],
    recentReports: [
      {
        id: "rep_001",
        reason: "harassment",
        severity: "high",
        status: "pending",
        countryCode: CountryCode.CD,
        createdAt: new Date(Date.now() - 20 * 60 * 1000),
      },
      {
        id: "rep_002",
        reason: "scam",
        severity: "critical",
        status: "reviewed",
        countryCode: CountryCode.CG,
        createdAt: new Date(Date.now() - 45 * 60 * 1000),
      },
      {
        id: "rep_003",
        reason: "fake",
        severity: "medium",
        status: "dismissed",
        countryCode: CountryCode.FR,
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      },
      {
        id: "rep_004",
        reason: "underage",
        severity: "critical",
        status: "actioned",
        countryCode: CountryCode.CD,
        createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
      },
    ],
  };
}

export function getCountryStats(): Record<CountryCode, { users: number; calls: number; revenue: number }> {
  return {
    [CountryCode.CD]: { users: 2104, calls: 8821, revenue: 2100 },
    [CountryCode.CG]: { users: 743, calls: 2843, revenue: 1200 },
    [CountryCode.FR]: { users: 891, calls: 3211, revenue: 4200 },
    [CountryCode.BE]: { users: 412, calls: 1544, revenue: 2100 },
    [CountryCode.CA]: { users: 287, calls: 1024, revenue: 1900 },
    [CountryCode.CI]: { users: 388, calls: 1200, revenue: 900 },
    [CountryCode.CM]: { users: 121, calls: 443, revenue: 300 },
    [CountryCode.SN]: { users: 89, calls: 357, revenue: 247 },
  };
}

export function getCallStats(): {
  byHour: number[];
  byMode: Record<CallMode, number>;
  avgDuration: number;
  successRate: number;
} {
  return {
    byHour: [12, 8, 5, 3, 2, 4, 8, 15, 22, 28, 35, 42, 38, 44, 51, 48, 55, 68, 72, 65, 58, 47, 35, 22],
    byMode: {
      [CallMode.MBOKA]: 6821,
      [CallMode.LINGALA]: 4322,
      [CallMode.SERIEUX]: 3110,
      [CallMode.DIASPORA]: 2443,
      [CallMode.MONDE]: 987,
      [CallMode.NUIT]: 512,
      [CallMode.RESPECT]: 248,
    },
    avgDuration: 387,
    successRate: 84.2,
  };
}

export function getSignupStats(): {
  total: number;
  today: number;
  byCountry: Record<CountryCode, number>;
  conversionRate: number;
} {
  return {
    total: 4827,
    today: 84,
    byCountry: {
      [CountryCode.CD]: 2104,
      [CountryCode.CG]: 743,
      [CountryCode.FR]: 891,
      [CountryCode.BE]: 412,
      [CountryCode.CA]: 287,
      [CountryCode.CI]: 388,
      [CountryCode.CM]: 121,
      [CountryCode.SN]: 89,
    },
    conversionRate: 18.4,
  };
}
