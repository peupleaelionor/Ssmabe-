/**
 * betaQualityRobot — analyse la qualité des inscriptions bêta.
 * --------------------------------------------------------------
 * Fonction d'analyse interne (pas un service externe). Détecte
 * doublons, répartitions, contacts invalides, signaux suspects.
 * Ne logue ni n'expose jamais le contact en clair.
 */
import type { BetaSignup } from "@/lib/types";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface BetaQualityReport {
  total: number;
  uniquePseudos: number;
  duplicatePseudos: string[];
  byCountry: { code: string; count: number }[];
  byLanguage: { code: string; count: number }[];
  byIntention: { intention: string; count: number }[];
  withContact: number;
  withoutContact: number;
  invalidContacts: number;
  suspiciousCount: number;
  qualityScore: number; // 0-100
}

function tally<T extends string>(items: T[]): { key: T; count: number }[] {
  const map = new Map<T, number>();
  for (const it of items) map.set(it, (map.get(it) ?? 0) + 1);
  return [...map.entries()]
    .map(([key, count]) => ({ key, count }))
    .sort((a, b) => b.count - a.count);
}

function isValidContact(contact?: string): boolean {
  if (!contact) return true; // absence = volontairement valide
  const c = contact.trim();
  const digits = c.replace(/\D/g, "");
  return EMAIL_RE.test(c) || digits.length >= 8;
}

function looksSuspicious(s: BetaSignup): boolean {
  const pseudo = s.pseudo.trim();
  if (pseudo.length < 2) return true;
  if (/^(test|asdf|qwerty|aaa+|admin)$/i.test(pseudo)) return true;
  if (!isValidContact(s.contact)) return true;
  if (/(.)\1{4,}/.test(pseudo)) return true; // 5x le même caractère
  return false;
}

export function runBetaQualityRobot(signups: BetaSignup[]): BetaQualityReport {
  const total = signups.length;
  const pseudos = signups.map((s) => s.pseudo.trim().toLowerCase());
  const pseudoCounts = tally(pseudos);
  const duplicatePseudos = pseudoCounts.filter((p) => p.count > 1).map((p) => p.key);

  const withContact = signups.filter((s) => s.contact && s.contact.trim().length > 0).length;
  const invalidContacts = signups.filter((s) => !isValidContact(s.contact)).length;
  const suspiciousCount = signups.filter(looksSuspicious).length;

  const qualityScore =
    total === 0
      ? 100
      : Math.max(
          0,
          Math.round(
            100 -
              (duplicatePseudos.length / total) * 40 -
              (invalidContacts / total) * 30 -
              (suspiciousCount / total) * 30
          )
        );

  return {
    total,
    uniquePseudos: new Set(pseudos).size,
    duplicatePseudos,
    byCountry: tally(signups.map((s) => String(s.countryCode))).map((x) => ({ code: x.key, count: x.count })),
    byLanguage: tally(signups.map((s) => String(s.languageCode))).map((x) => ({ code: x.key, count: x.count })),
    byIntention: tally(signups.map((s) => String(s.intention))).map((x) => ({ intention: x.key, count: x.count })),
    withContact,
    withoutContact: total - withContact,
    invalidContacts,
    suspiciousCount,
    qualityScore,
  };
}
