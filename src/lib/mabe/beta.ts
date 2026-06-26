/**
 * Mabé Beta — collecte des bêta-testeurs
 * --------------------------------------------------------------
 * V1 : stockage local (localStorage) côté client.
 * Architecture prête à brancher Supabase : il suffira de remplacer
 * l'implémentation de `persistSignup()` par un insert Supabase, sans
 * toucher au composant de formulaire ni à la signature publique.
 */
import type { BetaIntention, BetaSignup } from "@/lib/types";
import { CountryCode, LanguageCode } from "@/lib/types";

const STORAGE_KEY = "mabe.beta.signups";

export interface BetaSignupInput {
  pseudo: string;
  country: string;
  city?: string;
  language: string;
  intention: string;
  contact?: string;
}

export interface BetaSignupResult {
  ok: boolean;
  signup?: BetaSignup;
  error?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(input: BetaSignupInput): string | null {
  if (!input.pseudo || input.pseudo.trim().length < 2) {
    return "Choisis un pseudo d'au moins 2 caractères.";
  }
  if (!input.country) return "Choisis ton pays.";
  if (!input.language) return "Choisis ta langue.";
  if (!input.intention) return "Indique ce que tu cherches.";

  // Contact optionnel : si fourni, on accepte email OU numéro (8+ chiffres)
  if (input.contact && input.contact.trim().length > 0) {
    const c = input.contact.trim();
    const digits = c.replace(/\D/g, "");
    if (!EMAIL_RE.test(c) && digits.length < 8) {
      return "Le contact doit être un email valide ou un numéro WhatsApp.";
    }
  }
  return null;
}

function generateId(): string {
  return `beta_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

/**
 * Couche de persistance — point d'extension Supabase.
 * Aujourd'hui : localStorage. Demain :
 *   await supabase.from("beta_signups").insert(signup)
 */
async function persistSignup(signup: BetaSignup): Promise<void> {
  if (typeof window === "undefined") return;
  try {
    const existing = getLocalSignups();
    existing.push(signup);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  } catch {
    // Stockage indisponible (mode privé, quota) — on n'échoue pas l'UX bêta.
  }
}

export function getLocalSignups(): BetaSignup[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as BetaSignup[]) : [];
  } catch {
    return [];
  }
}

export async function submitBetaSignup(
  input: BetaSignupInput
): Promise<BetaSignupResult> {
  const error = validate(input);
  if (error) return { ok: false, error };

  // Simule la latence réseau (sera réelle avec Supabase)
  await new Promise((r) => setTimeout(r, 900));

  const signup: BetaSignup = {
    id: generateId(),
    pseudo: input.pseudo.trim(),
    countryCode: input.country as CountryCode,
    city: input.city?.trim() || undefined,
    languageCode: input.language as LanguageCode,
    intention: input.intention as BetaIntention,
    contact: input.contact?.trim() || undefined,
    createdAt: new Date(),
    converted: false,
  };

  await persistSignup(signup);
  return { ok: true, signup };
}

export function getBetaCount(): number {
  return getLocalSignups().length;
}
