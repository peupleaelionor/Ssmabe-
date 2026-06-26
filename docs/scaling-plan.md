# Scaling plan — 1k / 10k / 100k

Plan de montée en charge de Songi Songi Mabé. Chaque palier est livrable sans
casser le précédent. Priorité : **voice-first, privacy-first**.

## 🎯 1 000 utilisateurs — Bêta publique (état actuel)
Objectif : **collecter les premiers utilisateurs**, valider la promesse.

- ✅ Landing premium + formulaire bêta
- ✅ `/api/beta` + fallback localStorage
- ✅ Supabase `beta_signups` (RLS, service-role server-only)
- ✅ Admin mock + onglet Readiness (robots)
- ✅ SEO / OG / manifest / favicon
- ⬜ Analytics basique (PostHog events — voir `integrations.md`)
- ⬜ Domaine custom + Vercel prod

**Stack** : Next.js (Vercel) + Supabase. Pas de temps réel, pas de paiement.

## 📈 10 000 utilisateurs — Produit actif
Objectif : appels réels limités, comptes, modération.

- Supabase : **index** sur `beta_signups(country, created_at)`, tables
  `profiles`, `reports`, `blocks` + RLS stricte
- **Auth OTP** (Supabase Auth SMS/email) + profils persistés
- **Rate limiting** sur `/api/*` (Upstash Redis ou Vercel KV)
- **Observabilité** : Sentry (erreurs), PostHog (funnels)
- **File d'attente** matching en Redis (remplace le mock Voice Match)
- **Moderation queue** alimentée par `safetyRobot` (review/throttle/block)
- Email transactionnel (Resend) : confirmation bêta, alertes admin

## 🚀 100 000 utilisateurs — Plateforme
Objectif : appels vocaux temps réel à l'échelle, multi-région.

- **WebRTC réel** via LiveKit ou Agora derrière `lib/mabe/voiceMatch.ts`
  (le relais média ne doit jamais exposer de numéro)
- **Redis queue + workers** dédiés au matching et à la présence temps réel
- **Presence / signaling** temps réel (Supabase Realtime ou service dédié)
- **Fraud scoring** continu (extension `calculateSafetyScore` + signaux serveur)
- **Crédits payants** : Stripe (diaspora) + mobile money (Afrique) via
  `creditEngine` (M-Pesa, Airtel, Orange, Wave, MTN, Flutterwave, Paystack)
- **Multi-région** : edge + DB répliquée, rollout **pays par pays**
- **Compliance** : RGPD/UE, conservation minimale, droit à l'oubli, journaux d'audit

## Invariants à toutes les échelles
- Aucun numéro exposé ; double consentement ; 18+.
- `lib/mabe` reste la **façade stable** : on remplace l'implémentation derrière,
  jamais la signature publique.
- Le mock reste un fallback : dégradation gracieuse si un service tombe.
</content>
