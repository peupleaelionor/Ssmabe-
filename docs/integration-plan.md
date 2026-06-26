# Plan d'intégration — Songi Songi Mabé

## Niveau A — Immédiat (MVP bêta)

### Supabase client
- `src/lib/supabase/client.ts` — client fetch natif (sans SDK)
- `src/app/api/beta/route.ts` — Route Handler POST /api/beta
- `supabase/beta-schema.sql` — table beta_signups + RLS
- Brancher : installer `@supabase/supabase-js`, remplacer `supabaseServerInsert()` par le SDK

### Country Brain +4 pays
- Maroc (MA), Algérie (DZ), Nigeria (NG), Kenya (KE)
- Total : 12 pays actifs
- Arabic (AR) ajouté comme langue supportée (RTL)
- Payment providers : Paystack, Flutterwave, M-Pesa Kenya

### Voice Match avancé
- `calculateMatchScore()` — scoring 0-100 multicritères
- `canMatchUsers()` — vérification compatibilité
- `getQueueKey()` — préparation clés Redis
- `getMatchingStats()` — analytics pool de candidats
- Pool étendu à 20 candidats couvrant les 12 pays

## Niveau B — Adapter depuis MABELE-CORE/MABELE.DRC (Phase 2)

### Mobile money patterns
- Orange Money (CI, CM, SN, CG) → pattern MABELE.DRC
- MTN Money (CM, CG) → pattern MABELE-CORE
- Airtel Money (CD, CG) → pattern MABELE-CORE
- M-Pesa (CD) → pattern MABELE-CORE
- M-Pesa Kenya (KE) → adapter depuis MABELE-CORE

### Checkout UI
- Adapter les UI components checkout depuis MABELE.DRC
- Créer `src/components/wallet/mobile-money-checkout.tsx`

### PayDunya (Afrique francophone)
- Adapter le pattern depuis iKEMA.AI
- Couvre : SN, CI, CM, DZ, MA (Afrique francophone)

## Niveau C — Inspiration (Phase 3)

### Scoring ZAWIOS
- Pattern de scoring comportemental avancé
- À intégrer dans `src/lib/safety-shield/` pour le trust score

### Auth magic link
- Pattern depuis iKEMA.AI : Supabase Auth + magic link
- Alternative OTP SMS pour les marchés africains sans email

### Billing events schema
- Pattern depuis iKEMA.AI : events audit trail
- À intégrer dans `src/lib/credit-engine/` pour l'audit financier

## Ce qui reste à implémenter from scratch

| Module | Priorité | Estimation |
|--------|----------|------------|
| WebRTC / LiveKit | P0 | 2 semaines |
| Redis queue (matching temps réel) | P0 | 1 semaine |
| OTP SMS (Supabase SMS + Twilio) | P1 | 3 jours |
| Auth utilisateurs (NextAuth/Supabase Auth) | P1 | 1 semaine |
| Notifications push | P2 | 3 jours |
