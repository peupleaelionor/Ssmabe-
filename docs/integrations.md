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

## PostHog (analytics produit)
Events proposés (anonymes, orientés produit) :

| Event | Quand |
|---|---|
| `beta_form_viewed` | section bêta visible |
| `beta_signup_submitted` | inscription envoyée |
| `country_selected` | choix pays |
| `mode_selected` | choix mode |
| `demo_started` | démo lancée (`/demo`) |
| `demo_completed` | démo terminée |

> Ne jamais envoyer pseudo + contact dans les propriétés d'event. Identifiants
> anonymisés uniquement.

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
