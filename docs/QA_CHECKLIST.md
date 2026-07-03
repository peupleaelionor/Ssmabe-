# QA Checklist (avant chaque release)

## Commandes
- [ ] `npm run lint` (0 erreur ; warnings tolérés)
- [ ] `npm run typecheck` (0 erreur)
- [ ] `npm test` (smoke 7/7)
- [ ] `npm run build` (0 erreur)

## Mobile (390px et 360px)
- [ ] aucun scroll horizontal (mesurer scrollWidth)
- [ ] hero tient sur le premier écran
- [ ] menu mobile ouvre/ferme (clic + Échap)
- [ ] CTA visibles, formulaire /beta utilisable

## Parcours
- [ ] /beta soumission avec et sans téléphone
- [ ] /beta?type=createur → profil prérempli + message créateur
- [ ] /beta?community=kinshasa → ville/pays préremplis + message local
- [ ] carte communauté → /beta prérempli
- [ ] /contact envoi message

## Routes (aucune 404)
/ /beta /communautes /createurs /diaspora /discussions /applications
/a-propos /blog /contact /privacy /terms /api/health

## SEO / marque
- [ ] favicon bulles, OG image /brand/og-ssmabe-brand.png
- [ ] title/description à jour, manifest 192/512
- [ ] footer : bon build sha
