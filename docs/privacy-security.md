# Privacy & Sécurité — Songi Songi Mabé

Le produit est **privacy-first**. Ces garanties ne sont pas des slogans : elles
sont vérifiables dans le code.

## 1. Aucun numéro exposé
- Les candidats Voice Match (`MockCandidate`) et les résultats (`MatchResult`)
  **ne portent aucun champ téléphone**.
- Le champ `User.phone` existe pour de futurs besoins serveur mais **n'est jamais
  lu ni rendu** côté front (vérifié par recherche dans `src/`).
- Garde-fou de dev : `assertNoPhoneExposure(payload)` (Safety Shield) lève une
  erreur si un payload destiné au client contient un champ sensible ou un numéro
  en clair. `sanitizePublicCandidate(candidate)` retire tout champ sensible avant
  exposition.

## 2. Double consentement
- Aucun contact n'est partagé pendant l'appel.
- `CallSession.userAConsent` / `userBConsent` démarrent à `PENDING`.
- Le contact ne s'ouvre que si **les deux** acceptent. Sinon, la voix reste anonyme.

## 3. Service role server-only
- `SUPABASE_SERVICE_ROLE_KEY` **n'a pas** le préfixe `NEXT_PUBLIC_` → Next.js ne
  l'inline jamais dans le bundle navigateur.
- Lue uniquement dans `src/lib/supabase/client.ts`, utilisée par
  `supabaseServerInsert/Select`, appelées seulement depuis `/api/beta` (serveur).
- Aucun composant `"use client"` n'importe ces fonctions.

## 4. Contact bêta volontaire
- Le contact (email / WhatsApp) est **optionnel**. Colonne `beta_signups.contact`
  **nullable** (choix volontaire).
- Le formulaire n'exige que pseudo, pays, langue, intention.

## 5. Signalement & blocage
- `reportUser`, `blockUser`, `isBlocked`, `getReportsForUser`.
- Niveaux de risque (`calculateRiskLevel`), throttle (`shouldThrottleUser`),
  revue manuelle (`shouldRequireReview`).

## 6. Anti-scam / anti-fraude
- Mots-clés catégorisés (`scamKeywordsByCategory`) : romance scam, demande
  d'argent, code, recharge, intimidation, faux support, spam, contact externe,
  demande d'identité.
- `detectScamRisk`, `detectMoneyRequest`, `detectHarassmentRisk`,
  `calculateSafetyScore`, exposés aussi via `safetyRobot`.

## 7. Logs propres
- `/api/beta` ne logue **jamais** le `contact` ; les erreurs Supabase sont
  tronquées avant log et **jamais renvoyées brutes** au client.

## 8. Pas de tracking invasif
- Aucun tracker tiers chargé par défaut. Les events analytics proposés
  (`docs/integrations.md`) sont **anonymes et orientés produit**, à activer
  explicitement.

## Checklist de revue (à repasser à chaque PR sensible)
- [ ] Aucun nouveau champ téléphone rendu côté client
- [ ] Pas de secret en `NEXT_PUBLIC_`
- [ ] Pas de payload sensible logué
- [ ] Contact toujours optionnel
- [ ] `assertNoPhoneExposure` sur les nouveaux endpoints publics
</content>
