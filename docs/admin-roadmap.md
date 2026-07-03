# Admin — roadmap

## Aujourd'hui
Console mock sur `/admin` (données factices + readiness robots). Aucune donnée réelle exposée.

## Avec l'auth (palier 10k)
1. Accès restreint (Supabase Auth + rôle admin)
2. **Waitlist** : lecture, filtres, export CSV, statuts (pending → invited → active)
3. **Communautés** : création, édition, activation bêta→actif
4. **Créateurs** : validation des candidatures
5. **Signalements** : queue alimentée par safetyRobot (allow/throttle/review/block)
6. **Flags** : bascule des feature flags sans déploiement
7. **Notifications** : envoi ciblé (communauté, pays, profil)
