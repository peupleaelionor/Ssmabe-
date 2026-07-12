/**
 * Feature flags publics — activer/désactiver des modules sans casser l'UI.
 * Chaque flag est surchargeable par variable d'environnement Vercel
 * (NEXT_PUBLIC_FLAG_*) : "1"/"true" = on, "0"/"false" = off, absente = défaut.
 * Les NEXT_PUBLIC_* sont inlinées au build — un redéploiement les applique.
 */
const bool = (v: string | undefined, fallback: boolean): boolean => {
  if (v == null || v === "") return fallback;
  const s = v.trim().toLowerCase();
  return s === "1" || s === "true" || s === "on";
};

export const FLAGS = {
  authEnabled: bool(process.env.NEXT_PUBLIC_FLAG_AUTH, false),
  callsEnabled: bool(process.env.NEXT_PUBLIC_FLAG_CALLS, false),
  whatsappEnabled: bool(process.env.NEXT_PUBLIC_FLAG_WHATSAPP, false),
  paymentsEnabled: bool(process.env.NEXT_PUBLIC_FLAG_PAYMENTS, false),
  mobileMoneyEnabled: bool(process.env.NEXT_PUBLIC_FLAG_MOBILE_MONEY, false),
  creatorSupportEnabled: bool(process.env.NEXT_PUBLIC_FLAG_CREATOR_SUPPORT, false),
  marketplaceEnabled: bool(process.env.NEXT_PUBLIC_FLAG_MARKETPLACE, false),
  pwaEnabled: bool(process.env.NEXT_PUBLIC_FLAG_PWA, true),
  circlesEnabled: bool(process.env.NEXT_PUBLIC_FLAG_CIRCLES, true),
  avatarsEnabled: bool(process.env.NEXT_PUBLIC_FLAG_AVATARS, true),
  betaMode: bool(process.env.NEXT_PUBLIC_FLAG_BETA, true),
  maintenanceMode: bool(process.env.NEXT_PUBLIC_FLAG_MAINTENANCE, false),
} as const;

export type FlagName = keyof typeof FLAGS;
export const flag = (name: FlagName): boolean => FLAGS[name];
