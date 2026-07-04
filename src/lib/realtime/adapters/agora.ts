/**
 * Agora adapter — SCAFFOLDING, feature-flagged OFF.
 * The wire implementation (agora-rtc-sdk-ng) is intentionally NOT installed or
 * called: no live connection is claimed. connect() throws a clear error until
 * credentials + SDK are wired and validated on real devices.
 */
import type { RealtimeAdapter, AdapterCallbacks } from "./types";
import { AdapterNotConfiguredError } from "./types";
import type { RealtimeConfig, RtEvent } from "../types";

export class AgoraAdapter implements RealtimeAdapter {
  readonly name = "agora" as const;

  isConfigured(): boolean {
    return Boolean(process.env.AGORA_APP_ID && process.env.AGORA_CERTIFICATE);
  }

  async connect(_config: RealtimeConfig, _cb: AdapterCallbacks): Promise<void> {
    if (!this.isConfigured()) throw new AdapterNotConfiguredError(this.name);
    throw new Error("AgoraAdapter.connect: pending SDK wiring + real-device validation");
  }
  async publishMic(_enabled: boolean): Promise<void> {
    throw new AdapterNotConfiguredError(this.name);
  }
  sendEvent(_event: RtEvent): void {
    /* no-op until wired */
  }
  async disconnect(): Promise<void> {
    /* no-op until wired */
  }
}
