/**
 * Feature flags publics — activer/désactiver des modules sans casser l'UI.
 */
export const FLAGS = {
  authEnabled: false,
  callsEnabled: false,
  whatsappEnabled: false,
  paymentsEnabled: false,
  mobileMoneyEnabled: false,
  creatorSupportEnabled: false,
  marketplaceEnabled: false,
  pwaEnabled: true,
  circlesEnabled: true,
  betaMode: true,
  maintenanceMode: false,
} as const;

export type FlagName = keyof typeof FLAGS;
export const flag = (name: FlagName): boolean => FLAGS[name];
