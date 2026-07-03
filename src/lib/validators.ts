/** Validation pure du formulaire waitlist (front + API). */
export interface WaitlistInput {
  firstName: string;
  email: string;
  phone?: string;
  country: string;
  city?: string;
  language: string;
  profileType: string;
  community?: string;
  goal?: string;
  message?: string;
  consent: boolean;
  source?: string;
  /** Honeypot anti-spam : doit rester vide. */
  website?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateWaitlist(input: WaitlistInput): string | null {
  if (input.website && input.website.length > 0) return "spam";
  if (!input.firstName || input.firstName.trim().length < 2)
    return "Entre ton prénom (2 caractères minimum).";
  if (input.firstName.trim().length > 60) return "Prénom trop long.";
  if (!input.email || !EMAIL_RE.test(input.email.trim()))
    return "Entre un email valide.";
  if (input.phone && input.phone.trim().length > 0) {
    const digits = input.phone.replace(/\D/g, "");
    if (digits.length < 8 || digits.length > 15) return "Numéro invalide (8 à 15 chiffres).";
  }
  if (!input.country) return "Choisis ton pays.";
  if (!input.language) return "Choisis ta langue principale.";
  if (!input.profileType) return "Choisis ton type de profil.";
  if (input.message && input.message.length > 500) return "Message trop long (500 max).";
  if (!input.consent) return "Merci d'accepter les conditions pour continuer.";
  return null;
}
