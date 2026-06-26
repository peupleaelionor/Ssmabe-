/**
 * Mabé Internal Robots — façade
 * --------------------------------------------------------------
 * Mini-robots internes = fonctions d'analyse pures, réutilisables
 * dans l'admin dashboard. Aucun service externe, aucune autonomie.
 */
export { runBetaQualityRobot } from "./betaQualityRobot";
export type { BetaQualityReport } from "./betaQualityRobot";

export { runSafetyRobot, scanBatch } from "./safetyRobot";
export type { SafetyVerdict } from "./safetyRobot";

export { runGrowthRadarRobot } from "./growthRadarRobot";
export type { GrowthRadarReport } from "./growthRadarRobot";

export { runAssetCheckRobot, REQUIRED_ASSETS } from "./assetCheckRobot";
export type { AssetCheckReport, RequiredAsset } from "./assetCheckRobot";

export { runLaunchReadinessRobot } from "./launchReadinessRobot";
export type { LaunchSignals, LaunchReadinessReport } from "./launchReadinessRobot";

export { runComplianceRobot, DEFAULT_COMPLIANCE } from "./complianceRobot";
export type { ComplianceFlags, ComplianceRule, ComplianceReport } from "./complianceRobot";

import type { BetaSignup } from "@/lib/types";
import { runBetaQualityRobot } from "./betaQualityRobot";
import { runGrowthRadarRobot } from "./growthRadarRobot";
import { runAssetCheckRobot } from "./assetCheckRobot";
import { runLaunchReadinessRobot, type LaunchSignals } from "./launchReadinessRobot";
import { runComplianceRobot, DEFAULT_COMPLIANCE, type ComplianceFlags } from "./complianceRobot";

export interface RobotsDashboard {
  beta: ReturnType<typeof runBetaQualityRobot>;
  growth: ReturnType<typeof runGrowthRadarRobot>;
  assets: ReturnType<typeof runAssetCheckRobot>;
  launch: ReturnType<typeof runLaunchReadinessRobot>;
  compliance: ReturnType<typeof runComplianceRobot>;
}

/**
 * Exécute tous les robots d'un coup pour alimenter l'admin dashboard.
 */
export function runAllRobots(input: {
  signups: BetaSignup[];
  availableAssetPaths: string[];
  launchSignals: LaunchSignals;
  complianceFlags?: ComplianceFlags;
}): RobotsDashboard {
  return {
    beta: runBetaQualityRobot(input.signups),
    growth: runGrowthRadarRobot(input.signups),
    assets: runAssetCheckRobot(input.availableAssetPaths),
    launch: runLaunchReadinessRobot(input.launchSignals),
    compliance: runComplianceRobot(input.complianceFlags ?? DEFAULT_COMPLIANCE),
  };
}
