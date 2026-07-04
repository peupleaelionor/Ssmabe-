# PR15 — Foundations grading (honest)

Realtime foundations, feature-flagged OFF. Only what was actually verified in
this environment is checked. Device/live items are explicitly left for the
operator (no LiveKit/Agora keys, no second phone, no live network here).

## Verified here ✅
- [x] Strict connection state machine (reducer throws on illegal transition in dev)
- [x] All transitions covered by unit tests (`scripts/realtime.test.mjs`, 7 tests)
- [x] Exponential backoff (1s,2s,4s…cap 30s) implemented + tested
- [x] Structured JSON logger (swappable sink) — no raw console.log in feature code
- [x] Typed constants, zero magic strings (`realtime/constants.ts`)
- [x] 0 `any` in exported signatures (tsc strict, 0 errors)
- [x] Adapters behind a provider-agnostic interface (LiveKit / Agora)
- [x] Feature flag OFF: RealtimeManager.connect() no-ops until `FLAGS.callsEnabled`
- [x] Build green, lint 0 errors, bundle unchanged (no runtime deps added)

## Requires operator / real hardware ⛔ (cannot be done in this env)
- [ ] LiveKit connection on two physical devices
- [ ] Agora fallback measured (switch < 1s)
- [ ] Reconnect after real 30s cut, 5×, 0 failure
- [ ] Heartbeat ping/pong on live transport
- [ ] 2G audio downgrade validated on a throttled device
- [ ] "Apocalypse réseau" chaos E2E (Puppeteer + network sim)
- [ ] Lighthouse mobile ≥ 98 on deployed preview

## To unblock the ⛔ items
1. Create LiveKit + Agora projects; add keys in Vercel (see `.env.example`).
2. Set `FLAGS.callsEnabled = true` only AFTER the wire implementation is added
   to the adapters and validated on devices.
3. Wire `livekit-client` / `agora-rtc-sdk-ng` inside the adapter `connect()`
   methods (currently they throw a clear "pending wiring" error by design).

> This PR deliberately claims NO live realtime behaviour. It ships the
> observable, testable skeleton so the wire implementation drops in without
> refactor. See docs/ENGINEERING_MANIFESTO.md.
