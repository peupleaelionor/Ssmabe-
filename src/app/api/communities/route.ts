/** GET /api/communities — communautés depuis Supabase (fallback config). */
import { NextResponse } from "next/server";
import { getCommunities } from "@/lib/communities";

export const revalidate = 300;

export async function GET(): Promise<NextResponse> {
  const communities = await getCommunities();
  return NextResponse.json({ ok: true, count: communities.length, communities });
}
