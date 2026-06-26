# Songi Songi Mabé 🎙

> **La voix d'abord. Le contact après.**

Songi Songi Mabé est le **téléchat vocal né au Congo**. L'utilisateur choisit son pays, sa langue et son ambiance, puis trouve une voix : un appel vocal **anonyme**, **numéro protégé**. Le contact ne s'ouvre que si **les deux personnes acceptent** (double consentement).

Ce n'est ni un clone WhatsApp, ni un clone Tinder, ni une messagerie classique : c'est une expérience **voice-first** et **privacy-first**, pensée pour le Congo, la diaspora, et ouverte au monde.

## Démo rapide

```
Onboarding → Choisis ton pays, langue, ambiance
    ↓
Accueil → Lance la recherche d'une voix
    ↓
Attente → Matching intelligent (3-10 secondes)
    ↓
Appel Live → Voix anonyme, numéro invisible, timer
    ↓
Fin d'appel → Double consentement pour continuer
```

## Tech Stack

- **Framework** : Next.js 15 avec App Router
- **Language** : TypeScript
- **UI** : Tailwind CSS v3 + shadcn/ui (components manuels)
- **Animations** : Framer Motion
- **State** : Zustand
- **Base de données** : Prisma + PostgreSQL
- **Auth** : NextAuth.js (à connecter)
- **Voice** : LiveKit / Agora (mocked pour le MVP)

## Installation

### Prérequis
- Node.js 18+
- PostgreSQL 14+
- pnpm ou npm

### Étapes

```bash
# 1. Cloner le repo
git clone https://github.com/your-org/songi-songi-mabe.git
cd songi-songi-mabe

# 2. Installer les dépendances
npm install

# 3. Variables d'environnement
cp .env.example .env.local
# Édite .env.local avec tes valeurs

# 4. Base de données
npm run db:generate
npm run db:push

# 5. Lancer en développement
npm run dev
```

L'app sera disponible sur `http://localhost:3000`

## Variables d'environnement

Pour la **bêta**, seules les 3 variables Supabase sont requises (le formulaire
fonctionne même sans, grâce au fallback `localStorage`) :

```env
# Supabase — collecte bêta (requis en prod)
NEXT_PUBLIC_SUPABASE_URL=""          # URL projet Supabase (client + serveur)
NEXT_PUBLIC_SUPABASE_ANON_KEY=""     # clé publique anon (RLS appliqué)
SUPABASE_SERVICE_ROLE_KEY=""         # ⚠️ SERVEUR UNIQUEMENT — jamais NEXT_PUBLIC
```

> **Sécurité** : `SUPABASE_SERVICE_ROLE_KEY` n'a pas le préfixe `NEXT_PUBLIC_`,
> donc Next.js ne l'inline jamais côté navigateur. Elle n'est utilisée que dans
> la route serveur `/api/beta`.

Variables des phases ultérieures (non requises pour la bêta) :

```env
DATABASE_URL="postgresql://user:password@localhost:5432/songi_songi_mabe"
NEXTAUTH_SECRET="your-secret-here"
NEXTAUTH_URL="http://localhost:3000"
REDIS_URL="redis://localhost:6379"
AGORA_APP_ID=""
LIVEKIT_URL=""
LIVEKIT_API_KEY=""
LIVEKIT_API_SECRET=""
STRIPE_SECRET_KEY=""
STRIPE_PUBLISHABLE_KEY=""
```

## Deploy on Vercel

Déploiement bêta (landing + formulaire) en 5 étapes :

1. **Supabase** : créer un projet, exécuter [`supabase/beta-schema.sql`](./supabase/beta-schema.sql)
   dans le SQL Editor (crée `beta_signups`, index, RLS).
