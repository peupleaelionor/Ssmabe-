import { NextResponse } from "next/server";

/**
 * GET /api/waitlist/count — total RÉEL d'inscrits via la fonction Supabase
 * public.waitlist_count() (n'expose que le nombre, jamais les lignes).
 * Renvoie { count: null } si Supabase n'est pas configuré ou injoignable.
 * Aucun chiffre fabriqué : point 55 du cahier des charges.
 */
const URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL ?? "";
const KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? process.env.SUPABASE_ANON_KEY ?? "";

export const revalidate = 60;

export async function GET(): Promise<NextResponse> {
  if (!URL || !KEY) return NextResponse.json({ count: null });
  try {
    const res = await fetch(`${URL}/rest/v1/rpc/waitlist_count`, {
      method: "POST",
      headers: {
        apikey: KEY,
        Authorization: `Bearer ${KEY}`,
        "Content-Type": "application/json",
      },
      body: "{}",
      next: { revalidate: 60 },
    });
    if (!res.ok) return NextResponse.json({ count: null });
    const value = (await res.json()) as unknown;
    return NextResponse.json({ count: typeof value === "number" ? value : null });
  } catch {
    return NextResponse.json({ count: null });
  }
}
