# Songi Songi Mabé — Système d'assets de marque

> Reconstitué à partir des 4 planches de référence (brand sheet, UI & product
> asset kit, marketing & social assets, logo variants).
> **Univers : vert profond · noir riche · crème.** Mascotte : chat noir, yeux
> verts, fines moustaches. Promesse : *« La voix d'abord. Le contact après. »*

Ce document est le **plan d'exploitation** des visuels. Il sépare clairement ce
qui doit être **exporté en image** de ce qui doit être **recodé en composant**,
et indique où chaque asset s'intègre dans le produit.

---

## A. Résumé stratégique

### Ce que racontent les visuels
- **Une marque calme, premium, adulte.** Pas de néon, pas de clinquant. Vert
  émeraude profond + noir + crème = sérieux, confiance, intimité.
- **La mascotte chat** est le cœur émotionnel : discrète, élégante, un brin
  mystérieuse (la nuit, l'écoute, l'anonymat). Elle n'est jamais « cute-cartoon »
  façon sticker — elle reste graphique et minimale.
- **La voix comme héros** : ondes audio, micro, « appel en cours », « voix
  anonyme ». L'UI parle d'écoute, pas de swipe.
- **La sécurité est un argument de marque, pas une note de bas de page** :
  « Numéro protégé », badges anonyme / sécurité / consentement.

### Ce qu'il faut garder absolument
- Le **trio chromatique** vert/noir/crème.
- La **mascotte chat minimale** comme signature.
- Le **slogan** et la **promesse de confidentialité** comme éléments visuels.
- La **sobriété** : beaucoup d'espace, peu d'éléments, typo nette.

### Ce qu'il faut éviter
- Surcharge d'icônes / dégradés criards / emojis partout.
- Esthétique « clone Tinder / WhatsApp » (cartes de swipe, bulles vertes type WA).
- Mascotte trop enfantine ou 3D.
- Mélanger plus de 2 polices.

---

## B. Tableau des assets

> Type = **IMAGE** (exporté en fichier) ou **COMPONENT** (recodé en React/Tailwind).
> Source = quelle planche de référence.

| Nom asset | Type | Source | Usage | Format reco | Intégration |
|---|---|---|---|---|---|
| `logo-primary-horizontal.svg` | IMAGE | Brand sheet / Logo variants | Header site, docs, signatures | SVG (+PNG @2x) | `MarketingHeader`, README |
| `logo-primary-horizontal-dark.svg` | IMAGE | Black background variant | Header sur fond clair/crème | SVG | Variante thème clair |
| `logo-compact.svg` | IMAGE | « Mabé » compact | Header mobile, favicon retina | SVG | `MarketingHeader` (mobile) |
| `logo-monochrome.svg` | IMAGE | Monochrome | Tampon, watermark, presse | SVG | Kit presse |
| `logo-round.png` | IMAGE | Circular icon | Avatar social, badge rond | PNG 1024² | Réseaux sociaux |
| `app-icon.png` | IMAGE | App icon | Icône application (stores) | PNG 1024², coins app | `manifest`, stores |
| `favicon.png` / `favicon.svg` | IMAGE | Favicon | Onglet navigateur | SVG + PNG 32/16 | `src/app/` favicon |
| `mascot-head-dark.svg` | IMAGE | Mascot headshot | Spotlight, vide-états, 404 | SVG | `EmptyState`, `/demo` |
| `mascot-head-light.svg` | IMAGE | Cream background | Mascotte sur fond sombre | SVG | Hero, sections sombres |
| `mascot-full-body.svg` | IMAGE | Mascot full body | Illustration marketing | SVG | Pages marketing, blog |
| `badge-anonyme.svg` | COMPONENT* | Icon badges | Trust point « Appel anonyme » | SVG icon | `SafetySection`, `Concept` |
| `badge-securise.svg` | COMPONENT* | Icon badges | Trust point « Sécurité » | SVG icon | `SafetySection` |
| `badge-diaspora.svg` | COMPONENT* | Icon badges | Trust point « Diaspora » | SVG icon | `CongoFirst` |
| `badge-consentement.svg` | COMPONENT* | Icon badges | Trust point « Double consentement » | SVG icon | `SafetySection` |
| `mode-mboka-card` | COMPONENT | Mode cards | Carte mode Mboka | React/Tailwind | `ModesSection` |
| `mode-diaspora-card` | COMPONENT | Mode cards | Carte mode Diaspora | React/Tailwind | `ModesSection` |
| `mode-respect-card` | COMPONENT | Mode cards | Carte mode Respect | React/Tailwind | `ModesSection` |
| `trust-banner-numero-protege` | COMPONENT | Trust banner | Bandeau « Numéro protégé » | React/Tailwind | `SafetySection`, Hero |
| `cta-trouver-une-voix` | COMPONENT | CTA buttons | Bouton primaire | `Button` variant | `Hero`, `/home` |
| `cta-rejoindre-beta` | COMPONENT | CTA buttons | Bouton bêta | `Button` variant | `Hero`, `BetaForm` |
| `ui-call-incoming` | COMPONENT | UI mini mockup 7 | Écran « Appel en cours » | React/Tailwind | `/call/live` (existe) |
| `ui-welcome-wave` | COMPONENT | UI mini mockup 6 | Écran d'accueil + onde | React/Tailwind | `/home` (existe) |
| `landing-hero-card.png` | IMAGE | Landing hero card | Visuel hero (option image) | WebP | `Hero` (fallback visuel) |
| `feature-congo-world.png` | IMAGE | Feature card | Carte « Né au Congo » | WebP | `CongoFirst` (option) |
| `quote-card.png` | IMAGE | Quote card | « Pas de swipe… » réseaux | WebP/PNG | Réseaux sociaux |
| `instagram-profile.png` | IMAGE | IG profile cover | Photo de profil IG | PNG 320² | Instagram |
| `instagram-post-cover.png` | IMAGE | IG post cover | Post carré | PNG 1080² | Instagram |
| `instagram-story-cover.png` | IMAGE | IG story cover | Story verticale | PNG 1080×1920 | Instagram / TikTok |
| `x-banner.png` | IMAGE | X banner | Bannière profil X | PNG 1500×500 | X / Twitter |

