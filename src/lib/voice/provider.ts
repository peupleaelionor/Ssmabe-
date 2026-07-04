import { isAgoraReady, isAgoraSecureTokenReady, isLiveKitReady, voiceEnv, type VoiceProvider } from "./env";

export function getVoiceProviderStatus() {
  const livekitReady = isLiveKitReady();
  const agoraReady = isAgoraReady();
  const preferred = voiceEnv.preferredProvider;
  const activeProvider: VoiceProvider | "none" =
    preferred === "agora" && agoraReady
      ? "agora"
      : livekitReady
        ? "livekit"
        : agoraReady
          ? "agora"
          : "none";

  return {
    activeProvider,
    preferredProvider: preferred,
    livekit: {
      configured: livekitReady,
      url: voiceEnv.livekit.publicUrl || null,
      apiKeyConfigured: Boolean(voiceEnv.livekit.apiKey),
      apiSecretConfigured: Boolean(voiceEnv.livekit.apiSecret),
    },
    agora: {
      configured: agoraReady,
      appId: voiceEnv.agora.publicAppId || null,
      secureTokenConfigured: isAgoraSecureTokenReady(),
    },
  };
}
