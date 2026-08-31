/**
 * Mabé Analytics — couche provider-agnostique, privacy-first.
 * --------------------------------------------------------------
 * - No-op tant qu'aucun provider n'est configuré (aucune dépendance).
 * - Se branche sur PostHog si `window.posthog` est présent (script chargé
 *   plus tard) OU sur n'importe quel collecteur via `setAnalyticsSink`.
 * - Ne transmet JAMAIS de donnée sensible (pseudo, contact, numéro).
 *
 * Events documentés : voir docs/integrations.md.
 */

export type AnalyticsEvent =
  | "page_view"
  | "hero_cta_click"
  | "beta_form_viewed"
  | "beta_form_start"
  | "beta_form_submit"
  | "beta_form_success"
  | "beta_form_error"
  | "beta_signup_submitted"
  | "community_join_click"
  | "creator_join_click"
  | "diaspora_join_click"
  | "contact_click"
  | "whatsapp_click"
  | "call_click"
  | "country_selected"
  | "mode_selected"
  | "demo_started"
  | "demo_completed"
  // ── Core loop (link → room → voice) ──
  | "landing_view"
  | "room_view"
  | "onboarding_started"
  | "onboarding_completed"
  | "room_joined"
  | "first_audio_received"
  | "speaker_requested"
  | "speaker_started"
  | "room_left"
  | "share_clicked";

export type AnalyticsProps = Record<string, string | number | boolean>;

/** Clés interdites en propriétés d'event (anti-fuite de données perso). */
const FORBIDDEN_PROP_KEYS = [
  "pseudo", "contact", "email", "phone", "telephone", "tel", "numero", "number", "name",
];

type Sink = (event: AnalyticsEvent, props: AnalyticsProps) => void;

let customSink: Sink | null = null;

/** Permet de brancher un collecteur custom (tests, Segment, etc.). */
export function setAnalyticsSink(sink: Sink | null): void {
  customSink = sink;
}

/** Vrai si un provider est configuré (clé PostHog ou sink custom). */
export function isAnalyticsEnabled(): boolean {
  if (customSink) return true;
  if (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_POSTHOG_KEY) return true;
  if (typeof window !== "undefined" && "posthog" in window) return true;
  return false;
}

/** Retire toute propriété sensible avant envoi. */
function scrub(props: AnalyticsProps): AnalyticsProps {
  const clean: AnalyticsProps = {};
  for (const [k, v] of Object.entries(props)) {
    if (FORBIDDEN_PROP_KEYS.includes(k.toLowerCase())) continue;
    clean[k] = v;
  }
  return clean;
}

interface PostHogLike {
  capture: (event: string, props?: AnalyticsProps) => void;
}

/**
 * Envoie un event. No-op si rien n'est configuré.
 * Jamais d'exception propagée à l'UI.
 */
export function track(event: AnalyticsEvent, props: AnalyticsProps = {}): void {
  const safeProps = scrub(props);
  try {
    if (customSink) {
      customSink(event, safeProps);
      return;
    }
    if (typeof window !== "undefined") {
      const ph = (window as unknown as { posthog?: PostHogLike }).posthog;
      if (ph?.capture) {
        ph.capture(event, safeProps);
        return;
      }
    }
    // Aucun provider : no-op silencieux (debug léger en dev).
    if (typeof process !== "undefined" && process.env?.NODE_ENV === "development") {
      // eslint-disable-next-line no-console
      console.debug(`[analytics:noop] ${event}`, safeProps);
    }
  } catch {
    // L'analytics ne doit jamais casser l'UX.
  }
}

// ── TIME TO FIRST VOICE ────────────────────────────────────
// Horodate l'entrée (landing_view / room_view) ; first_audio_received calcule
// le délai jusqu'à la première voix entendue (métrique nord de l'expérience).
let entryAt: number | null = null;

/** Marque le point de départ (t0) pour TTFV. */
export function markEntry(): void {
  entryAt = Date.now();
}

// ── Helpers typés (funnel produit) ─────────────────────────

export const analytics = {
  betaFormViewed: () => track("beta_form_viewed"),
  betaSignupSubmitted: (props: { country?: string; language?: string; intention?: string; hasContact?: boolean } = {}) =>
    track("beta_signup_submitted", {
      country: props.country ?? "",
      language: props.language ?? "",
      intention: props.intention ?? "",
      has_contact: Boolean(props.hasContact),
    }),
  countrySelected: (country: string) => track("country_selected", { country }),
  modeSelected: (mode: string) => track("mode_selected", { mode }),
  demoStarted: () => track("demo_started"),
  demoCompleted: (props: { steps?: number } = {}) => track("demo_completed", { steps: props.steps ?? 0 }),
  heroCta: (cta: string) => track("hero_cta_click", { cta }),
  betaFormStart: () => track("beta_form_start"),
  betaFormSubmit: () => track("beta_form_submit"),
  betaFormSuccess: (profileType: string) => track("beta_form_success", { profile_type: profileType }),
  betaFormError: (reason: string) => track("beta_form_error", { reason }),
  communityJoin: (id: string) => track("community_join_click", { community: id }),
  creatorJoin: () => track("creator_join_click"),
  diasporaJoin: (country: string) => track("diaspora_join_click", { country }),
  contactClick: (channel: string) => track("contact_click", { channel }),

  // ── Core loop ──
  landingView: () => { markEntry(); track("landing_view"); },
  roomView: (room: string) => { markEntry(); track("room_view", { room }); },
  onboardingStarted: () => track("onboarding_started"),
  onboardingCompleted: () => track("onboarding_completed"),
  roomJoined: (props: { room: string; role: string }) => track("room_joined", { room: props.room, role: props.role }),
  /** Première voix entendue — inclut TTFV (ms depuis landing_view / room_view). */
  firstAudioReceived: (props: { room?: string } = {}) =>
    track("first_audio_received", {
      room: props.room ?? "",
      ttfv_ms: entryAt ? Date.now() - entryAt : -1,
    }),
  speakerRequested: () => track("speaker_requested"),
  speakerStarted: () => track("speaker_started"),
  roomLeft: (props: { room?: string; seconds?: number } = {}) =>
    track("room_left", { room: props.room ?? "", seconds: props.seconds ?? 0 }),
  shareClicked: (props: { where: string } = { where: "unknown" }) => track("share_clicked", { where: props.where }),
};
