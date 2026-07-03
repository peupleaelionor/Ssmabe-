# Vercel — déploiement (référence rapide)

Détails/dépannage : voir `docs/vercel-troubleshooting.md` (cause racine résolue).

- **Production Branch** : `main` (à confirmer dans Settings → Git ;
  en attendant, `.github/workflows/sync-prod-branch.yml` synchronise
  automatiquement l'ancienne branche de prod à chaque push sur main)
- **Preview** : chaque push de branche = URL de preview
- **Redeploy propre** : Deployments → ⋯ → Redeploy sans cache
- **Env vars** (Production + Preview) : NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY (Sensitive),
  NEXT_PUBLIC_POSTHOG_KEY (optionnel)
- **Contrôle** : footer affiche `build <sha>` = commit déployé
