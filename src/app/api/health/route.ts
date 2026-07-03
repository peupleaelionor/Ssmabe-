import { NextResponse } from "next/server";
import { env } from "@/lib/env";
import { FLAGS } from "@/config/flags";

export async function GET(): Promise<NextResponse> {
  return NextResponse.json({
    status: "ok",
    app: "ssmabe",
    version: env.commitSha.slice(0, 7),
    environment: env.vercelEnv,
    beta: FLAGS.maintenanceMode ? "maintenance" : FLAGS.betaMode ? "open" : "closed",
    supabase: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) ? "configured" : "fallback",
  });
}
