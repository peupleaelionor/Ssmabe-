# Songi Songi Mabé – Product Vision

## Vision

Songi Songi Mabé ("Belle Rencontre Vocale" en lingala) est la première plateforme de rencontre anonyme par la voix pensée pour le Congo et sa diaspora. L'objectif est simple : permettre à deux personnes de se connecter vocalement sans jamais partager leur numéro de téléphone.

## Problème résolu

Les applications de rencontre actuelles (Tinder, Badoo, WhatsApp Dating) ont plusieurs problèmes majeurs pour notre marché :

1. **Exposition du numéro** : WhatsApp et la plupart des apps de rencontre africaines exposent ton numéro dès la mise en contact
2. **Peu culturelles** : Aucune app ne parle lingala, ne supporte M-Pesa nativement, ni ne connaît les subtilités culturelles congolaises
3. **Filtrage par photo** : Les photos créent des biais, des faux profils et de la superficialité
4. **Harcèlement** : Les femmes reçoivent massivement des numéros non demandés

## Solution

Une plateforme 100% vocale avec :
- **Numéro toujours caché** : Canal WebRTC sécurisé, jamais de partage direct
- **Double consentement** : Pour continuer, les deux parties doivent dire oui
- **Modes contextuels** : 7 ambiances pour des rencontres précises
- **Congo First** : Lingala natif, M-Pesa, villes congolaises, 8 pays
- **Sécurité intégrée** : Pas une feature tardive, dans l'architecture

## User Flow

```
Landing Page
    ↓
Onboarding (5 étapes)
  → Pays → Langue → Mode → Âge → Pseudo
    ↓
Home (filtres de recherche)
    ↓
Call/Waiting (matching en cours)
    ↓
Call/Live (appel actif avec timer)
    ↓
Call/End (choix de consentement)
  → Double oui → Possibilité de continuer
  → Non / Passe → Fin propre, aucun contact
```

## 7 Modes d'Ambiance

| Mode | Description | Gratuit | Sécurité |
|------|-------------|---------|----------|
| Mboka | Amour local, même ville | Oui | ★★★★ |
| Lingala | Musique et culture | Oui | ★★★★ |
| Sérieux | Rencontre durable | Non (2cr/min) | ★★★★★ |
| Diaspora | Pont patrie-diaspora | Non (3cr/min) | ★★★★ |
| Monde | Ouvert à tous | Non (2cr/min) | ★★★ |
| Nuit | 21h-5h, voix nocturnes | Non (4cr/min) | ★★★ |
| Respect | Slow, voix posées | Non (1cr/min) | ★★★★★ |

## 8 Pays Cibles

**Afrique** : 🇨🇩 RDC · 🇨🇬 Congo-Brazza · 🇨🇮 Côte d'Ivoire · 🇨🇲 Cameroun · 🇸🇳 Sénégal

**Diaspora** : 🇫🇷 France · 🇧🇪 Belgique · 🇨🇦 Canada

## Monétisation

- **Freemium** : 3 appels gratuits par jour (modes Mboka + Lingala)
- **Crédits** : Achetés via M-Pesa, Airtel Money, Orange Money (Afrique) ou Stripe/PayPal (diaspora)
- **Packs** : Découverte (500 CDF), Mboka (2000 CDF), Sérieux (5000 CDF), Diaspora ($9.99), Premium ($29.99)
- **Pas de pub** : L'expérience vocale ne doit jamais être interrompue par une publicité

## Métriques Nord

- Durée moyenne d'appel > 5 minutes
- Taux de double consentement > 15%
- NPS > 50
- Taux de retention J7 > 30%
- Ratio femmes/hommes > 35% de femmes
