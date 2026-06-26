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

---

## Audit étendu (organisation complète, par métadonnées)

> 99 dépôts dans l'org. La lecture **de code** reste scoppée à `ssmabe-` ; ce
> tableau s'appuie sur les métadonnées GitHub (nom, description, topics, langage).
> « À inspecter » = nécessite `add_repo` avant reprise. **Ne rien copier
> aveuglément.**

| Repo | Stack | Utile pour SSMabé | Élément récupérable | Priorité | Action | Intégré |
|---|---|---|---|---|---|---|
| `songi-songi-mab-voice` | Next/TS (Lovable) | Origine produit | Copy, sections landing, design refs | 🔴 | Aligner textes/sections | Partiel |
| `MABELE-CORE` | TS | Cœur domaine RDC | Country config, auth, modèles users | 🔴 | Inspecter (Country Brain / profils) | À inspecter |
| `mabele-rdc-connect` | TS | Connectivité RDC/diaspora | Patterns realtime / matching | 🔴 | Inspecter (Voice Match v2) | À inspecter |
| `qquizz` | Next/TS + **Supabase** | Auth + Supabase prod | Client Supabase, OTP, RLS, dashboard | 🟠 | Reprendre patterns phase 2 | À inspecter |
| `ynklv-token-` | TS | Tokens / crédits | Logique wallet / crédits | 🟠 | Comparer à `creditEngine` | À inspecter |
| `LMNOX` / `lmnoxtools` | TS | IA / micro-outils | Inspiration robots internes | 🟢 | Déjà transposé (`lib/robots`) | Indirect |
| `LMNOX-AI-AGENT-MARKETPLACE` | Python | Catalogue agents | Idées robots growth/safety | 🟢 | Référence | Indirect |
| `techflow-agency` / `ezonga` / `simvan-digital` | Next/TS | Vitrines premium | Patterns landing/animations | 🟢 | Réf. esthétique | Non |
| `55secondes-` / `Kaelen-Game-` | TS | Jeux temps réel | Boucles realtime / presence | 🟢 | Réf. realtime (100k) | Non |
| `Homebn-property-os-` / `Agromind` | TS | Dashboards métier | Tables data-dense | 🟢 | Réf. admin | Non |
| `Librelingo` | TS | Langues / i18n | Pédagogie langues | 🟢 | Réf. Language Brain | Non |

### Hors périmètre (non pertinents pour un téléchat vocal)
`wordpress-nis2-cyberguide`, `conformite-ia-act-2026`, `MemoryOs`, `Erika-site-`
(archivé), `Maison-Bauma`, `PROTOKARA`, `ip-licensing-platform`,
`Orbis-monorepo*`, `your-website-builder`, `FLUXSTRATUM`, `OXOAI`,
`LEOPARDS-LABS`, `Perfection33`, `JevalisONLY`, `YAYOFAM-`, `Aida-Data-Aide-`,
`LMNOX-LinkedIn-Leads`, `AI.NEGOCIATOR`, `Relayf`.

### Prochaine étape recommandée
`add_repo` sur `MABELE-CORE`, `mabele-rdc-connect`, `qquizz` pour : (1) un client
Supabase + auth OTP éprouvé (phase 10k) ; (2) comparer les modèles de données
RDC ; (3) mutualiser un design system commun à l'écosystème Mabélé.
