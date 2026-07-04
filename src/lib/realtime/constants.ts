/**
 * Realtime constants — NO magic strings anywhere else.
 * Every room id prefix, event type and cache key lives here (Manifesto law #5).
 */
export const REALTIME = {
  HEARTBEAT_MS: 5_000,
  LIVEKIT_PING_TIMEOUT_MS: 2_000,
  BACKOFF_BASE_MS: 1_000,
  BACKOFF_MAX_MS: 30_000,
  BACKOFF_FACTOR: 2,
  LOW_BAND_AUDIO_HZ: 8_000,
} as const;

export const ROOM_PREFIX = {
  COMMUNITY: "room:community:",
  DIRECT: "room:direct:",
  EVENT: "room:event:",
} as const;

/** Data-channel event types (reliable, retried). */
export const RT_EVENT = {
  MUTE: "rt.mute",
  SPEAKING: "rt.speaking",
  HAND_RAISED: "rt.hand_raised",
  TYPING: "rt.typing",
  PRESENCE: "rt.presence",
  HEARTBEAT: "rt.heartbeat",
} as const;

export const CACHE_KEY = {
  /** Versioned by build sha so a deploy invalidates hot caches. */
  presence: (roomId: string) => `presence:${BUILD_TAG}:${roomId}`,
  token: (roomId: string, identity: string) => `token:${BUILD_TAG}:${roomId}:${identity}`,
} as const;

export const BUILD_TAG =
  process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? "dev";

export type RtEventType = (typeof RT_EVENT)[keyof typeof RT_EVENT];
