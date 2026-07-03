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
  { key: "faviconIco", path: "/brand/favicon.ico", critical: true },
  { key: "appIcon192", path: "/brand/app-icon-192.png", critical: true },
  { key: "appIcon512", path: "/brand/app-icon-512.png", critical: true },
  { key: "ogBrand", path: "/brand/og-ssmabe-brand.png", critical: true },
  { key: "logoSymbol", path: "/brand/logo-ssmabe-symbol.svg", critical: true },
  { key: "logoHorizontalDark", path: "/brand/logo-ssmabe-horizontal-dark.svg", critical: true },
  { key: "logoHorizontalLight", path: "/brand/logo-ssmabe-horizontal-light.svg", critical: false },
  { key: "logoStackedDark", path: "/brand/logo-ssmabe-stacked-dark.svg", critical: false },
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
