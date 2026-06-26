/**
 * Mabé Beta — collecte des bêta-testeurs
 * --------------------------------------------------------------
 * V2 : tente d'abord /api/beta (Supabase).
 *      En cas d'erreur réseau → fallback localStorage.
 * Architecture prête : la signature publique ne change jamais.
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
  local?: boolean;
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
 * Persistance localStorage (fallback ou quand pas de Supabase).
 */
function persistToLocalStorage(signup: BetaSignup): void {
  if (typeof window === "undefined") return;
  try {
    const existing = getLocalSignups();
    existing.push(signup);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  } catch {
    // Stockage indisponible (mode privé, quota) — on n'échoue pas l'UX.
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

export function getBetaCount(): number {
  return getLocalSignups().length;
}

/**
 * Tente l'API /api/beta (Supabase).
 * Retourne null en cas d'erreur réseau pour trigger le fallback.
 */
async function tryApiInsert(
  input: BetaSignupInput
): Promise<{ ok: boolean; id?: string; local?: boolean; error?: string } | null> {
  if (typeof window === "undefined") return null;
  try {
    const res = await fetch("/api/beta", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    const data = (await res.json()) as { ok: boolean; id?: string; local?: boolean; error?: string };
    return data;
  } catch {
    // Erreur réseau → fallback localStorage
    return null;
  }
}

export async function submitBetaSignup(
  input: BetaSignupInput
): Promise<BetaSignupResult> {
  const error = validate(input);
  if (error) return { ok: false, error };

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

  // Tente l'API Supabase en premier
  const apiResult = await tryApiInsert(input);

  if (apiResult !== null) {
    if (apiResult.ok) {
      // Succès API (Supabase ou local server-side)
      if (apiResult.id) {
        signup.id = apiResult.id;
      }
      // Si flag local: true, on persiste aussi en localStorage pour la dashboard admin
      if (apiResult.local) {
        persistToLocalStorage(signup);
      }
      return { ok: true, signup, local: apiResult.local };
    } else {
      // Erreur de validation côté API
      return { ok: false, error: apiResult.error ?? "Erreur lors de l'inscription." };
    }
  }

  // Fallback : erreur réseau → localStorage
  persistToLocalStorage(signup);
  return { ok: true, signup, local: true };
}
