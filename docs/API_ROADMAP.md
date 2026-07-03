# API Roadmap

## Live (MVP)
| Route | Méthode | Rôle |
|---|---|---|
| /api/health | GET | statut + version + env |
| /api/waitlist | POST | inscription bêta (validation, honeypot, rate-limit, Supabase optionnel) |
| /api/contact | POST | message contact (rate-limit, Supabase optionnel) |
| /api/communities | GET | communautés (mock → DB) |
| /api/events | GET | événements (mock → DB) |
| /api/feature-flags | GET | flags publics |
| /api/beta | POST | ancien formulaire simple (conservé, compat) |

## Prochaines
1. **Auth** — Supabase Auth (email OTP puis SMS) → /api/auth/*
2. **Profiles** — CRUD profil (RLS propriétaire)
3. **Communities** — adhésion, création (créateurs validés)
4. **Rooms/Messages** — Supabase Realtime puis dédié
5. **Calls** — LiveKit/Agora/Twilio (numéro jamais exposé, tokens éphémères)
6. **WhatsApp/SMS** — notifications opt-in (templates approuvés)
7. **Payments** — mobile money (Airtel/Orange/M-Pesa via Flutterwave) + Stripe diaspora
8. **Moderation** — queue signalements branchée sur lib/robots/safetyRobot
