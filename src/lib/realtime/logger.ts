/**
 * Structured production logger (Manifesto law #2: everything observable).
 * Emits single-line JSON; swappable sink for Sentry/Datadog later.
 * Never use console.log directly elsewhere.
 */
export type LogLevel = "debug" | "info" | "warn" | "error";

export interface LogRecord {
  level: LogLevel;
  scope: string;
  msg: string;
  at: string;
  data?: Record<string, unknown>;
}

type Sink = (record: LogRecord) => void;

const defaultSink: Sink = (record) => {
  // eslint-disable-next-line no-console
  const fn = record.level === "error" ? console.error : record.level === "warn" ? console.warn : console.info;
  fn(JSON.stringify(record));
};

let sink: Sink = defaultSink;

/** Swap the sink (e.g. forward to Sentry). */
export function setLogSink(next: Sink): void {
  sink = next;
}

export function createLogger(scope: string) {
  const emit = (level: LogLevel, msg: string, data?: Record<string, unknown>) =>
    sink({ level, scope, msg, at: new Date().toISOString(), data });
  return {
    debug: (m: string, d?: Record<string, unknown>) => emit("debug", m, d),
    info: (m: string, d?: Record<string, unknown>) => emit("info", m, d),
    warn: (m: string, d?: Record<string, unknown>) => emit("warn", m, d),
    error: (m: string, d?: Record<string, unknown>) => emit("error", m, d),
  };
}
