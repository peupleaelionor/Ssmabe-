/**
 * Accès centralisé aux variables d'environnement.
 * Le site fonctionne sans backend : tout est optionnel, rien ne throw.
 */
export const env = {
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
  posthogKey: process.env.NEXT_PUBLIC_POSTHOG_KEY ?? "",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://ssmabe.vercel.app",
  appEnv: process.env.NEXT_PUBLIC_APP_ENV ?? "development",
  commitSha: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA ?? "dev",
  vercelEnv: process.env.VERCEL_ENV ?? process.env.NODE_ENV ?? "development",
} as const;

export const hasSupabase = (): boolean =>
  Boolean(env.supabaseUrl && env.supabaseAnonKey);
