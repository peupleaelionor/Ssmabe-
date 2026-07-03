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
  | "beta_form_viewed"
  | "beta_signup_submitted"
  | "country_selected"
  | "mode_selected"
  | "demo_started"
  | "demo_completed";

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
};
