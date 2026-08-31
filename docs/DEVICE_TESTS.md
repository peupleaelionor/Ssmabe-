# Protocole de tests appareils — fondateur

Je ne peux pas tester physiquement plusieurs téléphones depuis mon environnement.
Voici des tests **très simples** à réaliser toi-même. Coche ✅ / ❌ et note le
modèle + la version OS. Chaque test dure < 1 min.

## Déjà testable aujourd'hui (site public)

### TEST WEB 01 — Landing (iPhone 390px & Android 360px)
1. Ouvrir `https://ssmabe.vercel.app`.
2. En < 5 s, tu comprends que c'est pour **parler/rejoindre** ? (oui/non)
3. Le bouton « Entrer » flottant apparaît quand tu scrolles au milieu ? ✅/❌
4. Aucune barre horizontale (pas de scroll latéral) ? ✅/❌

### TEST WEB 02 — Langue
1. Bas de page → basculer **LN** puis **EN**.
2. Le contenu change (hero, boutons) et reste après rechargement ? ✅/❌

### TEST WEB 03 — Mode économie de données
1. Bas de page → activer **Économie de données**.
2. La grande photo disparaît, animations coupées ? ✅/❌

### TEST WEB 04 — Hors-ligne (PWA)
1. Ouvrir le site, puis couper le réseau (mode avion).
2. Naviguer vers une page → page « Tu es hors-ligne » stylée ? ✅/❌

### TEST WEB 05 — Inscription bêta
1. `/beta` → remplir Prénom + Email + Pays + consentement → envoyer.
2. Message de succès ? ✅/❌  (Si Supabase branché : la ligne apparaît dans
   Table Editor → `waitlist_entries`.)

## À exécuter dès que le MVP vocal existe (prochain chantier)

### TEST IPHONE 01 — Rejoindre une room par lien
1. B (autre téléphone) ouvre une room et parle.
2. A reçoit le **lien WhatsApp**, l'ouvre sur iPhone (Safari).
3. A comprend immédiatement qu'une conversation a lieu ? ✅/❌
4. A choisit un pseudo (si demandé).
5. A **autorise le micro** quand c'est demandé (au moment de parler, pas avant).
6. A **entend B** parler ? ✅/❌  → note le **temps jusqu'à la 1re voix** (s).
7. A lève la main (demander la parole) → le host voit la demande ? ✅/❌
8. Le host accepte → A peut **parler** ? ✅/❌
9. A **mute/unmute** fonctionne ? ✅/❌
10. A **quitte** proprement ? ✅/❌
11. A **partage** le même lien ? ✅/❌

### TEST ANDROID 01 — idem sur Android (Chrome)
Répéter TEST IPHONE 01 sur un Android d'entrée/milieu de gamme, en 4G.

### TEST RÉSEAU 01 — connexion faible
1. Brider le réseau (3G/edge, ou « Slow 3G » dev tools).
2. Rejoindre une room : l'app affiche « Connexion faible » et **ne coupe pas
   brutalement** ? ✅/❌

## Ce que je garantis côté code (vérifié automatiquement)
- Tokens LiveKit **serveur uniquement**, secret jamais exposé, exp 1h, GET→405.
- Rôles : listener entre **muet** (canPublish=false), speaker/host peuvent parler.
- Rate-limit sur l'endpoint token.
- Aucun faux « live » / faux nombre de personnes.
