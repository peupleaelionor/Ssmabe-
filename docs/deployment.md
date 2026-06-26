# Déploiement — Songi Songi Mabé

Procédure pour publier l'app (landing + formulaire bêta) sur **Vercel**, avec
**Supabase** comme backend de collecte bêta. Objectif : **état publiable, sécurisé,
formulaire bêta fonctionnel** — sans WebRTC ni paiements (phases ultérieures).

---

## 1. Variables d'environnement

Seules ces 3 variables sont requises pour la bêta :

| Variable | Côté | Obligatoire | Rôle |
|---|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | client + serveur | pour Supabase | URL du projet Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | client + serveur | pour Supabase | Clé publique (RLS appliqué) |
| `SUPABASE_SERVICE_ROLE_KEY` | **serveur uniquement** | recommandé | Insert serveur via `/api/beta`, contourne RLS |

> Les autres variables de `.env.example` (`DATABASE_URL`, `REDIS_URL`,
> `AGORA_*`, `LIVEKIT_*`, `STRIPE_*`) ne sont **pas nécessaires** pour la bêta.

### Sécurité de la service role key
- `SUPABASE_SERVICE_ROLE_KEY` **n'a pas** le préfixe `NEXT_PUBLIC_` → Next.js ne
  l'inline **jamais** dans le bundle navigateur. Elle reste côté serveur.
- Elle n'est lue que dans `src/lib/supabase/client.ts` et utilisée uniquement par
  `supabaseServerInsert()` / `supabaseServerSelect()`, eux-mêmes appelés
  **seulement** depuis la route serveur `src/app/api/beta/route.ts`.
- Aucun composant `"use client"` n'importe ces fonctions.

---

## 2. Supabase

1. Créer un projet sur [supabase.com](https://supabase.com).
2. **SQL Editor** → coller le contenu de [`supabase/beta-schema.sql`](../supabase/beta-schema.sql) → **Run**.
3. **Project Settings → API** → copier :
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` (secret) → `SUPABASE_SERVICE_ROLE_KEY`

Le schéma `beta_signups` crée la table, deux index analytics, et active la RLS
avec une policy `service_role` (écriture réservée au serveur).

> **Choix volontaire : `contact` est nullable.** Le contact (email / WhatsApp)
> est **optionnel** dans le formulaire — on ne force jamais un identifiant pour
> rejoindre la bêta (cohérent avec la promesse privacy-first). Voir
> [`docs/supabase.md`](./supabase.md).

---

## 3. Vercel

1. [vercel.com](https://vercel.com) → **Add New → Project** → importer
   `peupleaelionor/Ssmabe-`.
2. Framework détecté automatiquement : **Next.js** (build `next build`, aucune
   config supplémentaire).
3. **Settings → Environment Variables** → ajouter les 3 variables Supabase, en
   cochant **Production** et **Preview**. Marquer `SUPABASE_SERVICE_ROLE_KEY`
   comme *Sensitive*.
4. **Deploy**.
5. **Settings → Git** → définir `main` comme **Production Branch** : chaque merge
   sur `main` déclenche un déploiement de production.

---

## 4. Test de production

1. Ouvrir l'URL de production Vercel.
2. Aller à la section **Bêta**, remplir le formulaire :
   - **avec** contact → vérifier la ligne dans Supabase (Table Editor → `beta_signups`).
   - **sans** contact → l'inscription doit réussir, `contact` = `null`.
3. Vérifier le message de succès : *« Inscription reçue. Mabé te préviendra quand
   la bêta ouvre. »*
4. **Fallback** : si Supabase n'est pas configuré (variables absentes), le
   formulaire réussit quand même (stockage `localStorage`, `local: true`).

---

## 5. Commandes de vérification locale

```bash
npm install --ignore-scripts   # évite le postinstall Prisma derrière proxy
cp .env.example .env.local      # remplir les 3 variables Supabase (optionnel)
npx tsc --noEmit                # 0 erreur attendu
npm run build                   # build production, 0 erreur attendu
npm run dev                     # http://localhost:3000
```

---

## 6. Périmètre de la bêta

✅ Inclus : landing premium, formulaire bêta (Supabase + fallback), pages démo,
dashboard admin (mock), 12 pays, Safety Shield, Voice Match mock, Credit Engine mock.

⛔ **Hors périmètre** (phases suivantes, ne pas activer pour la bêta) : appels
vocaux WebRTC/LiveKit/Agora réels, paiements Stripe / mobile money, auth OTP.
Priorité bêta : **collecter les premiers utilisateurs**.
</content>
