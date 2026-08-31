# Simplicity Audit — Songi Songi (core loop first)

Objectif : un nouvel utilisateur comprend Songi en **< 5 secondes** et sent
« quelqu'un m'envoie un lien → je clique → j'entends des gens parler ».
Règle : **UNE PAGE = UNE INTENTION**. Simplifier avant d'ajouter.

## Ce qui bloque la compréhension en < 5 s (aujourd'hui)
1. **La home enchaîne ~15 sections** → surcharge. L'intention unique
   (« entre et parle ») se dilue. → *mitigé* par l'action persistante StickyEnter.
2. **Le hero propose 4 CTA de poids égal** (Appel / WhatsApp / Entrer / Créer)
   → surcharge de choix. Le core loop veut **UNE action dominante**.
3. **Aucune preuve immédiate de vie vocale** — on décrit le produit, on ne
   montre pas « une conversation que tu peux rejoindre maintenant ». (À venir
   avec le MVP vocal ; interdiction de fabriquer un faux « live ».)

## Classement des routes utilisateur
| Route | Verdict |
|---|---|
| `/` (home) | **Essentiel** mais trop chargé → réduire à 1 intention |
| `/beta` | **Essentiel** (capture) |
| `/communautes` | Utile (découverte) — sera le tremplin vers les rooms |
| `/lite` | **Essentiel** (Africa low-data) |
| `/pricing` | Utile plus tard |
| `/create` `/voice` | Essentiels au futur core loop (à recentrer sur la room) |
| `/diaspora` `/createurs` | Utiles plus tard (segments) |
| `/a-propos` `/blog` `/contact` `/privacy` `/terms` | Utiles (confiance/légal) |
| `/discussions` `/applications` | Redondants / à réévaluer |
| `/about` `/features` | Redirections SEO (ok) |
| `(app)/*` (home/call/wallet/admin/onboarding/demo) | **Mock** → déjà 404 en prod (flag) |

## Classement des sections de la home
- **Essentiel** : Hero (à réduire à 1 action), CTA bêta finale.
- **Utile** : Vibes/Ambiances, Communautés, ForWho, Sovereignty (confiance), FAQ.
- **Redondant** (chevauche Hero/ForWho) : PositioningBand, Why, Difference, JoinAnyway.
- **Décoratif** : WorldBand (bande photo), Roadmap.
- **Trompeur/mock** : ~~compteur 1284~~ (corrigé → chiffre réel), aucun faux live.

## Reco de simplification (à valider avant exécution — décision produit)
1. **Hero : 1 action dominante** « Entrer » + les autres canaux en secondaire
   discret (pas 4 boutons égaux).
2. **Fusionner/retirer les sections redondantes** (Why + Difference + PositioningBand
   → un seul bloc « Pourquoi Songi »).
3. **Home = 1 intention** : entrer et parler. Le marketing détaillé descend
   sous la ligne de flottaison ou part sur des pages dédiées.

> Rien n'est supprimé à l'aveugle : ces coupes touchent du contenu validé, donc
> elles attendent ton feu vert. Le reste (StickyEnter, faux compteur, écrans
> mock fermés) est déjà fait.

## Nord de l'expérience
**TIME TO FIRST VOICE** = temps entre `landing_view`/`room_view` et
`first_audio_received`. Instrumenté (voir analytics). Tout le produit doit
tendre à le réduire.
