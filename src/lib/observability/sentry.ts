/**
 * Sentry — capture d'exception serveur via l'API Store (aucun SDK).
 * No-op si SENTRY_DSN absente. Fire-and-forget : n'attend pas la réponse
 * et n'échoue jamais la requête appelante.
 *
 * DSN attendu : https://<publicKey>@<host>/<projectId>
 * (client-side non couvert ici — nécessiterait NEXT_PUBLIC_SENTRY_DSN).
 */
const DSN = process.env.SENTRY_DSN ?? "";
const ENV = process.env.VERCEL_ENV ?? process.env.NODE_ENV ?? "development";
const RELEASE = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA ?? "dev";

interface ParsedDsn {
  storeUrl: string;
  publicKey: string;
}

function parseDsn(dsn: string): ParsedDsn | null {
  try {
    const u = new URL(dsn);
    const projectId = u.pathname.replace(/^\//, "");
    if (!u.username || !projectId) return null;
    return {
      publicKey: u.username,
      storeUrl: `${u.protocol}//${u.host}/api/${projectId}/store/`,
    };
  } catch {
    return null;
  }
}

const PARSED = DSN ? parseDsn(DSN) : null;

export const isSentryConfigured = (): boolean => PARSED !== null;

function uuid(): string {
  return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, (ch) => {
    const r = (Math.random() * 16) | 0;
    return (ch === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

/** Envoie une exception à Sentry. Ne throw jamais, ne bloque jamais. */
export function captureException(err: unknown, context?: Record<string, string>): void {
  if (!PARSED) return;
  const value = err instanceof Error ? err.message : String(err);
  const type = err instanceof Error ? err.name : "Error";
  const event = {
    event_id: uuid(),
    timestamp: new Date().toISOString(),
    platform: "node",
    level: "error",
    environment: ENV,
    release: RELEASE,
    tags: context,
    exception: { values: [{ type, value }] },
  };
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "X-Sentry-Auth": `Sentry sentry_version=7, sentry_key=${PARSED.publicKey}, sentry_client=ssmabe-lite/1.0`,
  };
  // Fire-and-forget.
  fetch(PARSED.storeUrl, { method: "POST", headers, body: JSON.stringify(event) }).catch(() => {});
}
