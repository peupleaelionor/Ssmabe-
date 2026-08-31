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

## MVP VOCAL — TEST 2 TÉLÉPHONES (~5 min) — le jalon décisif

**Prérequis** : les variables LiveKit doivent être sur Vercel + redéploiement
(voir la liste plus bas). Sinon la room affiche honnêtement « Le direct n'est
pas encore ouvert ».

**Rôles** :
- **Téléphone A = HÔTE** → ouvre `https://ssmabe.vercel.app/r/kin-la-nuit?host=1`
- **Téléphone B = AUDITEUR** → ouvre `https://ssmabe.vercel.app/r/kin-la-nuit`
  (le lien SANS `?host=1` — c'est celui qu'on partage)

Chaque étape : note **PASS / FAIL**.

| # | Action | PASS attendu |
|---|---|---|
| 1 | A ouvre la room (host) + met un pseudo | A voit la room « Kin la nuit » |
| 2 | A ouvre le micro (bouton MICRO), autorise le micro | Bouton = « MICRO OUVERT » |
| 3 | B ouvre le lien partagé | Sheet « Comment on t'appelle ? » |
| 4 | B entre un pseudo | B entre **sans** demande de micro |
| 5 | B **entend A** parler | Son de A audible + « A parle » |
| — | *(noter le temps entre l'ouverture de B et la 1re voix)* | quelques secondes |
| 6 | B appuie **✋ Lever la main** | « Demande envoyée » |
| 7 | A voit la demande | « Demandes de parole : B » |
| 8 | A appuie **Accepter** | (côté A : la demande disparaît) |
| 9 | B voit qu'il peut parler | Bouton micro apparaît chez B |
| 10 | B ouvre son micro, **autorise le micro** | « MICRO OUVERT » |
| 11 | B parle | A **entend B** |
| 12 | B appuie pour **couper** | « MICRO COUPÉ » |
| 13 | A n'entend plus B | silence de B |
| 14 | B rouvre le micro | A entend B de nouveau |
| 15 | B **Quitter** | B revient à « Tu as quitté » |
| 16 | A voit B partir | (participant en moins) |

Puis **inverser** les appareils (A devient auditeur, B devient hôte).

### TEST RÉSEAU — connexion faible
1. Sur B, activer un réseau lent (3G) ou couper/rallumer le Wi-Fi.
2. L'app affiche « Reconnexion… » puis « Connexion au direct… » et **reprend
   sans tout recommencer** ? ✅/❌

### iOS Safari — points d'attention
- Le son démarre bien après le 1er geste (le bouton d'entrée compte comme geste) ?
- Après mise en arrière-plan puis retour, le son reprend ? ✅/❌

### Android Chrome
- Permission micro demandée seulement au moment de parler ? ✅/❌
- Bascule Wi-Fi ↔ mobile : reconnexion propre ? ✅/❌

> Si les étapes 5 et 11 passent (A entend B, B entend A après acceptation),
> **le vrai cœur de Songi Songi fonctionne.**

## Ce que je garantis côté code (vérifié automatiquement)
- Tokens LiveKit **serveur uniquement**, secret jamais exposé, exp 1h, GET→405.
- Rôles : listener entre **muet** (canPublish=false), speaker/host peuvent parler.
- Rate-limit sur l'endpoint token.
- Aucun faux « live » / faux nombre de personnes.
