# Audit Repos peupleaelionor — Songi Songi Mabé

## Contexte
Session scopée à peupleaelionor/ssmabe-.
Audit via GitHub code search (lecture indirecte des patterns).

## Repos analysés

### MABELE-CORE ⭐ Priorité haute
- Stack: Next.js monorepo, TypeScript, Supabase, tRPC
- Modules utiles: payment providers Africa (M-Pesa, Airtel, Wave, MTN, Orange),
  country configs, billing routes
- Décision: Adapter les patterns de paiement mobile money

### MABELE.DRC ⭐ Priorité haute
- Stack: Next.js App Router, Supabase
- Modules utiles: checkout Orange Money/Airtel Money, wallet UI
- Décision: Adapter les UI patterns de checkout mobile money

### iKEMA.AI ⭐ Priorité moyenne
- Stack: TanStack Start, Supabase Auth, tRPC
- Modules utiles: Stripe + PayDunya (mobile money Africa),
  auth magic link, billing events schema
- Décision: Adapter le pattern PayDunya pour l'Afrique francophone

### LMNOX ⭐ Priorité moyenne
- Stack: TanStack Start, Supabase Auth
- Modules utiles: formatAuthError(), auth client Supabase
- Décision: Pattern de gestion erreurs auth réutilisé dans supabase/client.ts

### ZILINGO Priorité basse
- Stack: Next.js, Supabase
- Modules utiles: schema SQL avec RLS
- Décision: Pattern RLS utilisé dans supabase/beta-schema.sql

### YAyo2.0 Priorité basse
- Stack: Next.js, Supabase (futur)
- Modules utiles: Roadmap monétisation Stripe→Mobile Money
- Décision: Référence roadmap payments

### ynklv-token- Priorité basse
- Stack: documentation stratégique
- Modules utiles: stratégie Africa-first, Flutterwave
- Décision: Inspiration pour pricing par pays

## Ce qui n'existe pas dans l'écosystème peupleaelionor
- WebRTC / LiveKit / Agora : à implémenter from scratch
- Redis queue : à implémenter
- OTP SMS : à implémenter (Supabase SMS + Twilio)