\* **COMPONENT\*** = l'icône peut être un petit SVG importé, mais sa *mise en
carte* (fond, label, halo) est recodée en composant. Garder l'icône en SVG,
recoder l'habillage.

---

## C. Arborescence finale (prête à créer)

Déjà scaffoldée dans le repo :

```
public/assets/songi/
├── brand/        # charte exportée, nuancier, aperçu typo
│   ├── palette.png
│   └── brand-sheet.png
├── logo/         # toutes les variantes de logo (SVG prioritaire)
│   ├── logo-primary-horizontal.svg
│   ├── logo-primary-horizontal-dark.svg
│   ├── logo-compact.svg
│   ├── logo-monochrome.svg
│   └── logo-round.png
├── icons/        # favicon + app icon
│   ├── favicon.svg
│   ├── favicon.png
│   └── app-icon.png
├── mascot/       # mascotte chat (toutes déclinaisons)
│   ├── mascot-head-dark.svg
│   ├── mascot-head-light.svg
│   └── mascot-full-body.svg
├── ui/           # repères UI (référence de style, pas assets finaux)
├── mockups/      # mockups mobile marketing (images finales)
│   ├── mockup-call-live.png
│   └── mockup-welcome.png
├── social/       # kit réseaux sociaux
│   ├── instagram-profile.png
│   ├── instagram-post-cover.png
│   ├── instagram-story-cover.png
│   └── x-banner.png
├── marketing/    # visuels marketing (hero card, quote card…)
│   ├── landing-hero-card.png
│   └── quote-card.png
├── modes/        # référence visuelle des cartes modes (recodées en UI)
└── security/     # référence trust banner + badges (recodés en UI)
```

> Règle : `logo/`, `icons/`, `mascot/` = **vrais assets finaux**.
> `ui/`, `modes/`, `security/` = **références de style** (l'implémentation finale
> est en composant React, voir §E).

---

## D. Design tokens

### Couleurs — tokens de marque (planche) → tokens code existants

La planche de référence donne un trio. Le code (`tailwind.config`) implémente
déjà une palette très proche, **on ne la modifie pas** ; on documente la
correspondance.

| Rôle | Token planche | Hex planche | Token code existant | Hex code |
|---|---|---|---|---|
| Vert primaire | `primary-green` | `#002B20` | `vert-congo` | `#0F3D32` |
| Vert foncé | `green-deep` | `#001C15` | `vert-dark` | `#082820` |
| Noir riche | `rich-black` | `#0E0E0E` | `noir` | `#0B0B0B` |
| Crème | `soft-cream` | `#F4EFE6` | `creme` | `#F8F3EA` |
| Blanc chaud | `white` | `#FFFFFF` | `blanc-chaud` | `#FFFDF8` |
| Accent | `accent-copper` | `#C76A2D` | `cuivre` | `#C76A2D` |
| Gris texte | `muted` | `#6F6A63` | `gris-texte` | `#6F6A63` |

> **Reco (non bloquante)** : si on veut coller exactement à la planche, basculer
> `vert-congo` de `#0F3D32` → `#0F3833`/`#002B20`. À valider avant tout changement
> design — **non appliqué ici**.

### Typographie

| Usage | Planche | Code actuel | Reco |
|---|---|---|---|
| Titres | Poppins SemiBold | Inter (`--font-inter`) | Ajouter Poppins via `next/font` pour les titres |
| Corps | Poppins Regular | Inter | Inter OK en corps, ou Poppins Regular pour cohérence |

> La planche montre **Poppins**. Le code utilise **Inter**. Inter est un excellent
> substitut neutre ; passer à Poppins est une amélioration de cohérence de marque,
> **à valider** (changement design → non appliqué ici).

### UI tokens (déjà cohérents avec le code)

