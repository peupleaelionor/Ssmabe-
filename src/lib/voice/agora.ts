import { normalizeRoomName, normalizeUid, voiceEnv } from "./env";

export type AgoraTokenRequest = {
  channelName?: string | null;
  uid?: number | string | null;
  role?: "publisher" | "subscriber" | null;
};

/**
 * Agora readiness helper.
 * Pour éviter d'ajouter une dépendance fragile au MVP, la route renvoie un token nul.
 * Si App Certificate est activé, il faudra brancher un token server Agora dédié avant la prod.
 */
export function createAgoraToken(input: AgoraTokenRequest) {
  const { publicAppId, appCertificate } = voiceEnv.agora;
  if (!publicAppId) {
    throw new Error("AGORA_NOT_CONFIGURED");
  }

  const channelName = normalizeRoomName(input.channelName);
  const uid = normalizeUid(input.uid);
  const now = Math.floor(Date.now() / 1000);
  const expiresIn = 60 * 60;
  const privilegeExpireTime = now + expiresIn;

  return {
    provider: "agora" as const,
    appId: publicAppId,
    channelName,
    uid,
    role: input.role === "subscriber" ? "subscriber" : "publisher",
    token: null,
    tokenRequired: Boolean(appCertificate),
    tokenServerReady: false,
    expiresAt: new Date(privilegeExpireTime * 1000).toISOString(),
  };
}
