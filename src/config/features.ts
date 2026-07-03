/**
 * Feature flags — activation progressive sans redéploiement de code.
 * Chaque flag correspond à un module préparé dans lib/ ou à venir.
 */
export const features = {
  betaForm: true,
  demoVoice: true,
  analytics: false, // s'active seul si NEXT_PUBLIC_POSTHOG_KEY présent
  auth: false,
  profiles: false,
  posts: false,
  comments: false,
  reactions: false,
  rooms: false,
  messaging: false,
  shortAudio: false,
  notifications: false,
  communities: false,
  marketplace: false,
  payments: false,
  mobileMoney: false,
  creators: false,
  whatsappShare: true,
  reporting: true, // safety-shield prêt
  moderation: true, // robots + admin prêts
  adminDashboard: true,
  lowDataMode: true, // le site est léger par défaut
  i18n: false, // contenu prêt (fr/en/ln), routing à activer
} as const;

export type FeatureFlag = keyof typeof features;

export function isEnabled(flag: FeatureFlag): boolean {
  return features[flag];
}
