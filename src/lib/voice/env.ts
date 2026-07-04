export type VoiceProvider = "livekit" | "agora";

function clean(value: string | undefined): string {
  return value?.trim() ?? "";
}

export const voiceEnv = {
  preferredProvider: (clean(process.env.VOICE_PROVIDER) || "livekit") as VoiceProvider,
  livekit: {
    url: clean(process.env.LIVEKIT_URL || process.env.NEXT_PUBLIC_LIVEKIT_URL),
    publicUrl: clean(process.env.NEXT_PUBLIC_LIVEKIT_URL || process.env.LIVEKIT_URL),
    apiKey: clean(process.env.LIVEKIT_API_KEY),
    apiSecret: clean(process.env.LIVEKIT_API_SECRET),
  },
  agora: {
    appId: clean(process.env.AGORA_APP_ID || process.env.NEXT_PUBLIC_AGORA_APP_ID),
    publicAppId: clean(process.env.NEXT_PUBLIC_AGORA_APP_ID || process.env.AGORA_APP_ID),
    appCertificate: clean(process.env.AGORA_APP_CERTIFICATE),
  },
} as const;

export function isLiveKitReady() {
  return Boolean(voiceEnv.livekit.url && voiceEnv.livekit.apiKey && voiceEnv.livekit.apiSecret);
}

export function isAgoraReady() {
  return Boolean(voiceEnv.agora.appId);
}

export function isAgoraSecureTokenReady() {
  return Boolean(voiceEnv.agora.appId && voiceEnv.agora.appCertificate);
}

export function normalizeRoomName(value?: string | null) {
  const raw = clean(value ?? "").toLowerCase();
  const normalized = raw
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64);

  return normalized || "ssmabe-telechat-beta";
}

export function normalizeIdentity(value?: string | null) {
  const raw = clean(value ?? "").toLowerCase();
  const normalized = raw
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);

  return normalized || `guest-${Math.random().toString(36).slice(2, 10)}`;
}

export function normalizeUid(value?: number | string | null) {
  const parsed = Number(value);
  if (Number.isFinite(parsed) && parsed > 0) return Math.floor(parsed);
  return Math.floor(100000 + Math.random() * 899999);
}
