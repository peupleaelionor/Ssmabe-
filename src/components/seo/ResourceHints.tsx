/**
 * Resource hints — préconnexion aux backends réellement configurés.
 * Dérivé des variables publiques (inlinées au build) : la poignée de main
 * TLS est déjà faite quand l'inscription (Supabase) ou l'appel (LiveKit) part.
 * N'émet rien si la clef est absente — aucun hint mort.
 */
function origin(raw?: string): string | null {
  if (!raw) return null;
  try {
    // wss:// → https:// pour la préconnexion (même hôte).
    return new URL(raw.replace(/^wss:/, "https:")).origin;
  } catch {
    return null;
  }
}

export function ResourceHints() {
  const hosts = Array.from(
    new Set(
      [
        origin(process.env.NEXT_PUBLIC_SUPABASE_URL),
        origin(process.env.NEXT_PUBLIC_LIVEKIT_URL),
      ].filter((h): h is string => Boolean(h))
    )
  );

  if (hosts.length === 0) return null;
  return (
    <>
      {hosts.map((h) => (
        <link key={h} rel="preconnect" href={h} crossOrigin="anonymous" />
      ))}
    </>
  );
}
