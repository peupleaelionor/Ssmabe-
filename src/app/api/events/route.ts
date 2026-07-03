/** GET /api/events — événements mockés (structure prête pour la DB). */
import { NextResponse } from "next/server";

const EVENTS = [
  { id: "e1", title: "Ouverture bêta Kinshasa", city: "Kinshasa", date: "2026-08-01", type: "beta" },
  { id: "e2", title: "Salon créateurs diaspora", city: "Paris", date: "2026-08-15", type: "createurs" },
  { id: "e3", title: "Rencontre entrepreneurs", city: "Lubumbashi", date: "2026-09-01", type: "business" },
];

export async function GET(): Promise<NextResponse> {
  return NextResponse.json({ ok: true, events: EVENTS });
}
