# Songi Songi Mabé — Mobile Design System

## Objectif

Rendre le site plus premium sans perdre la simplicité du téléchat : **Parle. Rencontre. Rejoins.**

Le rendu doit rester lisible sur :

- iPhone récents ;
- vieux Android ;
- 320px, 360px, 390px ;
- connexions faibles ;
- Safari mobile avec barre basse ;
- navigateurs sans assets lourds.

## Assets intégrés

- `src/components/brand/TelechatAssets.tsx` : icônes inline, onde sonore, orbite/globe, séparateur premium.
- `public/assets/songi/telechat-orb.svg` : globe/orbite réutilisable pour cartes, OG, previews.
- `public/assets/songi/soundwave.svg` : motif sonore statique.

Ces assets sont volontairement en SVG / code pour éviter les images lourdes.

## Règles responsive

1. Les CTA principaux doivent toujours être empilés sur mobile.
2. Les boutons doivent faire au moins 44px de haut, idéalement 56–60px.
3. Les grilles passent en une colonne sous 390px.
4. Aucun texte critique ne doit être coupé.
5. Les emojis sont remplacés par des icônes SVG quand possible.
6. Les cartes ont un padding généreux et un rayon constant.
7. Les sections business/paiement restent secondaires, jamais dans le hero.

## Hiérarchie du hero

1. Logo + nom de marque visible.
2. Pills : `TÉLÉCHAT MODERNE` + `APPEL · WHATSAPP · WEB`.
3. Titre : `Parle. Rencontre. Rejoins.`
4. Sous-texte court.
5. Onde sonore.
6. CTA : appel, WhatsApp, entrée web, cercle.
7. Rassurance : numéro protégé, faible connexion, pas d'app obligatoire.

## Palette de référence

| Nom | Hex | Usage |
|---|---|---|
| Nuit profonde | `#0B0F14` | fond premium |
| Terracotta | `#E0694A` | action, voix, énergie |
| Olive | `#A3AD7A` | confiance, secondaire |
| Ivoire chaud | `#F4F2EC` | texte fort |
| Gris minéral | `#7B828A` | texte secondaire |

## Vérifications avant merge

- `/` : hero plus lisible, marque visible, CTA empilés.
- `/#ambiances` : carte orbite + grilles lisibles.
- `/create` : pas d'overflow.
- `/pricing` : pas d'overflow.
- `/lite` : reste ultra léger.
- 320px : une colonne sur les grilles longues.
- 390px : deux colonnes possibles mais sans texte écrasé.
