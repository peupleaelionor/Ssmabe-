/** GET /api/communities — communautés (mockées aujourd'hui, DB demain). */
import { NextResponse } from "next/server";
import { COMMUNITIES } from "@/config/communities";

export async function GET(): Promise<NextResponse> {
  return NextResponse.json({ ok: true, count: COMMUNITIES.length, communities: COMMUNITIES });
}
