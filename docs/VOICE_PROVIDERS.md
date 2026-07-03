# Songi Songi Mabé — Voice Providers

## Objectif

Préparer la voix réelle sans exposer de clés dans le frontend.

Le frontend ne doit jamais signer directement les tokens. Les routes API Next.js reçoivent une demande courte, signent côté serveur, puis renvoient uniquement ce qui est nécessaire au navigateur.

## Provider principal recommandé

- **LiveKit** : provider principal pour salons vocaux, rooms, futur SIP / téléphonie.
- **Agora** : provider secondaire / test parallèle / secours.

## Variables Vercel à configurer

### LiveKit

```txt
VOICE_PROVIDER=livekit
LIVEKIT_URL=wss://xxx.livekit.cloud
NEXT_PUBLIC_LIVEKIT_URL=wss://xxx.livekit.cloud
LIVEKIT_API_KEY=...
LIVEKIT_API_SECRET=...
```

### Agora

```txt
AGORA_APP_ID=...
NEXT_PUBLIC_AGORA_APP_ID=...
AGORA_APP_CERTIFICATE=...
```

`AGORA_APP_CERTIFICATE` est optionnel pour tester en mode App ID. Pour une production sécurisée, il faudra brancher un token server Agora complet avant d’ouvrir massivement.

## Routes API ajoutées

### Statut

```txt
GET /api/voice/config
```

Renvoie : provider actif, LiveKit configuré, Agora configuré, présence des clés serveur sans révéler leur valeur.

### LiveKit token

```txt
POST /api/livekit/token
```

Body :

```json
{
  "roomName": "kinshasa-beta",
  "identity": "kevin-test",
  "displayName": "Kevin Test"
}
```

Réponse :

```json
{
  "ok": true,
  "provider": "livekit",
  "url": "wss://...",
  "roomName": "kinshasa-beta",
  "identity": "kevin-test",
  "token": "...",
  "expiresAt": "..."
}
```

### Agora readiness

```txt
POST /api/agora/token
```

Body :

```json
{
  "channelName": "kinshasa-beta",
  "uid": 1001,
  "role": "publisher"
}
```

Réponse : app ID, channel, uid, token nul en MVP. Si `AGORA_APP_CERTIFICATE` est présent, la réponse indique que le token sécurisé sera requis avant production.

## Test après déploiement

1. Vercel → redeploy après ajout des variables.
2. Vérifier `GET /api/voice/config`.
3. Tester `POST /api/livekit/token`.
4. Tester `POST /api/agora/token`.
5. Ne jamais coller les tokens ou secrets dans GitHub ni dans le chat.

## Suite produit

- Page `/voice` disponible pour test interne.
- Ajouter le client LiveKit côté navigateur.
- Créer un salon vocal beta.
- Ajouter un vrai token server Agora si Agora devient provider actif.
- Puis seulement après : LiveKit SIP / Telephony pour vrais appels téléphoniques.
