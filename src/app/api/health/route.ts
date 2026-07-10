import { NextResponse } from "next/server";
import { env } from "@/lib/env";
import { FLAGS } from "@/config/flags";
import { isSupabaseConfigured } from "@/lib/supabase";
import { isLiveKitReady, isAgoraReady, isAgoraSecureTokenReady } from "@/lib/voice/env";

/**
 * GET /api/health — état de l'app + intégrations configurées.
 * Uniquement des booléens/états : aucune clef ni valeur n'est jamais exposée.
 * Après avoir inséré une clef API sur Vercel + redéployé, cette route permet
 * de vérifier qu'elle est bien prise en compte.
 */
export async function GET(): Promise<NextResponse> {
  return NextResponse.json({
    status: "ok",
    app: "ssmabe",
    version: env.commitSha.slice(0, 7),
    environment: env.vercelEnv,
    beta: FLAGS.maintenanceMode ? "maintenance" : FLAGS.betaMode ? "open" : "closed",
    integrations: {
      supabase: isSupabaseConfigured() ? "configured" : "fallback-local",
      supabaseServiceRole: process.env.SUPABASE_SERVICE_ROLE_KEY ? "configured" : "missing",
      livekit: isLiveKitReady() ? "configured" : "missing",
      agora: isAgoraReady() ? (isAgoraSecureTokenReady() ? "configured-secure" : "configured-insecure") : "missing",
      posthog: env.posthogKey ? "configured" : "missing",
      contactPhone: process.env.NEXT_PUBLIC_CONTACT_PHONE_NUMBER ? "configured" : "missing",
      contactWhatsApp: process.env.NEXT_PUBLIC_CONTACT_WHATSAPP_NUMBER ? "configured" : "missing",
    },
    flags: {
      calls: FLAGS.callsEnabled,
      whatsapp: FLAGS.whatsappEnabled,
      payments: FLAGS.paymentsEnabled,
      circles: FLAGS.circlesEnabled,
    },
  });
}
