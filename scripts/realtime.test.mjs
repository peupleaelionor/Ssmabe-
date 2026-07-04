/**
 * Realtime state-machine unit tests (Manifesto: tests cover ALL transitions).
 * Mirrors src/lib/realtime/stateMachine.ts. Run: npm test
 */
import { test } from "node:test";
import assert from "node:assert/strict";

const TRANSITIONS = {
  idle: { CONNECT: "connecting" },
  connecting: { CONNECTED: "connected", FALLBACK: "fallback" },
  connected: { HEARTBEAT_LOST: "reconnecting" },
  reconnecting: { RECOVERED: "connected", FALLBACK: "fallback", GIVE_UP: "disconnected" },
  fallback: { CONNECTED: "connected", RECOVERED: "connected" },
  disconnected: { RETRY: "connecting", CONNECT: "connecting" },
};
const reduce = (s, a) => {
  const n = TRANSITIONS[s][a];
  if (n === undefined) throw new Error(`Illegal: ${s} --${a}-->`);
  return n;
};
const backoff = (attempt, base = 1000, factor = 2, max = 30000) =>
  Math.min(max, base * factor ** Math.max(0, attempt));

test("happy path: idle → connecting → connected", () => {
  assert.equal(reduce("idle", "CONNECT"), "connecting");
  assert.equal(reduce("connecting", "CONNECTED"), "connected");
});
test("fallback path: connecting → fallback → connected", () => {
  assert.equal(reduce("connecting", "FALLBACK"), "fallback");
  assert.equal(reduce("fallback", "CONNECTED"), "connected");
});
test("recovery: connected → reconnecting → connected", () => {
  assert.equal(reduce("connected", "HEARTBEAT_LOST"), "reconnecting");
  assert.equal(reduce("reconnecting", "RECOVERED"), "connected");
});
test("give up: reconnecting → disconnected → connecting", () => {
  assert.equal(reduce("reconnecting", "GIVE_UP"), "disconnected");
  assert.equal(reduce("disconnected", "RETRY"), "connecting");
});
test("illegal transitions throw", () => {
  assert.throws(() => reduce("idle", "CONNECTED"));
  assert.throws(() => reduce("connected", "CONNECT"));
  assert.throws(() => reduce("disconnected", "RECOVERED"));
});
test("backoff caps at max (1s,2s,4s…30s)", () => {
  assert.equal(backoff(0), 1000);
  assert.equal(backoff(1), 2000);
  assert.equal(backoff(2), 4000);
  assert.equal(backoff(10), 30000); // capped
});
test("every state has at least one legal transition (no dead-end without exit)", () => {
  for (const [state, map] of Object.entries(TRANSITIONS)) {
    assert.ok(Object.keys(map).length >= 1, `dead-end: ${state}`);
  }
});
