/**
 * Provider-agnostic realtime adapter contract.
 * LiveKit and Agora both implement this; RealtimeManager depends only on it
 * (layered architecture: Core → Adapters).
 */
import type { RealtimeConfig, RtEvent } from "../types";

export interface AdapterCallbacks {
  onConnected: () => void;
  onDisconnected: (reason: string) => void;
  onEvent: (event: RtEvent) => void;
  onPing: (ms: number) => void;
}

export interface RealtimeAdapter {
  readonly name: "livekit" | "agora";
  /** True when the required env credentials are present. */
  isConfigured(): boolean;
  connect(config: RealtimeConfig, cb: AdapterCallbacks): Promise<void>;
  publishMic(enabled: boolean): Promise<void>;
  sendEvent(event: RtEvent): void;
  disconnect(): Promise<void>;
}

/** Thrown when an adapter is used without credentials. */
export class AdapterNotConfiguredError extends Error {
  constructor(name: string) {
    super(`${name} adapter is not configured (missing env credentials)`);
    this.name = "AdapterNotConfiguredError";
  }
}
