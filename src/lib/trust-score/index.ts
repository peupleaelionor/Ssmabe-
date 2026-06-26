import { TrustLevel, type SafetyEvent, type TrustScore } from "@/lib/types";
import { TRUST_SCORE_DEFAULTS, TRUST_SCORE_EVENTS } from "@/lib/constants/config";

// In-memory store (replace with DB in production)
const trustScoreCache = new Map<string, TrustScore>();

export function calculateTrustScore(userId: string, events: SafetyEvent[]): number {
  let score = TRUST_SCORE_DEFAULTS.NEW_USER;

  for (const event of events) {
    score += event.value;
    score = Math.max(TRUST_SCORE_DEFAULTS.MIN, Math.min(TRUST_SCORE_DEFAULTS.MAX, score));
  }

  return score;
}

export function getTrustLevel(score: number): TrustLevel {
  const { THRESHOLDS: thresholds } = TRUST_SCORE_DEFAULTS;
  if (score >= thresholds.vip) return TrustLevel.VIP;
  if (score >= thresholds.verified) return TrustLevel.VERIFIED;
  if (score >= thresholds.trusted) return TrustLevel.TRUSTED;
  return TrustLevel.NEW;
}

export function updateTrustScore(userId: string, event: SafetyEvent): number {
  const existing = trustScoreCache.get(userId);
  const events = existing ? [...existing.events, event] : [event];
  const score = calculateTrustScore(userId, events);
  const level = getTrustLevel(score);

  trustScoreCache.set(userId, {
    userId,
    score,
    level,
    events,
    lastUpdated: new Date(),
  });

  return score;
}

export function getTrustScore(userId: string): TrustScore {
  const existing = trustScoreCache.get(userId);
  if (existing) return existing;

  const defaultScore: TrustScore = {
    userId,
    score: TRUST_SCORE_DEFAULTS.NEW_USER,
    level: TrustLevel.NEW,
    events: [],
    lastUpdated: new Date(),
  };
  trustScoreCache.set(userId, defaultScore);
  return defaultScore;
}

export function recordCallCompleted(userId: string): number {
  const event: SafetyEvent = {
    id: `evt_${Date.now()}`,
    userId,
    type: "call_completed",
    value: TRUST_SCORE_EVENTS.CALL_COMPLETED,
    createdAt: new Date(),
  };
  return updateTrustScore(userId, event);
}

export function recordCallCancelled(userId: string): number {
  const event: SafetyEvent = {
    id: `evt_${Date.now()}`,
    userId,
    type: "call_cancelled",
    value: TRUST_SCORE_EVENTS.CALL_CANCELLED_EARLY,
    createdAt: new Date(),
  };
  return updateTrustScore(userId, event);
}

export function recordReportReceived(userId: string): number {
  const event: SafetyEvent = {
    id: `evt_${Date.now()}`,
    userId,
    type: "report_received",
    value: TRUST_SCORE_EVENTS.REPORT_RECEIVED,
    createdAt: new Date(),
  };
  return updateTrustScore(userId, event);
}

export function getTrustBadge(level: TrustLevel): { label: string; color: string; icon: string } {
  const badges: Record<TrustLevel, { label: string; color: string; icon: string }> = {
    [TrustLevel.NEW]: { label: "Nouveau", color: "#6F6A63", icon: "🌱" },
    [TrustLevel.TRUSTED]: { label: "Fiable", color: "#0F3D32", icon: "✓" },
    [TrustLevel.VERIFIED]: { label: "Vérifié", color: "#C76A2D", icon: "✓✓" },
    [TrustLevel.VIP]: { label: "VIP", color: "#FFD700", icon: "⭐" },
  };
  return badges[level];
}
