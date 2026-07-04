/** Realtime domain types. Strict — no `any` in exported signatures. */
import type { RtEventType } from "./constants";

export type ConnectionState =
  | "idle"
  | "connecting"
  | "connected"
  | "fallback"
  | "reconnecting"
  | "disconnected";

export type Provider = "livekit" | "agora";

export type NetworkClass = "2g" | "3g" | "4g" | "5g" | "unknown";

export interface ParticipantState {
  identity: string;
  muted: boolean;
  speaking: boolean;
  handRaised: boolean;
}

export interface RtEvent {
  type: RtEventType;
  from: string;
  payload?: Record<string, string | number | boolean>;
  at: number;
}

export interface RealtimeConfig {
  roomId: string;
  identity: string;
  networkClass: NetworkClass;
}

export interface RealtimeMetrics {
  state: ConnectionState;
  provider: Provider | null;
  pingMs: number | null;
  reconnects: number;
}
