# Safety Shield – Documentation

## Philosophie

La sécurité dans Songi Songi Mabé n'est pas un ajout tardif : c'est dans l'ADN du produit. Deux valeurs fondamentales :

1. **Ton numéro ne quitte jamais nos serveurs** – Promesse technique absolue
2. **Fin propre garantie** – Sans double consentement, aucun contact n'est échangé

## Architecture de sécurité

### 1. Protection du numéro

```
Phone Number → (stocké hashé en BDD) → JAMAIS exposé
                        ↓
                   JWT Token (session)
                        ↓
              UserID anonyme dans les appels
                        ↓
                 Canal WebRTC sécurisé
```

Aucune couche du système ne transmet le numéro brut à un autre utilisateur.

### 2. Système de double consentement

À la fin de chaque appel, les deux utilisateurs voient indépendamment 5 options :

- **Oui, continuer** : L'appel peut reprendre
- **Prolonger** : Extension de l'appel
- **Passer** : Fin sans rancune
- **Bloquer** : Blocage immédiat et permanent
- **Signaler** : Rapport de comportement suspect

**Règle** : Si les deux disent "Oui" → connexion possible. Sinon → aucun contact.

### 3. Score de confiance

Chaque utilisateur a un score de 0 à 100 :

| Niveau | Score | Badge |
|--------|-------|-------|
| Nouveau | 0-59 | 🌱 |
| Fiable | 60-79 | ✓ |
| Vérifié | 80-94 | ✓✓ |
| VIP | 95-100 | ⭐ |

**Événements positifs** :
- Appel complété : +3
- Consentement donné : +2
- Vérification compte : +15

**Événements négatifs** :
- Signalement reçu : -10
- Signalement actionné : -20
- Blocage reçu : -5
- Spam détecté : -25

### 4. Détection de scam

Le module `safety-shield` détecte automatiquement :
- Demandes de transfert d'argent (M-Pesa, Western Union, crypto)
- Partage de numéros dans la voix (pattern regex sur la transcription)
- Redirection vers d'autres plateformes (WhatsApp, Instagram)

### 5. Système de signalement

**Raisons de signalement** :
- Harcèlement
- Spam / Arnaque
- Escroquerie
- Personne mineure
- Propos offensants
- Comportement inapproprié
- Faux profil
- Autre

**Process de traitement** :
1. Signalement créé → statut "pending"
2. Équipe de modération notifiée (< 24h)
3. Écoute du call (si enregistrement consentis)
4. Action : avertissement / suspension / ban permanent
5. Signalant informé de l'action

### 6. Blocage

- **Immédiat** : La personne bloquée ne peut plus jamais contacter le bloqueur
- **Invisible** : La personne bloquée ne sait pas qu'elle est bloquée
- **Permanent** : Le blocage persiste même si l'utilisateur change de pseudo
- **Révocable** : Le bloqueur peut débloquer depuis ses paramètres

## Règles de la communauté

**Interdictions strictes (ban permanent)** :
- Partage de numéro de téléphone
- Harcèlement ou menaces
- Demandes d'argent / scam
- Contenu sexuel explicite non consenti
- Usurpation d'identité
- Accès à des mineurs

**Tolérance zéro** pour la discrimination (ethnique, religieuse, de genre).

## Obligations légales

- Vérification d'âge 18+ obligatoire à l'onboarding
- Conservation des logs de modération 2 ans
- RGPD : Droit à l'oubli implémenté
- Signalement aux autorités si contenu illégal (CSAM, etc.)

## Métriques de sécurité

KPIs surveillés quotidiennement :
- Taux de signalement par appel < 0.5%
- Temps de traitement signalement < 24h
- Taux de faux positifs < 5%
- Score NPS "sentiment de sécurité" > 4.5/5
