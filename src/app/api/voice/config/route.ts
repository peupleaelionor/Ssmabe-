import { NextResponse } from "next/server";
import { getVoiceProviderStatus } from "@/lib/voice/provider";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json({
    ok: true,
    voice: getVoiceProviderStatus(),
  });
}
