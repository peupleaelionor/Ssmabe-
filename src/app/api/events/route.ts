/** GET /api/events — événements depuis Supabase (fallback config). */
import { NextResponse } from "next/server";
import { getEvents } from "@/lib/events";

export const revalidate = 300;

export async function GET(): Promise<NextResponse> {
  const events = await getEvents();
  return NextResponse.json({ ok: true, count: events.length, events });
}
