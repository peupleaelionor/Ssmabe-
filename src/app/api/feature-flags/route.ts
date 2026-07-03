/** GET /api/feature-flags — flags publics (jamais de secret ici). */
import { NextResponse } from "next/server";
import { FLAGS } from "@/config/flags";

export async function GET(): Promise<NextResponse> {
  return NextResponse.json({
    callsEnabled: FLAGS.callsEnabled,
    whatsappEnabled: FLAGS.whatsappEnabled,
    paymentsEnabled: FLAGS.paymentsEnabled,
    authEnabled: FLAGS.authEnabled,
    betaMode: FLAGS.betaMode,
    maintenanceMode: FLAGS.maintenanceMode,
  });
}
