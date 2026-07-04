/** Realtime foundations — public surface. Feature-flagged OFF until wired. */
export { RealtimeManager } from "./RealtimeManager";
export { reduceConnection, canTransition, backoffDelay, IllegalTransitionError } from "./stateMachine";
export { createLogger, setLogSink } from "./logger";
export { REALTIME, RT_EVENT, ROOM_PREFIX, CACHE_KEY, BUILD_TAG } from "./constants";
export type { ConnectionState, Provider, NetworkClass, ParticipantState, RtEvent, RealtimeConfig, RealtimeMetrics } from "./types";
export type { RealtimeAdapter } from "./adapters/types";
