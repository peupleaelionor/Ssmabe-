# Roadmap — Songi Songi Mabé

> « La voix d'abord. Le contact après. »

Roadmap produit, de la landing bêta jusqu'à la plateforme vocale temps réel.

---

## Phase 1 — Landing + bêta ✅ (en cours)

- Landing page premium, mobile-first, identité africaine moderne.
- Hero orienté conversion : « Rencontre par la voix. Numéro protégé. »
- Sections : Concept, Comment ça marche, Modes, Congo first, Sécurité, Bêta.
- Formulaire bêta fonctionnel (stockage local, architecture Supabase-ready).
- Modules produit de base : `lib/mabe` (Country Brain, Language Brain, Voice
  Match, Safety Shield, Trust Score, Credit Engine, Beta).

## Phase 2 — Onboarding + compte utilisateur

- Onboarding multi-étapes (pays → langue → ambiance → 18+ → pseudo).
- Création de compte (Supabase Auth : OTP SMS / email).
- Profil utilisateur, Trust Score initial, wallet crédits.
- Persistance réelle des `BetaSignup` et profils en base.

## Phase 3 — Matching vocal simulé

- File d'attente d'appels (mock puis Redis).
- Écrans d'appel : waiting → live → end avec double consentement.
- Voice Match scoring : même pays, même langue, mode compatible, trust min.
- Création de `VoiceMatch` uniquement si double oui.

## Phase 4 — WebRTC / LiveKit / Agora

- Intégration de l'appel vocal anonyme réel.
- Relais média sécurisé, aucun numéro échangé.
- Enregistrement de modération (consentement requis), anti-abus temps réel.
- Mode Nuit avec sécurité renforcée.

## Phase 5 — Crédits + paiements

- Stripe pour la diaspora (France, Belgique, Canada).
- Mobile money pour l'Afrique (Airtel Money, Orange Money, M-Pesa, Wave, MTN).
- Packs Afrique & Diaspora, abonnement Premium mensuel.
- Transparence totale des coûts — aucun paiement caché.

## Phase 6 — RDC + Congo-Brazzaville + diaspora (lancement)

- Ouverture publique RDC et Congo-Brazzaville.
- Activation des diasporas FR / BE / CA via le Mode Diaspora.
- Country Brain par marché : langues, paiements, ton marketing, prix locaux.
- Croissance pilotée par le Growth Radar (pays actifs, langues, conversions).

---

## Principes non négociables (toutes phases)

- Numéro de téléphone **jamais** exposé.
- Double consentement obligatoire avant tout partage de contact.
- 18+ strict, anti-harcèlement, anti-arnaque.
- Aucun paiement caché.
- Voice-first : pas de swipe, pas de feed photo, pas de clone WhatsApp/Tinder.
