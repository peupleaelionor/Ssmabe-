# Songi Songi Mabé — Audit repo (Phase A) & plan P0/P1/P2

État au moment de l'audit : build ✅, lint 0 ✅, tests 15/15 ✅, PWA offline,
Supabase branché (projet `songi-songi-mabe`), marque `ssm`, site public.

## EXISTANT (réel)
- **Landing marketing** `(marketing)` complète : Hero, Vibes/Ambiances, Communautés
  (carrousel), Cercles (appartenance locale), Choix de présence (avatars),
  Pricing (€/USD/FCFA), pages légales, blog, contact, diaspora, créateurs, lite.
- **API réelles** : `/api/waitlist` (+ `/count` réel), `/api/contact` (Supabase +
  fallback local), `/api/health`, `/api/feature-flags`, `/api/livekit|agora/token`,
  `/api/voice/config`. Rate-limit + honeypot + validation Zod-like.
- **Intégrations câblées** : Supabase (tables + RLS + RPC count), Resend (email
  bienvenue), Sentry (erreurs serveur), LiveKit/Agora (tokens, flag OFF).
- **Façade métier `lib/mabe`** : façades minces sur les modules kebab canoniques
  (`country-brain`, `language-brain`, `voice-match`, `safety-shield`,
  `trust-score`, `credit-engine`). Archi conforme au point 51.
- **i18n** : `content/{fr,en,ln}` avec `getContent(locale)`, fallback fr.

## À CONSERVER
- Design system (tokens, premium-layer, `premium-card`), marque `ssm`.
- Couche PWA (SW offline, install prompt), resource hints, content-visibility.
- Façade `mabe` + modules kebab (canoniques).
- Feature flags par env (`NEXT_PUBLIC_FLAG_*`), dégradation gracieuse partout.

## À REFACTORISER (P1)
- `getContent("fr")` est **hardcodé** dans ~tous les composants → aucun switch de
  locale réel. Introduire un provider de locale (point 11) : fr/ln/sw/kg/lua/en.
- `(app)/*` (home, call, wallet, onboarding, demo, admin) = écrans d'app en grande
  partie **mockés** (Math.random pour simuler le consentement). À isoler derrière
  flags et ne jamais présenter comme réels en prod (point 55). `/admin` protégé
  par booléen client → à sécuriser (point 41).
- API `/communities`, `/events` = données mockées (labellisées) → brancher DB.

## À SUPPRIMER (fait / à faire)
- ✅ `BrandLogo` déprécié, anciens favicons bulles.
- À faire : `(app)/demo` en prod (garder dev-only), doublons de copy obsolète
  « application de rencontre » (repositionnement point 1 : réseau social vocal).

## À AJOUTER (nouveau Songi)
- Salons vocaux (point 4B/5), chat privé (point 7), double consentement réel
  (point 6), présence (point 25), navigation 5 onglets (point 9), mode
  économie de données (point 13), i18n runtime (point 11).

## PLAN

### P0 — intégrité & fondation (en cours)
1. ✅ **Faux compteur waitlist (1284)** → chiffre réel via `waitlist_count()` RPC
   + copy honnête (point 55).
2. Repositionnement copy : retirer « application de rencontre » comme promesse
   principale → « réseau social vocal » (point 1). *(léger, contenu)*
3. `(app)/demo` + simulations Math.random : garantir dev-only / flaggé en prod.
4. `/admin` : garde serveur réelle au lieu d'un booléen client.

### P1 — cœur produit
- i18n runtime (locale provider) ; brancher `/communities` `/events` sur Supabase ;
  onboarding court (point 10) ; profils minimalistes + intro vocale (point 20).

### P2 — briques temps réel
- Salons, chat privé temps réel, présence, matching relaxation progressive,
  appels audio LiveKit branchés (après clefs + tests device).

## RÈGLE
Chaque feature : « aide-t-elle à commencer / avoir / poursuivre une vraie
conversation ? » (point 65). Sinon, pas prioritaire. Rien de mocké présenté
comme réel (point 55). Laisser le repo meilleur à chaque étape.
