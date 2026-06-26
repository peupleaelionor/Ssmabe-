/**
 * assetCheckRobot — vérifie la présence des assets requis.
 * --------------------------------------------------------------
 * Pur : prend la liste des chemins d'assets disponibles et la
 * compare à la liste attendue. Aucune lecture disque (SSR-safe).
 */
export interface RequiredAsset {
  key: string;
  path: string;
  critical: boolean;
}

/** Assets attendus pour un lancement bêta propre. */
export const REQUIRED_ASSETS: RequiredAsset[] = [
  { key: "favicon", path: "/favicon.svg", critical: true },
  { key: "appIcon", path: "/assets/songi/icons/app-icon.svg", critical: true },
  { key: "maskableIcon", path: "/assets/songi/icons/maskable-icon.svg", critical: false },
  { key: "ogCover", path: "/assets/songi/social/og-cover.svg", critical: true },
  { key: "logoHorizontal", path: "/assets/songi/logo/logo-primary-horizontal.svg", critical: true },
  { key: "logoRound", path: "/assets/songi/logo/logo-round.svg", critical: false },
  { key: "mascotDark", path: "/assets/songi/mascot/mascot-head-dark.svg", critical: false },
  { key: "mascotLight", path: "/assets/songi/mascot/mascot-head-light.svg", critical: false },
  { key: "badgeAnonymous", path: "/assets/songi/security/badge-anonymous.svg", critical: false },
  { key: "badgeSecurity", path: "/assets/songi/security/badge-security.svg", critical: false },
  { key: "badgeDiaspora", path: "/assets/songi/security/badge-diaspora.svg", critical: false },
  { key: "badgeConsent", path: "/assets/songi/security/badge-consent.svg", critical: false },
  { key: "manifest", path: "/manifest.json", critical: true },
];

export interface AssetCheckReport {
  total: number;
  present: number;
  missing: RequiredAsset[];
  missingCritical: RequiredAsset[];
  readinessScore: number; // 0-100
  ready: boolean;
}

/**
 * @param availablePaths chemins réellement présents (ex. issus d'un glob build-time).
 */
export function runAssetCheckRobot(availablePaths: string[]): AssetCheckReport {
  const available = new Set(availablePaths);
  const missing = REQUIRED_ASSETS.filter((a) => !available.has(a.path));
  const missingCritical = missing.filter((a) => a.critical);
  const present = REQUIRED_ASSETS.length - missing.length;
  const readinessScore = Math.round((present / REQUIRED_ASSETS.length) * 100);

  return {
    total: REQUIRED_ASSETS.length,
    present,
    missing,
    missingCritical,
    readinessScore,
    ready: missingCritical.length === 0,
  };
}
