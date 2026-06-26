# Songi Songi Mabé 🎙

> **La voix qui connecte. Le numéro qui reste caché.**

Songi Songi Mabé ("Belle Rencontre Vocale" en lingala) est une plateforme de rencontre anonyme par la voix, née au Congo. Parle, écoute, connecte — sans jamais partager ton numéro de téléphone.

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
    ├── country-brain/   # Logique pays (8 pays)
    ├── language-brain/  # Logique langues (7 langues)
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

## 8 Pays Supportés

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

## Documentation

- [Product Vision](./docs/product.md)
- [Architecture](./docs/architecture.md)
- [Country Brain](./docs/country-brain.md)
- [Safety Shield](./docs/safety.md)
- [Roadmap](./docs/roadmap.md)

## Équipe

Produit fait avec passion pour le Congo et sa diaspora.

> *"Aucun numéro de téléphone ne quitte nos serveurs. C'est une promesse technique, pas un simple slogan."*

---

© 2025 Songi Songi Mabé · Né au Congo · Pour le Monde 🌍
