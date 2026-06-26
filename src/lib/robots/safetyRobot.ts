/**
 * safetyRobot — scan de sécurité texte / signalements.
 * --------------------------------------------------------------
 * S'appuie sur Safety Shield. Combine arnaque, harcèlement et
 * demande d'argent en un verdict unique et exploitable.
 */
import {
  detectScamRisk,
  detectHarassmentRisk,
  detectMoneyRequest,
  type ScamCategory,
} from "@/lib/safety-shield";
import type { RiskLevel } from "@/lib/types";

export interface SafetyVerdict {
  risk: RiskLevel;
  score: number; // 0-100 (100 = très risqué)
  scam: boolean;
  harassment: boolean;
  moneyRequest: boolean;
  categories: ScamCategory[];
  matched: string[];
  recommendation: "allow" | "throttle" | "review" | "block";
}

export function runSafetyRobot(text: string): SafetyVerdict {
  const scam = detectScamRisk(text);
  const harassment = detectHarassmentRisk(text);
  const money = detectMoneyRequest(text);

  let score = scam.score;
  if (harassment.detected) score = Math.min(100, score + 25);
  if (money.detected) score = Math.min(100, score + 15);

  const risk: RiskLevel =
    score >= 70 ? "critical" : score >= 45 ? "high" : score >= 20 ? "medium" : "low";

  const recommendation: SafetyVerdict["recommendation"] =
    risk === "critical" ? "block" : risk === "high" ? "review" : risk === "medium" ? "throttle" : "allow";

  return {
    risk,
    score,
    scam: scam.categories.length > 0,
    harassment: harassment.detected,
    moneyRequest: money.detected,
    categories: scam.categories,
    matched: Array.from(new Set([...scam.matched, ...money.matched])),
    recommendation,
  };
}

/** Scanne un lot de messages et renvoie ceux à modérer. */
export function scanBatch(messages: { id: string; text: string }[]): {
  flagged: { id: string; verdict: SafetyVerdict }[];
  safeCount: number;
} {
  const flagged: { id: string; verdict: SafetyVerdict }[] = [];
  let safeCount = 0;
  for (const m of messages) {
    const verdict = runSafetyRobot(m.text);
    if (verdict.recommendation === "allow") safeCount++;
    else flagged.push({ id: m.id, verdict });
  }
  return { flagged, safeCount };
}
