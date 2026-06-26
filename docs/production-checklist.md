# Production checklist — Songi Songi Mabé (bêta publique)

État au merge de la phase MVP bêta. ✅ = vérifié, ⬜ = à faire par l'opérateur.

## Build & types
- ✅ `npx tsc --noEmit` → 0 erreur (strict mode)
- ✅ `npm run build` (`next build`) → 0 erreur, 14 routes générées
- ✅ Aucune dépendance manquante (build sans `@supabase/supabase-js`, client fetch natif)

## Sécurité & privacy
- ✅ **Aucun numéro de téléphone exposé** — `MockCandidate` / `MatchResult` ne
  portent aucun champ téléphone ; `User.phone` stocké mais jamais lu/rendu côté UI
- ✅ **Double consentement** — `userAConsent` / `userBConsent` à `PENDING` par défaut
- ✅ **18+ obligatoire** — `canMatchUsers()` rejette tout candidat mineur
- ✅ **Service role key server-only** — `SUPABASE_SERVICE_ROLE_KEY` sans préfixe
  `NEXT_PUBLIC_`, jamais inlinée dans le bundle navigateur ; importée uniquement
  par la route serveur `/api/beta`
- ✅ **Contact bêta jamais logué** — la route ne logue que des messages d'erreur tronqués

## Formulaire bêta
- ✅ `contact` **nullable** en base (`supabase/beta-schema.sql`) — choix volontaire
- ✅ Formulaire accepte l'**absence de contact** (validation : seuls pseudo, pays,
  langue, intention sont obligatoires — `beta-form.tsx:32`)
- ✅ `POST /api/beta` : validation serveur + insert Supabase si configuré
- ✅ **Fallback localStorage** automatique si Supabase non configuré ou erreur réseau
- ✅ Message de succès affiché après inscription

## Documentation
- ✅ `README.md` — section « Deploy on Vercel » + variables Supabase
- ✅ `docs/deployment.md` — procédure Vercel + Supabase + test prod
- ✅ `docs/supabase.md` — schéma aligné sur le repo, note `contact` nullable volontaire
- ✅ `docs/brand-assets.md` — système d'assets de marque (analyse des planches)
- ✅ `docs/production-checklist.md` — ce fichier
- ✅ `.env.example` — 3 variables Supabase documentées

## À faire par l'opérateur (hors code)
- ⬜ Créer le projet Supabase + exécuter `supabase/beta-schema.sql`
- ⬜ Renseigner les 3 variables dans Vercel (Production + Preview)
- ⬜ Définir `main` comme Production Branch sur Vercel
- ⬜ Tester le formulaire bêta en prod (avec et sans contact)
- ⬜ Brancher le domaine custom (optionnel)

## Hors périmètre bêta (ne pas activer)
- ⛔ Appels vocaux réels (WebRTC / LiveKit / Agora)
- ⛔ Paiements (Stripe / mobile money)
- ⛔ Auth OTP / profils persistés
</content>
