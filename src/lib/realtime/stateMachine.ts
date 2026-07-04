/**
 * Connection state machine (imposed pattern).
 * Strict reducer: any transition not declared throws in dev.
 */
import type { ConnectionState } from "./types";

export type ConnectionAction =
  | "CONNECT"
  | "CONNECTED"
  | "HEARTBEAT_LOST"
  | "FALLBACK"
  | "RECOVERED"
  | "GIVE_UP"
  | "RETRY";

/** Allowed transitions — mirrors the manifesto diagram exactly. */
const TRANSITIONS: Record<ConnectionState, Partial<Record<ConnectionAction, ConnectionState>>> = {
  idle: { CONNECT: "connecting" },
  connecting: { CONNECTED: "connected", FALLBACK: "fallback" },
  connected: { HEARTBEAT_LOST: "reconnecting" },
  reconnecting: { RECOVERED: "connected", FALLBACK: "fallback", GIVE_UP: "disconnected" },
  fallback: { CONNECTED: "connected", RECOVERED: "connected" },
  disconnected: { RETRY: "connecting", CONNECT: "connecting" },
};

export class IllegalTransitionError extends Error {
  constructor(from: ConnectionState, action: ConnectionAction) {
    super(`Illegal transition: ${from} --${action}-->`);
    this.name = "IllegalTransitionError";
  }
}

/**
 * Pure reducer. Returns the next state, or throws in dev on an illegal
 * transition (fail fast). In production it returns the current state unchanged
 * and the caller is expected to have logged the anomaly.
 */
export function reduceConnection(state: ConnectionState, action: ConnectionAction): ConnectionState {
  const next = TRANSITIONS[state][action];
  if (next === undefined) {
    if (process.env.NODE_ENV !== "production") {
      throw new IllegalTransitionError(state, action);
    }
    return state;
  }
  return next;
}

export function canTransition(state: ConnectionState, action: ConnectionAction): boolean {
  return TRANSITIONS[state][action] !== undefined;
}

/** Exponential backoff with cap (1s, 2s, 4s … max 30s). */
export function backoffDelay(attempt: number, base = 1_000, factor = 2, max = 30_000): number {
  return Math.min(max, base * factor ** Math.max(0, attempt));
}
