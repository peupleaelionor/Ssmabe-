# Engineering Manifesto — Songi Songi Mabé

Gravé dans le marbre. Chaque ligne de code s'y conforme.

## Les 5 lois
1. **ZÉRO ÉTAT CACHÉ** — toute fonction est pure ou explicite ses effets. Le state
   global vit dans des stores immuables (Zustand + immer), jamais dans des variables
   locales persistantes.
2. **TOUT EST OBSERVABLE** — chaque événement (connexion, erreur, reconnexion,
   switch réseau) émet un log structuré niveau production.
3. **FAIL FAST, RECOVER FAST** — chaque échec réseau déclenche immédiatement une UI
   dégradée puis un retry. Jamais de spinner infini.
4. **MOBILE FIRST, 2G FIRST** — testé d'abord sur émulateur 2G + throttle CPU 4×.
   Si ça ne passe pas, c'est recalé.
5. **AUCUN MAGIC STRING** — room ids, types d'événement, clés de cache = constantes
   typées dans `constants.ts`.

## Anti-patterns interdits (rejet immédiat)
- `useEffect` pour un fetch → hook dédié / tanstack query.
- `any` dans une signature exportée.
- >2 niveaux d'imbrication de composants sans custom hook.
- `setTimeout` non nettoyé dans un `useEffect`.
- Import d'un fichier lodash entier.
- `console.log` de debug conservé → logger de production.
- Mutation directe d'un objet Zustand hors action.

## Seuils tolérance zéro (vérifiés avant merge)
| Métrique | Seuil |
|---|---|
| Bundle JS initial (gzip) | < 100 ko |
| TTI 4G throttled | < 2.5 s |
| Première peinture 3G | < 1.5 s |
| Assets totaux / page | < 500 ko |
| Latence audio aller-retour | < 200 ms |
| Perte paquets audio (réseau 5%) | < 2% |
| Listeners après démontage | 0 |

## Micro-décisions figées
- Virtualisation : **react-virtuoso**. Animations : **framer-motion**.
- État global : **Zustand + immer**. Formulaires : **react-hook-form + zod**.
- Requêtes : **tanstack query** (staleTime 30s, retry 3).
- Service worker : **next-pwa** (NetworkFirst API, CacheFirst assets).

## State machine connexion temps réel (pattern imposé)
```
idle → connecting
connecting → connected | fallback
connected → reconnecting
reconnecting → connected | fallback | disconnected
fallback → connected
disconnected → connecting
```
Reducer strict ; toute transition non listée `throw` en dev.

## Chaos test « Apocalypse réseau » (pré-merge, Puppeteer + sim réseau)
1. 2 clients rejoignent la room.
2. Offline client A 30s → B voit « A déconnecté ».
3. Réseau A rétabli → audio des deux < 5s, sans action manuelle.
4. Aucun crash, aucune erreur fatale pendant la reconnexion.
5. Bascule Wi-Fi→4G sur B en pleine conversation : coupure < 300ms.

## Grading PR (10/10 obligatoire)
- [ ] LiveKit sur 2 devices physiques
- [ ] Fallback Agora mesuré (switch < 1s)
- [ ] Reconnexion 5×, 0 échec
- [ ] Heartbeat + log ping/pong
- [ ] 2G validé (audio réduit, UI adaptée)
- [ ] Tests unitaires state machine complets
- [ ] 0 `any` exporté
- [ ] Bundle : pas de régression > 5%
- [ ] Chaos test passé
- [ ] Revue perso (diff annoté)

## Serment de l'artisan (avant chaque commit)
> « Je jure que ce code est le meilleur que je puisse produire. Il est testé,
> documenté, observable, résilient, léger. Il ne contient aucun raccourci. Je l'ai
> testé sur un réseau pourri et il tient. Je l'ai pensé pour le milliard
> d'utilisateurs. Je suis fier de le merger. »

## Kit d'intégration (à fournir dans Vercel — voir .env.example)
`LIVEKIT_API_KEY` · `LIVEKIT_API_SECRET` · `LIVEKIT_URL` · `AGORA_APP_ID` ·
`AGORA_CERTIFICATE` · `REDIS_URL` / `UPSTASH_REDIS_URL` · `SENTRY_DSN`.
