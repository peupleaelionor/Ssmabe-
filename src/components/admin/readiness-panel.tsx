"use client";

import * as React from "react";
import type { BetaSignup } from "@/lib/types";
import { AdminMetricCard } from "@/components/songi/AdminMetricCard";
import {
  runBetaQualityRobot,
  runGrowthRadarRobot,
  runAssetCheckRobot,
  runLaunchReadinessRobot,
  runComplianceRobot,
  REQUIRED_ASSETS,
  DEFAULT_COMPLIANCE,
} from "@/lib/robots";
import { runSafetyRobot } from "@/lib/robots/safetyRobot";
import { cn } from "@/lib/utils";

export interface ReadinessPanelProps {
  signups: BetaSignup[];
}

// Assets réellement livrés dans le repo (présents) → readiness fiable.
const PRESENT_ASSETS = REQUIRED_ASSETS.map((a) => a.path);

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="mt-6 mb-3 text-sm font-bold uppercase tracking-wide text-gris-texte">{children}</h3>
);

/**
 * Panneau « startup-ready » de l'admin : Launch / Assets / Growth /
 * Compliance / Beta Quality / Safety — entièrement piloté par les robots.
 */
export function ReadinessPanel({ signups }: ReadinessPanelProps) {
  const [sample, setSample] = React.useState("Envoie-moi ton numéro WhatsApp et une recharge PCS urgente");

  const beta = runBetaQualityRobot(signups);
  const growth = runGrowthRadarRobot(signups);
  const assets = runAssetCheckRobot(PRESENT_ASSETS);
  const compliance = runComplianceRobot(DEFAULT_COMPLIANCE);
  const launch = runLaunchReadinessRobot({
    betaForm: true,
    supabase: true, // branchable (fallback local sinon)
    build: true,
    assets: assets.ready,
    seo: true,
    security: compliance.compliant,
    analytics: false, // PostHog non encore branché
    admin: true,
  });
  const safety = runSafetyRobot(sample);

  return (
    <div className="space-y-2">
      {/* Launch readiness */}
      <SectionTitle>Launch readiness</SectionTitle>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <AdminMetricCard
          label="Score lancement"
          value={`${launch.score}/100`}
          tone={launch.level === "ready" ? "success" : launch.level === "almost" ? "warning" : "danger"}
          hint={launch.level === "ready" ? "Prêt 🚀" : launch.nextAction}
        />
        <AdminMetricCard label="Assets" value={`${assets.readinessScore}%`} tone={assets.ready ? "success" : "warning"} hint={`${assets.present}/${assets.total} présents`} />
        <AdminMetricCard label="Conformité" value={`${compliance.score}%`} tone={compliance.compliant ? "success" : "danger"} hint={compliance.compliant ? "OK" : `${compliance.violations.length} alertes`} />
        <AdminMetricCard label="Qualité bêta" value={`${beta.qualityScore}%`} tone={beta.qualityScore >= 70 ? "success" : "warning"} hint={`${beta.total} inscrits`} />
      </div>
      {launch.missing.length > 0 ? (
        <p className="mt-2 text-xs text-gris-texte">
          À traiter : <span className="text-cuivre">{launch.missing.join(" · ")}</span>
        </p>
      ) : null}

      {/* Beta quality */}
      <SectionTitle>Qualité des inscriptions</SectionTitle>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <AdminMetricCard label="Avec contact" value={beta.withContact} />
        <AdminMetricCard label="Sans contact" value={beta.withoutContact} hint="volontaire" />
        <AdminMetricCard label="Doublons pseudo" value={beta.duplicatePseudos.length} tone={beta.duplicatePseudos.length ? "warning" : "default"} />
        <AdminMetricCard label="Suspects" value={beta.suspiciousCount} tone={beta.suspiciousCount ? "danger" : "default"} />
      </div>

      {/* Growth radar */}
      <SectionTitle>Growth radar</SectionTitle>
      <div className="rounded-2xl border border-noir-border bg-noir-card p-5">
        <p className="text-sm text-blanc-chaud">
          Potentiel diaspora : <strong className="text-vert-light">{growth.diasporaPotential}</strong>{" "}
          ({Math.round(growth.diasporaShare * 100)}%)
        </p>
        <p className="mt-2 text-xs text-gris-texte">Canal recommandé : {growth.recommendedChannel}</p>
        <p className="mt-1 text-xs text-cuivre">Prochaine action : {growth.nextAction}</p>
        {growth.priorityCountries.length > 0 ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {growth.priorityCountries.map((c) => (
              <span key={c.code} className="rounded-full border border-noir-border px-2.5 py-1 text-xs text-blanc-chaud">
                {c.code} · {c.count}
              </span>
            ))}
          </div>
        ) : null}
      </div>

      {/* Compliance */}
      <SectionTitle>Conformité (règles non négociables)</SectionTitle>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {compliance.rules.map((r) => (
          <div key={r.key} className="flex items-center justify-between rounded-xl border border-noir-border bg-noir-card px-4 py-2.5">
            <span className="text-sm text-blanc-chaud">{r.label}</span>
            <span className={cn("text-xs font-bold", r.pass ? "text-success" : "text-danger")}>
              {r.pass ? "✓ OK" : "✗ À corriger"}
            </span>
          </div>
        ))}
      </div>

      {/* Safety robot — testeur live */}
      <SectionTitle>Safety robot (test live)</SectionTitle>
      <div className="rounded-2xl border border-noir-border bg-noir-card p-5">
        <textarea
          value={sample}
          onChange={(e) => setSample(e.target.value)}
          rows={2}
          className="w-full rounded-xl border border-noir-border bg-noir px-3 py-2 text-sm text-blanc-chaud focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vert-light"
        />
        <div className="mt-3 flex flex-wrap items-center gap-3 text-xs">
          <span className={cn(
            "rounded-full px-3 py-1 font-bold",
            safety.risk === "critical" ? "bg-danger/20 text-danger"
              : safety.risk === "high" ? "bg-cuivre/20 text-cuivre"
              : safety.risk === "medium" ? "bg-cuivre/10 text-cuivre"
              : "bg-success/20 text-success"
          )}>
            Risque {safety.risk} · {safety.score}/100
          </span>
          <span className="text-gris-texte">Reco : {safety.recommendation}</span>
          {safety.categories.length > 0 ? (
            <span className="text-gris-texte">Catégories : {safety.categories.join(", ")}</span>
          ) : null}
        </div>
      </div>
    </div>
  );
}
