# Architecture — Songi Songi Mabé

## Vision technique
Plateforme communautaire souveraine : web léger d'abord (3G-friendly),
API-ready partout, aucun fournisseur irremplaçable.

## Couches actuelles
```
src/
├── app/            # pages (13 routes publiques) + api/ (7 endpoints)
├── components/
│   ├── brand/      # BrandMark + Logo (SVG inline)
│   ├── landing/    # sections homepage
│   ├── mvp/        # BetaFormPro, communautés, contact, FAQ, PageShell
│   └── songi|ui|…  # design system produit
├── content/        # fr/en/ln — TOUS les textes (i18n-ready)
├── config/         # contact, communities, flags, routes, userTypes, safety…
├── design/         # tokens (couleurs, typo, radius, ombres)
└── lib/            # env, validators, waitlist, rate-limit, analytics,
                    # supabase (fetch natif), robots/, safety-shield, mabe/
```

## Principes
- **Contenu ≠ composants** : tout texte vit dans src/content
- **Config ≠ code** : communautés, flags, contact dans src/config
- **Dégradation gracieuse** : sans env vars, tout fonctionne (localStorage,
  mocks, boutons « bientôt disponible »)
- **Privacy by design** : numéro jamais rendu, service key server-only,
  honeypot + rate-limit sur les APIs publiques

## Prochaines intégrations
Supabase Auth → profils/posts → Realtime rooms → LiveKit (voix) →
mobile money. Détail : docs/API_ROADMAP.md, docs/SCALE_PLAN.md.
