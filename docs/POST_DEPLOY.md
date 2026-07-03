# POST_DEPLOY — checklist après chaque mise en production

## 1. Déploiement
- [ ] **Production Branch Vercel = `main`** (Settings → Git) — sinon le
  workflow `sync-prod-branch` fait le relais automatiquement
- [ ] Footer de ssmabe.vercel.app affiche le **bon build sha**
  (comparer à `git log -1 --format=%h origin/main`)
- [ ] Hard refresh (cache CDN/navigateur) avant de conclure à un écart

## 2. Santé
- [ ] `GET /api/health` → `{ status:"ok", beta:"open", supabase:"configured|fallback" }`
- [ ] `supabase:"fallback"` = normal tant que Supabase n'est pas branché
  (le formulaire fonctionne en localStorage, **sans crash**)

## 3. Parcours critiques
- [ ] `/` : hero compris en 5 secondes — Appel, WhatsApp, Entrer, Créer mon cercle
- [ ] `/#ambiances` : section Ambiances lisible, sans surcharge produit
- [ ] `/beta` : soumission OK (avec et sans téléphone)
- [ ] `/beta?community=kinshasa` : préremplissage ville/pays/communauté
- [ ] `/communautes` : filtres catégorie + pays fonctionnels
- [ ] `/create` : demande de cercle claire, liens vers bêta et lite OK
- [ ] `/pricing` : offres lisibles, non dominantes dans la home
- [ ] `/lite` : page charge vite, boutons cohérents avec la config
- [ ] `/contact` : envoi message OK

## 4. Mobile
- [ ] 320px / 360px / 390px : **aucun débordement horizontal**
- [ ] Menu mobile ouvre/ferme ; cibles tactiles ≥ 44px
- [ ] Les CTA hero restent empilés proprement sur vieux Android
- [ ] `prefers-reduced-motion` ne dégrade pas l'accès aux CTA

## 5. Téléphone-first
- [ ] `NEXT_PUBLIC_CONTACT_PHONE_NUMBER` vide → boutons « Numéro bientôt
  disponible » (désactivés proprement, pas de lien mort)
- [ ] `NEXT_PUBLIC_CONTACT_WHATSAPP_NUMBER` vide → « WhatsApp bientôt disponible »
- [ ] Numéros renseignés → liens `tel:`, `wa.me` (message prérempli), `sms:` valides
- [ ] Le texte de confiance reste visible : numéro protégé, 18+, consentement

## 6. Variables d'environnement (Vercel, Production + Preview)
| Variable | Rôle |
|---|---|
| NEXT_PUBLIC_SITE_URL | URL canonique |
| NEXT_PUBLIC_APP_ENV | production |
| NEXT_PUBLIC_CONTACT_PHONE_NUMBER | active appel + SMS |
| NEXT_PUBLIC_CONTACT_WHATSAPP_NUMBER | active WhatsApp |
| NEXT_PUBLIC_SUPABASE_URL (ou SUPABASE_URL) | DB |
| NEXT_PUBLIC_SUPABASE_ANON_KEY (ou SUPABASE_ANON_KEY) | DB (RLS) |
| SUPABASE_SERVICE_ROLE_KEY | serveur uniquement — Sensitive |

## 7. Marque / doctrine produit
- [ ] Logo bulles terracotta/olive · favicon · OG image `/brand/og-ssmabe-brand.png`
- [ ] La home garde l'ADN : **Parle. Rencontre. Rejoins.**
- [ ] Les couches marketplace/paiement/IA restent secondaires, pas dans le hero
- [ ] La doctrine `docs/TELECHAT_2050.md` est respectée avant toute refonte
