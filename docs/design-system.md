# Design System — Songi Songi Mabé

Design system interne. Source de vérité TS dans [`src/design/`](../src/design),
miroir de `tailwind.config`. Univers **vert profond · noir riche · crème**.

## Couleurs

| Token | Hex | Tailwind | Usage |
|---|---|---|---|
| richBlack | `#0B0B0B` | `noir` | fond principal |
| deepGreen | `#0D3B33` | `vert-dark`* | surfaces vertes profondes |
| congoGreen | `#0F3D32` | `vert-congo` | primaire, CTA |
| greenLight | `#1a5c4b` | `vert-light` | hover, accent voix |
| copper | `#C76A2D` | `cuivre` | accent, highlights |
| white | `#FFFFFF` | — | contraste max |
| warmWhite | `#FFFDF8` | `blanc-chaud` | texte principal |
| softCream | `#F8F3EA` | `creme` | fonds clairs, badges |
| mutedText | `#6F6A63` | `gris-texte` | texte secondaire |
| danger | `#DC2626` | `danger` | erreurs, stop |
| success | `#16A34A` | `success` | succès, OK |

\* `vert-dark` réel = `#082820` ; `deepGreen` token marque proche. Aligné dans
`src/design/colors.ts`.

## Typographie

- **Titres** : Poppins SemiBold (cible marque) → fallback Inter / Sora / Manrope.
- **Corps** : Inter (chargé via `next/font`) → fallback Manrope.
- Échelle : `src/design/typography.ts` (`xs`→`6xl`), poids 400/500/600/700/900.

> Le code charge actuellement **Inter**. Passer les titres en **Poppins** est une
> amélioration de cohérence de marque (changement design → à valider, non appliqué).

## UI tokens

| Token | Valeur | Note |
|---|---|---|
| Radius bouton | `rounded-full` | pill (signature) |
| Radius carte | `rounded-3xl` (24px) | cartes, modals |
| Radius input | `rounded-xl` (16px) | champs |
| Border | `#222222` (`noir-border`) | sur fond sombre |
| Focus ring | `ring-2 ring-vert-light ring-offset-2 ring-offset-noir` | accessible |
| Shadow premium | `0 20px 60px -20px rgba(0,0,0,0.6)` | profondeur douce |
| Glow vert | `0 0 24px -4px rgba(15,61,50,0.7)` | éléments « voix » |
| Spacing | base 4px ; sections `py-16` mobile / `py-20` desktop | mobile-first |
| Icônes | trait ~1.5px, style ligne | badges sécurité |

## Composants produit (`src/components/songi/`)

| Composant | Rôle |
|---|---|
| `BrandLogo` | logo officiel (horizontal/compact/round) |
| `VoiceWave` | onde vocale animée CSS (SSR-safe) |
| `PrimaryCTA` / `SecondaryCTA` | boutons pill (lien ou action) |
| `TrustBadge` | pastille de confiance |
| `SecurityBadge` | badge sécurité illustré (4 types) |
| `ModeCard` | carte mode d'ambiance |
| `CountryBadge` | pastille pays (drapeau + nom) |
| `BetaSignupForm` | formulaire bêta réutilisable (contact optionnel) |
| `HeroMockup` | maquette « appel en cours » (composant, pas image) |
| `VoiceDemoCard` | carte démo voix |
| `ProtectedNumberBanner` | bandeau « Numéro protégé » |
| `DoubleConsentCard` | pédagogie double consentement |
| `SocialProofBar` | chiffres clés de réassurance |
| `AdminMetricCard` | carte métrique admin |

Tous : TypeScript strict, mobile-first, accessibles (focus ring, `aria`), **aucune
donnée sensible rendue** (jamais de numéro).

## Règles d'usage
- Préférer les **classes Tailwind** ; n'utiliser les tokens TS (`@/design/tokens`)
  que pour le JS dynamique, le canvas ou le SVG.
- Ne pas introduire de nouvelle couleur hors palette sans validation.
- Garder ≤ 2 familles de police.
</content>
