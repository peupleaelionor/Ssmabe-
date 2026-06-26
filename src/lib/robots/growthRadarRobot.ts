/**
 * growthRadarRobot — priorisation growth à partir des inscriptions.
 * --------------------------------------------------------------
 * Calcule pays à prioriser, villes chaudes, langues qui montent,
 * potentiel diaspora. Pur, sans dépendance externe.
 */
import type { BetaSignup } from "@/lib/types";
import { CountryCode } from "@/lib/types";

const DIASPORA_COUNTRIES = new Set<string>([
  CountryCode.FR, CountryCode.BE, CountryCode.CA,
]);

export interface GrowthRadarReport {
  priorityCountries: { code: string; count: number; share: number }[];
  hotCities: { city: string; count: number }[];
  risingLanguages: { code: string; count: number }[];
  diasporaShare: number; // 0-1
  diasporaPotential: "low" | "medium" | "high";
  recommendedChannel: string;
  nextAction: string;
}

function rank<T extends string>(values: T[]): { key: T; count: number }[] {
  const map = new Map<T, number>();
  for (const v of values) if (v) map.set(v, (map.get(v) ?? 0) + 1);
  return [...map.entries()].map(([key, count]) => ({ key, count })).sort((a, b) => b.count - a.count);
}

export function runGrowthRadarRobot(signups: BetaSignup[]): GrowthRadarReport {
  const total = Math.max(1, signups.length);

  const countries = rank(signups.map((s) => String(s.countryCode)));
  const cities = rank(signups.map((s) => (s.city ?? "").trim()).filter(Boolean));
  const languages = rank(signups.map((s) => String(s.languageCode)));

  const diasporaCount = signups.filter((s) => DIASPORA_COUNTRIES.has(String(s.countryCode))).length;
  const diasporaShare = diasporaCount / total;
  const diasporaPotential = diasporaShare >= 0.4 ? "high" : diasporaShare >= 0.15 ? "medium" : "low";

  const recommendedChannel =
    diasporaPotential === "high"
      ? "TikTok + Instagram diaspora (FR/BE/CA), groupes WhatsApp communautaires"
      : "TikTok Kinshasa/Brazzaville + influence locale lingala";

  const top = countries[0]?.key ?? "CD";
  const nextAction =
    signups.length === 0
      ? "Lancer la collecte bêta : pousser le formulaire sur les canaux Congo."
      : `Concentrer l'acquisition sur ${top} (pays #1) et activer la diaspora (${Math.round(
          diasporaShare * 100
        )}%).`;

  return {
    priorityCountries: countries.slice(0, 5).map((c) => ({
      code: c.key,
      count: c.count,
      share: Math.round((c.count / total) * 100) / 100,
    })),
    hotCities: cities.slice(0, 5).map((c) => ({ city: c.key, count: c.count })),
    risingLanguages: languages.slice(0, 5).map((l) => ({ code: l.key, count: l.count })),
    diasporaShare: Math.round(diasporaShare * 100) / 100,
    diasporaPotential,
    recommendedChannel,
    nextAction,
  };
}
