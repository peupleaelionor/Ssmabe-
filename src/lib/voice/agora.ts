import { RtcRole, RtcTokenBuilder } from "agora-access-token";
import { normalizeRoomName, normalizeUid, voiceEnv } from "./env";

export type AgoraTokenRequest = {
  channelName?: string | null;
  uid?: number | string | null;
  role?: "publisher" | "subscriber" | null;
};

export function createAgoraToken(input: AgoraTokenRequest) {
  const { publicAppId, appCertificate } = voiceEnv.agora;
  if (!publicAppId) {
    throw new Error("AGORA_NOT_CONFIGURED");
  }

  const channelName = normalizeRoomName(input.channelName);
  const uid = normalizeUid(input.uid);
  const role = input.role === "subscriber" ? RtcRole.SUBSCRIBER : RtcRole.PUBLISHER;
  const now = Math.floor(Date.now() / 1000);
  const expiresIn = 60 * 60;
  const privilegeExpireTime = now + expiresIn;

  const token = appCertificate
    ? RtcTokenBuilder.buildTokenWithUid(publicAppId, appCertificate, channelName, uid, role, privilegeExpireTime)
    : null;

  return {
    provider: "agora" as const,
    appId: publicAppId,
    channelName,
    uid,
    role: input.role === "subscriber" ? "subscriber" : "publisher",
    token,
    tokenRequired: Boolean(appCertificate),
    expiresAt: new Date(privilegeExpireTime * 1000).toISOString(),
  };
}
