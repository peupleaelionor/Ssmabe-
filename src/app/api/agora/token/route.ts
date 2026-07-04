import { NextRequest, NextResponse } from "next/server";
import { createAgoraToken, type AgoraTokenRequest } from "@/lib/voice/agora";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json().catch(() => ({}))) as AgoraTokenRequest;
    const token = createAgoraToken(body);

    return NextResponse.json({
      ok: true,
      ...token,
      hint: token.tokenRequired
        ? "Token Agora généré côté serveur. Ne jamais exposer AGORA_APP_CERTIFICATE."
        : "AGORA_APP_CERTIFICATE absent : mode App ID uniquement. Active un certificat pour la prod sécurisée.",
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "UNKNOWN_ERROR";
    const status = message === "AGORA_NOT_CONFIGURED" ? 503 : 400;

    return NextResponse.json(
      {
        ok: false,
        error: message,
        hint: "Vérifie AGORA_APP_ID, NEXT_PUBLIC_AGORA_APP_ID et AGORA_APP_CERTIFICATE dans Vercel.",
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
      hint: "Utilise POST avec channelName et uid. Le certificat Agora reste côté serveur.",
    },
    { status: 405 },
  );
}