2. **Importer** `peupleaelionor/Ssmabe-` sur [vercel.com](https://vercel.com)
   (framework Next.js auto-détecté).
3. **Env vars** : ajouter les 3 variables Supabase (Production + Preview) ;
   marquer `SUPABASE_SERVICE_ROLE_KEY` comme *Sensitive*.
4. **Deploy**, puis définir `main` comme **Production Branch**.
5. **Tester** le formulaire bêta (avec et sans contact) → vérifier la ligne dans
   Supabase (Table Editor → `beta_signups`).

Procédure détaillée : [`docs/deployment.md`](./docs/deployment.md).
Checklist : [`docs/production-checklist.md`](./docs/production-checklist.md).

## Structure du projet

```
src/
├── app/
│   ├── (marketing)/     # Landing page
│   └── (app)/           # App authentifiée
│       ├── onboarding/  # Onboarding 5 étapes
│       ├── home/        # Accueil + recherche
│       ├── call/        # Flux d'appel
│       │   ├── waiting/ # Attente matching
│       │   ├── live/    # Appel en cours
│       │   └── end/     # Fin + consentement
│       ├── wallet/      # Crédits et achats
│       ├── safety/      # Sécurité et règles
│       └── admin/       # Dashboard admin
├── components/
│   ├── ui/              # Composants base (shadcn-style)
│   ├── layout/          # Header, BottomNav
│   ├── marketing/       # Sections landing
│   ├── voice/           # VoiceWave, Timer, Filters
│   ├── country/         # CountrySelector, ModeSelector
│   ├── safety/          # ReportModal, BlockModal
│   ├── wallet/          # CreditBalance, CreditPacks
│   └── admin/           # StatsCard, DataTable
└── lib/
    ├── mabe/            # ★ Mabé Experience Engine (façade unique)
    │   ├── countryBrain.ts
    │   ├── languageBrain.ts
    │   ├── voiceMatch.ts
    │   ├── safetyShield.ts
    │   ├── trustScore.ts
    │   ├── creditEngine.ts
    │   └── beta.ts      # Inscription bêta (local → Supabase-ready)
    ├── country-brain/   # Logique pays (12 pays)
    ├── language-brain/  # Logique langues (8 langues)
    ├── voice-match/     # Algorithme de matching
    ├── trust-score/     # Score de confiance 0-100
    ├── safety-shield/   # Reports, blocks, scam detection
    ├── credit-engine/   # Wallets et crédits
    ├── diaspora-bridge/ # Mode diaspora
    ├── growth-radar/    # Analytics admin
    ├── constants/       # Modes, config
    ├── types/           # TypeScript types
    ├── utils/           # cn(), formatDuration()...
    └── store/           # Zustand global store
```

> **Mabé Experience Engine** : tout le produit consomme les modules via
> `@/lib/mabe`. Les modules internes (`country-brain`, `safety-shield`…) restent
> l'implémentation ; `lib/mabe` est la façade stable et le point d'extension.

## 7 Modes d'Ambiance

| Mode | Icon | Gratuit | Description |
|------|------|---------|-------------|
| Mboka | 🏙️ | Oui | Amour local, même ville |
| Lingala | 🎵 | Oui | Musique et culture lingala |
| Sérieux | 💍 | Non | Rencontre durable et intentionnelle |
| Diaspora | ✈️ | Non | Pont patrie-diaspora |
| Monde | 🌍 | Non | Ouvert à tous |
| Nuit | 🌙 | Non | 21h-5h, voix nocturnes |
| Respect | 🕊️ | Non | Slow, voix posées |

## 12 Pays Supportés

| Pays | Code | Paiements | Diaspora |
|------|------|-----------|----------|
| 🇨🇩 RDC | CD | M-Pesa, Airtel, Orange | Non |
| 🇨🇬 Congo-Brazza | CG | Airtel, MTN, Orange | Non |
| 🇫🇷 France | FR | Stripe, PayPal | Oui |
| 🇧🇪 Belgique | BE | Stripe, PayPal | Oui |
| 🇨🇦 Canada | CA | Stripe, Interac | Oui |
| 🇨🇮 Côte d'Ivoire | CI | Orange, MTN, Wave | Non |
| 🇨🇲 Cameroun | CM | MTN, Orange | Non |
| 🇸🇳 Sénégal | SN | Orange, Wave | Non |
| 🇲🇦 Maroc | MA | Flutterwave, Stripe | Non |
| 🇩🇿 Algérie | DZ | Flutterwave, Stripe | Non |
| 🇳🇬 Nigeria | NG | Flutterwave, Paystack | Non |
| 🇰🇪 Kenya | KE | M-Pesa, Flutterwave | Non |

> 8 langues supportées : français, lingala, swahili, kikongo, tshiluba, anglais,
> portugais, arabe (RTL).

## Scripts disponibles

```bash
npm run dev       # Développement
npm run build     # Build production
npm run start     # Serveur production
npm run lint      # Lint ESLint
npm run db:push   # Push schema Prisma
npm run db:generate # Générer client Prisma
npm run db:studio # Ouvrir Prisma Studio
```

## Palettes de couleurs

| Nom | Hex | Usage |
|-----|-----|-------|
| Noir profond | `#0B0B0B` | Background principal |
| Vert Congo | `#0F3D32` | Primary, CTAs |
| Cuivre | `#C76A2D` | Accent, highlights |
| Crème | `#F8F3EA` | Text secondaire |
| Blanc chaud | `#FFFDF8` | Text principal |
| Gris texte | `#6F6A63` | Subtitles, labels |

## Prochaines étapes

- **Supabase** : remplacer `persistSignup()` dans `lib/mabe/beta.ts` par un
  insert Supabase (`beta_signups`), brancher Supabase Auth (OTP SMS / email) et
  persister profils, sessions d'appel et signalements.
- **Voice (WebRTC / LiveKit / Agora)** : brancher l'appel vocal anonyme réel
  derrière `lib/mabe/voiceMatch.ts` ; le relais média ne doit jamais exposer de
  numéro.
- **Payments** : Stripe pour la diaspora, mobile money (Airtel / Orange /
  M-Pesa / Wave / MTN) pour l'Afrique, via `lib/mabe/creditEngine.ts`.
- **Redis** : file d'attente d'appels temps réel pour le matching.

Voir la [roadmap détaillée](./docs/roadmap.md) (Phases 1 → 6).

## Documentation

- [Product Vision](./docs/product.md)
- [Architecture](./docs/architecture.md)
- [Country Brain](./docs/country-brain.md)
- [Safety Shield](./docs/safety.md)
- [Roadmap](./docs/roadmap.md)
- [Supabase](./docs/supabase.md)
- [Déploiement (Vercel)](./docs/deployment.md)
- [Production checklist](./docs/production-checklist.md)
- [Brand assets](./docs/brand-assets.md)

## Équipe

Produit fait avec passion pour le Congo et sa diaspora.

> *"Aucun numéro de téléphone ne quitte nos serveurs. C'est une promesse technique, pas un simple slogan."*

---

© 2025 Songi Songi Mabé · Né au Congo. Pensé pour la diaspora. Ouvert au monde. 🌍
