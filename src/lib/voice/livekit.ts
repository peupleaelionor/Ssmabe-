import { createHmac } from "crypto";
import { normalizeIdentity, normalizeRoomName, voiceEnv } from "./env";

function base64Url(input: Buffer | string) {
  return Buffer.from(input)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function signJwt(payload: Record<string, unknown>, secret: string) {
  const header = { alg: "HS256", typ: "JWT" };
  const encodedHeader = base64Url(JSON.stringify(header));
  const encodedPayload = base64Url(JSON.stringify(payload));
  const data = `${encodedHeader}.${encodedPayload}`;
  const signature = createHmac("sha256", secret).update(data).digest();
  return `${data}.${base64Url(signature)}`;
}

export type LiveKitTokenRequest = {
  roomName?: string | null;
  identity?: string | null;
  displayName?: string | null;
  metadata?: Record<string, unknown> | null;
};

export function createLiveKitToken(input: LiveKitTokenRequest) {
  const { apiKey, apiSecret, publicUrl } = voiceEnv.livekit;

  if (!apiKey || !apiSecret || !publicUrl) {
    throw new Error("LIVEKIT_NOT_CONFIGURED");
  }

  const now = Math.floor(Date.now() / 1000);
  const expiresIn = 60 * 60;
  const roomName = normalizeRoomName(input.roomName);
  const identity = normalizeIdentity(input.identity);

  const payload = {
    iss: apiKey,
    sub: identity,
    name: input.displayName?.slice(0, 80) || identity,
    nbf: now - 10,
    exp: now + expiresIn,
    metadata: JSON.stringify({
      app: "ssmabe",
      source: "web",
      ...(input.metadata ?? {}),
    }),
    video: {
      room: roomName,
      roomJoin: true,
      canPublish: true,
      canSubscribe: true,
      canPublishData: true,
    },
  };

  return {
    provider: "livekit" as const,
    url: publicUrl,
    roomName,
    identity,
    token: signJwt(payload, apiSecret),
    expiresAt: new Date((now + expiresIn) * 1000).toISOString(),
  };
}
