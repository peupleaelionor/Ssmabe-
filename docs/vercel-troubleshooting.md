# Vercel — dépannage du workflow GitHub → Preview → Production

## ✅ CAUSE RACINE IDENTIFIÉE (2026-07-03)

La **Production Branch du projet Vercel est `claude/songi-songi-mabe-mvp-7ljs3p`**
(la branche par défaut du repo au moment de la création du projet), **pas `main`**.
Preuve : le footer prod affichait `build eb2a5e5` = merge de la PR #8
(`main` → `claude/songi-songi-mabe-mvp-7ljs3p`), créée manuellement pour "pousser"
la prod.

**Corrections en place :**
1. **Workflow `.github/workflows/sync-prod-branch.yml`** : chaque push sur `main`
   est automatiquement propagé vers la branche de prod → plus jamais de PR
   manuelle type #8. La prod suit `main` toute seule.
2. **Fix définitif recommandé (1 min, dashboard)** : Vercel → Settings → Git →
   **Production Branch = `main`**. Le workflow devient alors superflu (inoffensif).
3. Optionnel mais conseillé : GitHub → Settings du repo → **Default branch = `main`**,
   puis supprimer l'ancienne branche une fois Vercel rebranché.

> Note : le sha affiché au footer est celui du commit **déployé** (branche de
> prod). Tant que Vercel construit l'ancienne branche, ce sha est le commit de
> synchro (≠ sha de `main`), mais le **contenu est identique** à `main`.

---

Symptôme : les améliorations mergées n'apparaissent pas sur **ssmabe.vercel.app**,
alors que l'URL de branche (`ssmabe-git-main-….vercel.app`) existe.

## Comment ça doit marcher
- **Chaque push de branche** → Vercel crée une **Preview Deployment** (URL unique).
- **Chaque merge dans la branche de production** (`main`) → déploiement **Production**
  sur `ssmabe.vercel.app`.
- Une preview ne passe **jamais** en prod tant que la branche n'est pas mergée.

## État côté repo (vérifié)
- ✅ Toutes les PR (#1→#5 + v2) sont mergées dans `main`.
- ✅ `main` build proprement (`tsc` 0 erreur, `next build` OK).
- ✅ Next patché en **15.5.19** (le blocage sécurité qui cassait le build Vercel est levé).
- ✅ `vercel.json` ajouté : framework Next.js, `npm ci --ignore-scripts`
  (évite le postinstall Prisma qui peut échouer sur le réseau CI).

## Checklist dashboard Vercel (à faire une fois, 5 minutes)
Sur https://vercel.com → projet **ssmabe** :

1. **Settings → Git**
   - « Connected Git Repository » = `peupleaelionor/Ssmabe-`
     ⚠️ S'il pointe sur `songi-songi-mab-voice` (l'ancien projet Lovable) ou un
     autre repo : **Disconnect** puis reconnecter le bon repo.
   - « Production Branch » = `main`
     ⚠️ Si c'est `claude/songi-songi-mabe-mvp-7ljs3p` (l'ancienne branche par
     défaut du repo) : remplacer par `main`.
2. **Settings → Environment Variables**
   - `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
     `SUPABASE_SERVICE_ROLE_KEY` (Sensitive) — pour Production **et** Preview.
   - Optionnel : `NEXT_PUBLIC_POSTHOG_KEY`.
   - Aucune autre variable n'est requise pour la bêta.
3. **Settings → Domains**
   - `ssmabe.vercel.app` doit être assigné à **Production** (pas à une preview figée).
4. **Deployments**
   - Ouvrir le dernier déploiement de `main` → s'il est en **Error**, lire le log.
   - Après correction : **⋯ → Redeploy** en décochant « Use existing Build Cache »
     (redeploy propre).
5. **Vérification finale**
   - `ssmabe.vercel.app` affiche le nouveau hero « Le réseau vivant de la parole
     africaine. » et le footer indique `build <sha>` correspondant au dernier
     commit de `main`.

## Diagnostic rapide des causes classiques
| Symptôme | Cause probable | Fix |
|---|---|---|
| Prod figée, previews OK | Production Branch ≠ `main` | Settings → Git → main |
| Rien ne se déploie | Repo déconnecté / mauvais repo | Reconnecter `peupleaelionor/Ssmabe-` |
| Build rouge | Ancien commit avec Next 15.3.3 | Redeploy depuis le HEAD de `main` |
| Vieille version servie | Cache/alias | Redeploy sans cache ; vérifier Domains |
| Install échoue | Postinstall Prisma | Couvert par `installCommand` dans `vercel.json` |

## Vérifier quel commit tourne en prod
Le footer du site affiche `build <sha>` (via `NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA`).
Comparer avec `git log -1 --format=%h origin/main`. S'ils diffèrent → la prod
n'est pas à jour → dérouler la checklist ci-dessus.
</content>
