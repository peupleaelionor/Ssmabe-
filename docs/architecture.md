# Songi Songi Mabé – Architecture Technique

> Dernière mise à jour : 2026-06-26 — 12 pays, Supabase bêta intégré, page démo

## Stack

| Layer | Technologie | Justification |
|-------|-------------|---------------|
| Frontend | Next.js 15 + App Router | SSR/SSG, performance, DX |
| Styles | Tailwind CSS v3 | Utility-first, cohérence |
| UI | shadcn/ui + Framer Motion | Components de qualité |
| State | Zustand | Simple, performant |
| Base de données | PostgreSQL via Prisma | Relations, fiabilité |
| Cache | Redis | Sessions, queues temps réel |
| Voice | LiveKit / Agora (à intégrer) | WebRTC scalable |
| Auth | NextAuth.js (à intégrer) | Standard, flexible |
| Paiement | Stripe + intégrations locales | Multi-devise |

## Architecture Modules (Mabé Experience Engine)

```
┌─────────────────────────────────────────────────┐
│              Mabé Experience Engine             │
├─────────────────┬───────────────────────────────┤
│  Country Brain  │  Language Brain               │
│  - Pays & rules │  - Langues & traductions      │
│  - Paiements    │  - Labels locaux              │
├─────────────────┼───────────────────────────────┤
│  Voice Match    │  Safety Shield                │
│  - Algorithme   │  - Reports                    │
│  - Score match  │  - Blocks                     │
│  - Wait time    │  - Scam detection             │
├─────────────────┼───────────────────────────────┤
│  Credit Engine  │  Trust Score                  │
│  - Packs        │  - Score 0-100                │
│  - Déduction    │  - Niveaux (new/trusted/VIP)  │
│  - Free calls   │  - Événements                 │
├─────────────────┼───────────────────────────────┤
│  Diaspora Bridge│  Growth Radar                 │
│  - Connexions   │  - Analytics                  │
│  - Patrie link  │  - Admin dashboard            │
└─────────────────┴───────────────────────────────┘
```

## Flux de données d'un appel

```
User A                    Server                    User B
  │                          │                          │
  │ → findVoiceMatch()       │                          │
  │                          │ ← scanQueue()            │
  │                          │ → createSession()        │
  │ ← sessionId              │           sessionId →    │
  │                          │                          │
  │ → joinChannel(sessionId) │                          │
  │                          │      joinChannel() ←     │
  │                          │                          │
  │ ←──── WebRTC P2P ──────────────────────────────→    │
  │                          │                          │
  │ → endCall()              │                          │
  │ → setConsent(YES)        │                          │
  │                          │ consentA = YES           │
  │                          │      setConsent(?) ←     │
  │                          │ consentB = YES           │
  │ ← "Double oui"           │         "Double oui" →   │
```

## Sécurité du numéro

Le numéro de téléphone n'est JAMAIS partagé :

1. **Authentification** : Phone number → SMS OTP → Cookie JWT (serveur)
2. **Identité caller** : Uniquement `sessionId` généré côté serveur
3. **WebRTC** : Canal créé par serveur, pas de SDP direct entre pairs
4. **Fin d'appel** : Channel détruit immédiatement, logs anonymisés
5. **Base de données** : Numéro hashé (bcrypt) en base, jamais en clair

## Modèle de queue (matching)

```
User joins queue → CallQueue record created
Server scans queue every 500ms:
  - Find candidates with matching country + language + mode
  - Apply mode-specific rules (city, trust, age...)
  - Score candidates (country match, language, trust, wait time)
  - Select best match
  - Create CallSession
  - Notify both users via WebSocket
  - Remove from queue
```

## Diagramme des modules Mabé

```
┌─────────────────────────────────────────────────────────────┐
│                   Mabé Experience Engine                    │
│                    src/lib/mabe/index.ts                    │
├──────────────────┬──────────────────────────────────────────┤
│  Country Brain   │  Language Brain                          │
│  12 pays actifs  │  8 langues (FR LN SW KG LU EN PT AR)    │
│  MA DZ NG KE +8  │  AR = RTL, nouvelles                    │
├──────────────────┼──────────────────────────────────────────┤
│  Voice Match     │  Safety Shield                           │
│  20 candidats    │  scamKeywords (33 entrées)               │
│  calculateScore()│  forbiddenBehaviors[]                    │
│  getQueueKey()   │  shouldThrottleUser()                    │
│  canMatchUsers() │  shouldRequireReview()                   │
├──────────────────┼──────────────────────────────────────────┤
│  Credit Engine   │  Trust Score                             │
│  CountryPricing  │  Score 0-100                             │
│  12 pays pricing │  Niveaux new/trusted/verified/VIP        │
│  formatPrice()   │  Événements                              │
├──────────────────┼──────────────────────────────────────────┤
│  Beta Module     │  Supabase Client                         │
│  POST /api/beta  │  fetch natif (sans SDK)                  │
│  Fallback LS     │  isSupabaseConfigured()                  │
│  getBetaCount()  │  supabaseServerInsert()                  │
└──────────────────┴──────────────────────────────────────────┘
```

## Flux inscription bêta

```
Formulaire bêta (composant)
  → submitBetaSignup(input)
    → validate(input)
    → tryApiInsert(input) — fetch POST /api/beta
      → Route Handler Next.js
        → validate (serveur)
        → isSupabaseConfigured() ?
          → OUI  : supabaseServerInsert("beta_signups", data)
          → NON  : { ok: true, local: true }
    → Erreur réseau → persistToLocalStorage(signup)
  → OK : signup sauvegardé (Supabase ou localStorage)
```

## Flux vocal (futur — Phase 2)

```
User A                    Server                    User B
  │                          │                          │
  │ → findVoiceMatch()       │                          │
  │   calculateMatchScore()  │                          │
  │                          │ ← scanRedisQueue()       │
  │                          │ → createSession()        │
  │ ← sessionId              │           sessionId →    │
  │                          │                          │
  │ → joinChannel(sessionId) │                          │
  │                          │      joinChannel() ←     │
  │                          │                          │
  │ ←──── WebRTC (LiveKit) ──────────────────────────→  │
  │                          │                          │
  │ → setConsent(YES)        │                          │
  │                          │ consentA = YES           │
  │                          │      setConsent(?) ←     │
  │                          │ consentB = YES           │
  │ ← "Double oui"           │         "Double oui" →   │
```

## Deployment cible (V1)

- **Frontend** : Vercel (Edge Runtime)
- **API** : Vercel Functions
- **DB** : Supabase PostgreSQL
- **Redis** : Upstash Redis
- **Voice** : LiveKit Cloud
- **CDN** : Cloudflare
