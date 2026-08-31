import { EVENTS, type AppEvent } from "@/config/events";

/**
 * Source des événements : Supabase si configuré et joignable (éditable sans
 * redéploiement), sinon la config statique (fallback identique). Cache ISR 300s.
 * Server-only. Même patron robuste que getCommunities().
 */
const URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL ?? "";
const KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? process.env.SUPABASE_ANON_KEY ?? "";

interface Row {
  id: string;
  title: string;
  city: string;
  event_date: string;
  type: string;
}

export async function getEvents(): Promise<AppEvent[]> {
  if (!URL || !KEY) return EVENTS;
  try {
    const res = await fetch(
      `${URL}/rest/v1/events?select=id,title,city,event_date,type&active=eq.true&order=sort_order.asc`,
      {
        headers: { apikey: KEY, Authorization: `Bearer ${KEY}` },
        next: { revalidate: 300 },
      }
    );
    if (!res.ok) return EVENTS;
    const rows = (await res.json()) as Row[];
    if (!Array.isArray(rows) || rows.length === 0) return EVENTS;
    return rows.map((r) => ({
      id: r.id,
      title: r.title,
      city: r.city,
      date: r.event_date,
      type: r.type,
    }));
  } catch {
    return EVENTS;
  }
}
