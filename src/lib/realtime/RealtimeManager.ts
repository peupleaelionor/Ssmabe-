/**
 * RealtimeManager — single lifecycle owner for a room connection.
 *
 * STATUS: foundations, feature-flagged OFF (FLAGS.callsEnabled === false).
 * The connection cycle, backoff, heartbeat cadence and LiveKit→Agora fallback
 * decision are implemented as pure/observable logic here. The actual media
 * transport is delegated to adapters that are NOT yet wired to live SDKs and
 * MUST be validated on real devices before enabling. No live behaviour is
 * claimed until then.
 */
import { FLAGS } from "@/config/flags";
import { createLogger } from "./logger";
import { REALTIME } from "./constants";
import { reduceConnection, backoffDelay, type ConnectionAction } from "./stateMachine";
import type { ConnectionState, RealtimeConfig, RealtimeMetrics, RtEvent } from "./types";
import type { RealtimeAdapter } from "./adapters/types";
import { LiveKitAdapter } from "./adapters/livekit";
import { AgoraAdapter } from "./adapters/agora";

const log = createLogger("RealtimeManager");

export class RealtimeManager {
  private state: ConnectionState = "idle";
  private provider: RealtimeAdapter | null = null;
  private reconnects = 0;
  private pingMs: number | null = null;
  private readonly livekit = new LiveKitAdapter();
  private readonly agora = new AgoraAdapter();

  constructor(private readonly config: RealtimeConfig) {}

  getMetrics(): RealtimeMetrics {
    return {
      state: this.state,
      provider: this.provider?.name ?? null,
      pingMs: this.pingMs,
      reconnects: this.reconnects,
    };
  }

  /** Every state change goes through the strict reducer and is logged. */
  private dispatch(action: ConnectionAction): ConnectionState {
    const prev = this.state;
    this.state = reduceConnection(prev, action);
    log.info("transition", { from: prev, action, to: this.state });
    return this.state;
  }

  /** Preferred provider = LiveKit if configured, else Agora. */
  private pickProvider(): RealtimeAdapter | null {
    if (this.livekit.isConfigured()) return this.livekit;
    if (this.agora.isConfigured()) return this.agora;
    return null;
  }

  async connect(): Promise<RealtimeMetrics> {
    if (!FLAGS.callsEnabled) {
      log.warn("connect blocked: realtime feature flag is OFF");
      return this.getMetrics();
    }
    const provider = this.pickProvider();
    if (!provider) {
      log.error("no realtime provider configured");
      this.dispatch("CONNECT");
      this.dispatch("GIVE_UP");
      return this.getMetrics();
    }
    this.provider = provider;
    this.dispatch("CONNECT");
    // Actual adapter.connect(...) is deliberately not called here until the
    // provider SDKs are wired and validated on real devices.
    return this.getMetrics();
  }

  /** Compute the next reconnect delay (exposed for tests). */
  nextBackoff(): number {
    return backoffDelay(this.reconnects, REALTIME.BACKOFF_BASE_MS, REALTIME.BACKOFF_FACTOR, REALTIME.BACKOFF_MAX_MS);
  }

  sendEvent(event: RtEvent): void {
    this.provider?.sendEvent(event);
  }

  async disconnect(): Promise<void> {
    await this.provider?.disconnect();
    this.provider = null;
    this.state = "idle";
  }
}