| Token | Valeur | Source |
|---|---|---|
| Radius boutons | `rounded-full` / `rounded-2xl` | CTA pills de la planche |
| Radius cards | `rounded-3xl` (24px) | cartes modes / mockups |
| Border | `#222222` (`noir-border`) sur fond sombre | UI kit |
| Shadow | douce, diffuse, basse opacité (pas de drop-shadow dur) | mockups |
| Spacing | base 4px, sections `py-20` | landing actuelle |
| Icônes | trait fin (~1.5px stroke), style ligne | badges de la planche |

---

## E. Ce qui est IMAGE vs COMPONENT (séparation nette)

### IMAGE (exporter comme fichier)
- **Logos** (toutes variantes) → SVG.
- **Mascotte** (head dark/light, full body) → SVG.
- **Favicon / app icon** → SVG + PNG.
- **Kit social** (IG profile/post/story, X banner) → PNG/WebP.
- **Visuels marketing** (hero card, quote card, feature card) → WebP.
- **Mockups mobile marketing** (captures stylisées) → PNG/WebP.

### COMPONENT (recoder en React/Next/Tailwind)
- **Boutons CTA** (`Trouver une voix`, `Rejoindre la bêta`) → `Button` (déjà en place).
- **Cartes modes** (Mboka, Diaspora, Respect, +Lingala/Sérieux/Monde/Nuit) →
  `ModesSection` (déjà en place).
- **Trust banner « Numéro protégé »** → bloc dans `SafetySection` (déjà en place).
- **Badges sécurité** (anonyme, sécurité, diaspora, consentement) → icône SVG +
  habillage composant.
- **Écrans UI** (« Appel en cours », « Accueil + onde ») → pages réelles
  `/call/live`, `/home` (déjà en place). Les mockups de la planche servent de
  **référence de style**, pas d'assets à embarquer.

> Principe : tout ce qui est **interactif ou textuel** = composant (accessible,
> traduisible, responsive). Tout ce qui est **illustratif ou identitaire** = image.

---

## F. Recommandations d'intégration (par section)

| Section | Asset(s) | Type | Statut |
|---|---|---|---|
| **Header** | `logo-primary-horizontal.svg` + favicon | IMAGE | `MarketingHeader` existe → brancher le SVG |
| **Hero** | slogan + 2 CTA (+ option `landing-hero-card`) | COMPONENT (+IMAGE option) | `Hero` existe |
| **Comment ça marche** | recodé, esthétique mockups | COMPONENT | `HowItWorks` existe |
| **Modes** | cartes Mboka/Diaspora/Respect (+4) | COMPONENT | `ModesSection` existe |
| **Sécurité** | trust banner + 4 badges | COMPONENT (icônes SVG) | `SafetySection` existe |
| **Bêta** | CTA `Rejoindre la bêta` + visuel simple | COMPONENT | `BetaForm` existe |
| **Réseaux** | IG profile/post/story, X banner | IMAGE | kit `social/` à exporter |

---

## G. Bonus — formats & mutualisation

### À vectoriser (SVG)
Logos, mascotte, favicon, tous les pictos/badges sécurité. → net à toute taille,
poids minimal, recolorable en CSS.

### PNG / WebP
Kit social (IG/X), mockups marketing, quote cards. → privilégier **WebP** pour le
web (poids), garder **PNG** pour les plateformes sociales qui le demandent.

### Responsive
- Logo : `logo-primary-horizontal` (desktop) ↔ `logo-compact` (mobile).
- Mascotte : `head` (petits formats) ↔ `full-body` (grands formats marketing).
- Hero card : `srcset` 1x/2x.

### Composants mutualisables (design system)
- `Button` (variants `primary` vert, `ghost`, pill) — **existe**.
- `Card` / `ModeCard` — **existe** (`ui/card.tsx`, `ModesSection`).
- `Badge` (`ui/badge.tsx`) — **existe**, à étendre pour les trust badges.
- `TrustBanner` — à factoriser depuis `SafetySection`.
- `MascotIllustration` — nouveau wrapper `<Image>` (dark/light) pour vide-états/404.
- `VoiceWave` — **existe** (`voice/voice-wave.tsx`).

---

## H. Plan d'implémentation (ordre recommandé)

1. **Branding** — déposer `brand-sheet.png` + `palette.png` dans `brand/` (référence).
2. **Logo** — exporter les SVG dans `logo/`, brancher dans `MarketingHeader`.
3. **Favicon + app icon** — `icons/`, référencer dans `src/app/` + `manifest`.
4. **Hero assets** — mascotte `head-light` + (option) `landing-hero-card`.
5. **Security badges** — 4 icônes SVG dans `security/` + `TrustBanner` factorisé.
6. **Mode cards** — vérifier les 7 modes contre `ModesSection` (visuel planche).
7. **Social kit** — exporter IG/X dans `social/`.
8. **Marketing visuals** — quote cards, feature cards dans `marketing/`.

> Étapes 2→8 = surtout **dépôt de fichiers + branchements ponctuels**, sans
> refonte. Le code des sections existe déjà ; on **n'altère pas le design** sans
> validation.
</content>
</invoke>
