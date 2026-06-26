/**
 * launchReadinessRobot — score de préparation au lancement.
 * --------------------------------------------------------------
 * Agrège des signaux booléens en un score pondéré + prochaine action.
 */
export interface LaunchSignals {
  betaForm: boolean;
  supabase: boolean;
  build: boolean;
  assets: boolean;
  seo: boolean;
  security: boolean;
  analytics: boolean;
  admin: boolean;
}

const WEIGHTS: Record<keyof LaunchSignals, number> = {
  betaForm: 18,
  build: 16,
  security: 16,
  supabase: 14,
  seo: 12,
  admin: 10,
  assets: 8,
  analytics: 6,
};

const LABELS: Record<keyof LaunchSignals, string> = {
  betaForm: "Formulaire bêta",
  supabase: "Supabase configuré",
  build: "Build OK",
  assets: "Assets prêts",
  seo: "SEO / OG",
  security: "Sécurité",
  analytics: "Analytics",
  admin: "Admin dashboard",
};

export interface LaunchReadinessReport {
  score: number; // 0-100
  level: "not_ready" | "almost" | "ready";
  passed: string[];
  missing: string[];
  nextAction: string;
}

export function runLaunchReadinessRobot(signals: LaunchSignals): LaunchReadinessReport {
  let score = 0;
  const passed: string[] = [];
  const missing: string[] = [];

  (Object.keys(WEIGHTS) as (keyof LaunchSignals)[]).forEach((key) => {
    if (signals[key]) {
      score += WEIGHTS[key];
      passed.push(LABELS[key]);
    } else {
      missing.push(LABELS[key]);
    }
  });

  const level = score >= 90 ? "ready" : score >= 70 ? "almost" : "not_ready";

  // Prochaine action = item manquant au poids le plus élevé.
  const nextMissing = (Object.keys(WEIGHTS) as (keyof LaunchSignals)[])
    .filter((k) => !signals[k])
    .sort((a, b) => WEIGHTS[b] - WEIGHTS[a])[0];

  const nextAction = nextMissing
    ? `Traiter en priorité : ${LABELS[nextMissing]}.`
    : "Prêt à lancer la bêta publique 🚀";

  return { score, level, passed, missing, nextAction };
}
