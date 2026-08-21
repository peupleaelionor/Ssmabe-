import { COMMUNITIES, type Community } from "@/config/communities";

/**
 * Source des communautés : Supabase si configuré (éditable sans redéploiement),
 * sinon la config statique (fallback, seed identique). Cache ISR 300 s.
 * Server-only : ne pas importer depuis un composant client.
 */
const URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL ?? "";
const KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? process.env.SUPABASE_ANON_KEY ?? "";

interface Row {
  id: string;
  name: string;
  country: string;
  city: string | null;
  category: string;
  description: string;
  member_count: string | null;
  status: string;
  tags: string[] | null;
  cta_label: string;
}

export async function getCommunities(): Promise<Community[]> {
  if (!URL || !KEY) return COMMUNITIES;
  try {
    const res = await fetch(
      `${URL}/rest/v1/communities?select=*&active=eq.true&order=sort_order.asc`,
      {
        headers: { apikey: KEY, Authorization: `Bearer ${KEY}` },
        next: { revalidate: 300 },
      }
    );
    if (!res.ok) return COMMUNITIES;
    const rows = (await res.json()) as Row[];
    if (!Array.isArray(rows) || rows.length === 0) return COMMUNITIES;
    return rows.map((r) => ({
      id: r.id,
      name: r.name,
      country: r.country,
      city: r.city ?? undefined,
      category: r.category as Community["category"],
      description: r.description,
      memberCount: r.member_count ?? "",
      status: r.status === "active" ? "active" : "beta",
      tags: r.tags ?? [],
      ctaLabel: r.cta_label,
    }));
  } catch {
    return COMMUNITIES;
  }
}
