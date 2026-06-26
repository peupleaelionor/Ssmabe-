/**
 * Supabase Client — Songi Songi Mabé
 * --------------------------------------------------------------
 * Client fetch natif (sans @supabase/supabase-js ni @supabase/ssr,
 * ces packages ne sont pas dans package.json).
 * Pour brancher le SDK officiel, installer @supabase/supabase-js
 * et remplacer `supabaseInsert` par :
 *   const { data, error } = await supabase.from(table).insert(data).select().single()
 */

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
const SUPABASE_SERVICE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? SUPABASE_ANON_KEY;

/**
 * Vérifie si les variables d'environnement Supabase sont configurées.
 */
export function isSupabaseConfigured(): boolean {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
}

/**
 * Insert dans une table Supabase via l'API REST (client navigateur / anon key).
 * Ne pas utiliser côté serveur pour des données sensibles — préférer supabaseServerInsert.
 */
export async function supabaseInsert(
  table: string,
  data: Record<string, unknown>
): Promise<{ ok: boolean; id?: string }> {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase non configuré : NEXT_PUBLIC_SUPABASE_URL manquant");
  }

  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      Prefer: "return=representation",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Supabase insert error: ${err}`);
  }

  const rows = (await res.json()) as Array<{ id?: string }>;
  return { ok: true, id: rows[0]?.id };
}

/**
 * Insert côté serveur (Route Handler) avec la service role key.
 * Contourne le RLS — réservé aux route handlers Next.js côté serveur.
 * Ne jamais exposer SUPABASE_SERVICE_ROLE_KEY au navigateur.
 */
export async function supabaseServerInsert(
  table: string,
  data: Record<string, unknown>
): Promise<{ ok: boolean; id?: string }> {
  if (!SUPABASE_URL) {
    throw new Error("Supabase non configuré : NEXT_PUBLIC_SUPABASE_URL manquant");
  }

  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_SERVICE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
      Prefer: "return=representation",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Supabase server insert error: ${err}`);
  }

  const rows = (await res.json()) as Array<{ id?: string }>;
  return { ok: true, id: rows[0]?.id };
}

/**
 * SELECT depuis une table Supabase (lecture serveur).
 */
export async function supabaseServerSelect<T = Record<string, unknown>>(
  table: string,
  params?: { limit?: number; order?: string }
): Promise<T[]> {
  if (!SUPABASE_URL) {
    throw new Error("Supabase non configuré");
  }

  const query = new URLSearchParams();
  if (params?.limit) query.set("limit", String(params.limit));
  if (params?.order) query.set("order", params.order);

  const url = `${SUPABASE_URL}/rest/v1/${table}?${query.toString()}`;

  const res = await fetch(url, {
    headers: {
      apikey: SUPABASE_SERVICE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Supabase select error: ${err}`);
  }

  return (await res.json()) as T[];
}
