# Mini-robots internes — Songi Songi Mabé

Les « robots » sont des **fonctions d'analyse pures** dans
[`src/lib/robots/`](../src/lib/robots). Pas des bots autonomes, pas de service
externe, pas d'effet de bord. Ils alimentent l'admin dashboard et la décision
produit. Façade : `@/lib/robots`.

## 1. betaQualityRobot
`runBetaQualityRobot(signups: BetaSignup[]) → BetaQualityReport`
Analyse la qualité des inscriptions : doublons de pseudo, répartition pays /
langues / intentions, contacts invalides, signaux suspects, `qualityScore` 0-100.

## 2. safetyRobot
`runSafetyRobot(text: string) → SafetyVerdict`
S'appuie sur Safety Shield. Combine arnaque + harcèlement + demande d'argent en
un verdict unique avec `risk`, `score`, `categories`, et `recommendation`
(`allow` / `throttle` / `review` / `block`). `scanBatch(messages)` pour un lot.

## 3. growthRadarRobot
`runGrowthRadarRobot(signups) → GrowthRadarReport`
Pays à prioriser, villes chaudes, langues qui montent, part diaspora,
canal d'acquisition recommandé, prochaine action.

## 4. assetCheckRobot
`runAssetCheckRobot(availablePaths: string[]) → AssetCheckReport`
Compare les assets présents à `REQUIRED_ASSETS`. Renvoie manquants (dont
critiques), `readinessScore`, `ready`. Pur (aucune lecture disque).

## 5. launchReadinessRobot
`runLaunchReadinessRobot(signals: LaunchSignals) → LaunchReadinessReport`
Agrège des signaux booléens pondérés (betaForm, build, security, supabase, seo,
admin, assets, analytics) en un `score` 0-100, un `level`
(`not_ready`/`almost`/`ready`) et la prochaine action prioritaire.

## 6. complianceRobot
`runComplianceRobot(flags: ComplianceFlags) → ComplianceReport`
Vérifie les règles non négociables : 18+, numéro jamais exposé, double
consentement, contact non forcé, service key server-only, pas de stockage
sensible client, marketing honnête. `DEFAULT_COMPLIANCE` = état vérifié du repo.

## Façade & usage groupé
```ts
import { runAllRobots } from "@/lib/robots";

const dashboard = runAllRobots({
  signups,                 // BetaSignup[]
  availableAssetPaths,     // string[]
  launchSignals,           // LaunchSignals
  // complianceFlags?      // défaut: DEFAULT_COMPLIANCE
});
// → { beta, growth, assets, launch, compliance }
```

Utilisé dans l'admin via le composant
[`ReadinessPanel`](../src/components/admin/readiness-panel.tsx) (onglet
**Readiness**).

## Principes
- **Pur & déterministe** : mêmes entrées → mêmes sorties, testable.
- **Sans I/O** : les données (signups, assets) sont injectées par l'appelant.
- **Privacy-safe** : ne loguent jamais de contact ni de numéro.
- Évolutifs : brancher Supabase/PostHog en amont sans changer les signatures.
</content>
