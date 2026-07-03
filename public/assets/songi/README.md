# public/assets/songi — Kit d'assets Songi Songi Mabé

Arborescence des assets de marque. Plan complet :
[`docs/brand-assets.md`](../../../docs/brand-assets.md).

## Arborescence

| Dossier | Contenu | Type dominant |
|---|---|---|
| `brand/` | charte exportée, nuancier, aperçu typo | référence |
| `logo/` | variantes de logo (SVG prioritaire) | **asset final** |
| `icons/` | favicon + app icon + maskable | **asset final** |
| `mascot/` | mascotte chat (head dark/light, full body) | **asset final** |
| `ui/` | repères UI | référence de style |
| `mockups/` | mockups mobile marketing | image finale |
| `social/` | kit réseaux (IG profile/post/story, X banner, OG) | image finale |
| `marketing/` | hero card, quote card, feature card | image finale |
| `modes/` | référence cartes modes (recodées en composant) | référence |
| `security/` | badges sécurité (anonymous/security/diaspora/consent) | **asset final** |
| `generated/` | assets générés (IA, scripts, exports automatiques) | intermédiaire |
| `raw/` | sources brutes non optimisées (PSD, exports HD) | source |
| `optimized/` | versions web compressées (WebP/PNG optimisés) | **servies en prod** |

## Où mettre quoi
- **Logos** → `logo/` (SVG). Wordmark + mascotte.
- **Mascottes** → `mascot/` (SVG). Variantes dark (fond clair) / light (fond sombre).
- **Favicon / app icon** → `icons/`. `favicon.svg` aussi dupliqué à la racine `public/`.
- **Mockups** → `mockups/` (captures stylisées du produit).
- **Assets sociaux** → `social/` (IG/X/OG). Voir tailles ci-dessous.
- **Sources lourdes** → `raw/` ; ne jamais servir directement.
- **Exports finaux web** → `optimized/` (compressés).

## Formats recommandés
| Usage | Format | Pourquoi |
|---|---|---|
| Logo, mascotte, favicon, badges | **SVG** | vectoriel, net partout, recolorable, léger |
| Visuels web (hero, quote, feature) | **WebP** | meilleur ratio poids/qualité |
| Réseaux sociaux (IG/X) | **PNG** ou **WebP** | compat plateformes |
| Sources d'édition | PSD / SVG / PNG HD | dans `raw/` uniquement |

### Quand SVG / PNG / WebP
- **SVG** : tout ce qui est géométrique et identitaire (logo, picto, mascotte).
- **WebP** : photos / illustrations riches servies sur le site.
- **PNG** : quand la plateforme cible ne supporte pas WebP/SVG (certains réseaux, OG legacy).

## Tailles sociales
| Asset | Dimensions |
|---|---|
| Instagram profile | 320 × 320 |
| Instagram post | 1080 × 1080 |
| Instagram story | 1080 × 1920 |
| X / Twitter banner | 1500 × 500 |
| OpenGraph (OG) | 1200 × 630 |

## Naming convention
`kebab-case`, suffixe `-dark` / `-light` (fond), `@2x` (retina).

```
logo-primary-horizontal.svg
logo-primary-horizontal-dark.svg
logo-compact-mabe.svg
logo-round.svg
app-icon.png            (source SVG: app-icon.svg)
favicon.svg
mascot-head-dark.svg
mascot-head-light.svg
badge-anonymous.svg
badge-security.svg
badge-diaspora.svg
badge-consent.svg
mode-mboka-card.webp
mode-lingala-card.webp
mode-diaspora-card.webp
mode-respect-card.webp
trust-banner-number-protected.webp
hero-card.webp
instagram-post-cover.webp
instagram-story-cover.webp
x-banner.webp
quote-card.webp
og-cover.svg            (remplacer par og-cover.png 1200×630 avant lancement)
```

## État actuel (placeholders propres livrés)
Des SVG de marque **propres et cohérents** (vert/noir/crème, mascotte chat) sont
déjà en place : logos, favicon, app-icon, maskable, mascottes, badges sécurité,
OG cover. Ils sont fonctionnels en l'état et remplaçables par les exports finaux
du studio. Les `.gitkeep` maintiennent les dossiers encore vides.

> ⚠️ Avant lancement : remplacer `social/og-cover.svg` par une version **PNG/WebP
> 1200×630** (certains scrapers sociaux n'acceptent pas le SVG en OG).
</content>
