import { NextRequest, NextResponse } from "next/server";
import { createLiveKitToken, type LiveKitTokenRequest } from "@/lib/voice/livekit";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json().catch(() => ({}))) as LiveKitTokenRequest;
    const token = createLiveKitToken(body);

    return NextResponse.json({ ok: true, ...token });
  } catch (error) {
    const message = error instanceof Error ? error.message : "UNKNOWN_ERROR";
    const status = message === "LIVEKIT_NOT_CONFIGURED" ? 503 : 400;

    return NextResponse.json(
      {
        ok: false,
        error: message,
        hint: "Vérifie LIVEKIT_URL, NEXT_PUBLIC_LIVEKIT_URL, LIVEKIT_API_KEY et LIVEKIT_API_SECRET dans Vercel.",
      },
      { status },
    );
  }
}

export async function GET() {
  return NextResponse.json(
    {
      ok: false,
      error: "METHOD_NOT_ALLOWED",
      hint: "Utilise POST avec roomName et identity. Les secrets LiveKit restent côté serveur.",
    },
    { status: 405 },
  );
}
