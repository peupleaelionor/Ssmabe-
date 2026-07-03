# Intégrations outils — Songi Songi Mabé

Préparation des branchements externes. Rien n'est chargé par défaut (privacy).
À activer explicitement, palier par palier (voir `scaling-plan.md`).

## Supabase
- **Phase 1** : `beta_signups` (voir `supabase/beta-schema.sql`, `docs/supabase.md`).
- **Phase 2** : `profiles`, `reports`, `blocks`, `call_sessions` (schémas dans `docs/supabase.md`).
- Écriture bêta via `/api/beta` (service-role server-only). RLS partout.

## Vercel
- Variables : `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
  `SUPABASE_SERVICE_ROLE_KEY` (Sensitive).
- `main` = Production Branch. Détails : `docs/deployment.md`.

## PostHog (analytics produit) — ✅ couche implémentée

La couche `src/lib/analytics/` est **déjà branchée** sur le funnel. Elle est
**provider-agnostique** et **no-op tant qu'aucune clé n'est configurée** (aucune
dépendance ajoutée). Les events sont **anonymes** : pseudo, contact, numéro sont
filtrés automatiquement avant envoi (`FORBIDDEN_PROP_KEYS`).

Events câblés :

| Event | Quand | Où |
|---|---|---|
| `beta_form_viewed` | section bêta affichée | `marketing/beta-form.tsx` |
| `beta_signup_submitted` | inscription réussie | beta forms (props : country, language, intention, has_contact) |
| `country_selected` | choix pays | `/demo` |
| `mode_selected` | choix mode | `/demo` |
| `demo_started` | démo ouverte | `/demo` |
| `demo_completed` | démo terminée | `/demo` |

### Activation (plus tard, sans toucher au code)
1. Ajouter `NEXT_PUBLIC_POSTHOG_KEY` (+ `NEXT_PUBLIC_POSTHOG_HOST`) dans Vercel.
2. Charger le snippet PostHog (ou le SDK) pour exposer `window.posthog`.
3. `track()` détecte `window.posthog` et envoie automatiquement. Sinon, no-op.

> Alternative tests/Segment : `setAnalyticsSink((event, props) => …)`.

## Sentry (erreurs)
- Erreurs API (`/api/beta`), erreurs formulaire, erreurs Supabase.
- Scrubbing : retirer `contact` et tout champ sensible des breadcrumbs.

## Resend (email — plus tard)
- Confirmation d'inscription bêta (si contact email fourni, opt-in).
- Notification admin sur nouveaux signups / signalements critiques.

## GitHub
- Templates PR + issues dans `.github/` (livrés).
- CI future : `tsc --noEmit` + `next build` sur PR (workflow à ajouter).

## Mapping robots → outils
- `growthRadarRobot` ← données PostHog + Supabase (acquisition).
- `safetyRobot` → alimente la moderation queue (Sentry alerte sur critical).
- `launchReadinessRobot` → checklist de go/no-go avant déploiement.
</content>
