import type { NextConfig } from "next";

/**
 * En-têtes de sécurité globaux.
 * La CSP autorise uniquement le nécessaire : self + les backends activables
 * par clefs API (Supabase, LiveKit, Agora, PostHog, Vercel vitals).
 * `unsafe-inline` reste requis par le runtime Next.js (scripts d'hydratation)
 * et par les styles injectés — pas d'eval en revanche.
 */
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  [
    "connect-src 'self'",
    "https://*.supabase.co wss://*.supabase.co",
    "https://*.livekit.cloud wss://*.livekit.cloud",
    "https://*.agora.io wss://*.agora.io https://*.sd-rtn.com wss://*.sd-rtn.com",
    "https://*.posthog.com https://*.i.posthog.com",
    "https://vitals.vercel-insights.com",
  ].join(" "),
  "media-src 'self' blob:",
  "worker-src 'self' blob:",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const SECURITY_HEADERS = [
  { key: "Content-Security-Policy", value: CSP },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Micro autorisé (téléchat vocal) ; caméra et géoloc refusées par défaut.
  { key: "Permissions-Policy", value: "microphone=(self), camera=(), geolocation=(), payment=()" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/(.*)", headers: SECURITY_HEADERS }];
  },
};

export default nextConfig;
