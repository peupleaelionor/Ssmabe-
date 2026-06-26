import { CallMode } from "@/lib/types";

export const APP_NAME = "Songi Songi Mabé";
export const APP_TAGLINE = "La voix qui connecte. Le numéro qui reste caché.";
export const APP_DESCRIPTION =
  "Une plateforme de rencontre vocale née au Congo. Parle, écoute, connecte – sans jamais partager ton numéro.";
export const APP_URL = "https://songisongi.app";
export const APP_TWITTER = "@SongiSongiApp";

export const MIN_AGE = 18;
export const MAX_AGE = 99;
export const MAX_FREE_CALLS_PER_DAY = 3;
export const FREE_CALLS_RESET_HOURS = 24;
export const DEFAULT_CALL_DURATION = 300; // 5 minutes in seconds
export const MAX_CALL_DURATION = 3600; // 1 hour max
export const WAIT_TIMEOUT_SECONDS = 120; // 2 minutes max wait

export const CREDIT_COSTS: Record<CallMode, number> = {
  [CallMode.MBOKA]: 0,
  [CallMode.LINGALA]: 0,
  [CallMode.SERIEUX]: 2,
  [CallMode.DIASPORA]: 3,
  [CallMode.MONDE]: 2,
  [CallMode.NUIT]: 4,
  [CallMode.RESPECT]: 1,
};

export const TRUST_SCORE_DEFAULTS = {
  NEW_USER: 50,
  MAX: 100,
  MIN: 0,
  THRESHOLDS: {
    new: 0,
    trusted: 60,
    verified: 80,
    vip: 95,
  },
};

export const TRUST_SCORE_EVENTS = {
  CALL_COMPLETED: +3,
  CALL_CANCELLED_EARLY: -1,
  REPORT_RECEIVED: -10,
  REPORT_ACTIONED: -20,
  BLOCK_RECEIVED: -5,
  CONSENT_GIVEN: +2,
  VERIFIED: +15,
  SPAM_DETECTED: -25,
  GOOD_RATING_RECEIVED: +2,
};

export const ONBOARDING_STEPS = [
  { step: 1, label: "Ton pays", description: "Où es-tu ?" },
  { step: 2, label: "Ta langue", description: "Comment tu parles ?" },
  { step: 3, label: "Ton ambiance", description: "Quel style de rencontre ?" },
  { step: 4, label: "Ton âge", description: "Tu as bien 18 ans ?" },
  { step: 5, label: "Ton pseudo", description: "Comment on t'appelle ?" },
];

export const BETA_INTENTIONS = [
  { value: "friendship", label: "Amitié" },
  { value: "love", label: "Amour" },
  { value: "networking", label: "Réseau" },
  { value: "culture", label: "Culture" },
  { value: "fun", label: "Fun" },
];

export const REPORT_REASONS = [
  { value: "harassment", label: "Harcèlement" },
  { value: "spam", label: "Spam / Arnaque" },
  { value: "scam", label: "Escroquerie" },
  { value: "underage", label: "Personne mineure" },
  { value: "offensive", label: "Propos offensants" },
  { value: "inappropriate", label: "Comportement inapproprié" },
  { value: "fake", label: "Faux profil" },
  { value: "other", label: "Autre" },
];

export const SAFETY_RULES = [
  {
    icon: "🔒",
    title: "Numéro toujours caché",
    description:
      "Ton numéro de téléphone n'est jamais partagé, ni pendant, ni après l'appel.",
  },
  {
    icon: "✂️",
    title: "Fin propre garantie",
    description:
      "Si les deux parties ne donnent pas leur accord, aucun contact n'est échangé.",
  },
  {
    icon: "🛡️",
    title: "Signalement facile",
    description:
      "Un bouton de signalement disponible à tout moment pendant et après l'appel.",
  },
  {
    icon: "⚡",
    title: "Modération rapide",
    description:
      "Notre équipe traite chaque signalement sous 24h. Tolérance zéro pour le harcèlement.",
  },
  {
    icon: "🚫",
    title: "Blocage immédiat",
    description:
      "Bloque quelqu'un en un tap. Cette personne ne pourra plus jamais te contacter.",
  },
  {
    icon: "🔞",
    title: "18+ strictement",
    description:
      "Vérification d'âge obligatoire. Les mineurs sont immédiatement bannis.",
  },
];
