# Parcours utilisateur — Songi Songi Mabé

4 parcours implémentés, pilotés par query params sur `/beta`.

## A. Nouveau visiteur
Home → promesse (« Né à Kinshasa. Pensé pour toutes les communautés. ») →
CTA hero `/beta?source=hero` → formulaire → succès générique → prochaines étapes.

## B. Créateur
Home ou `/createurs` → « Rejoindre comme créateur » →
`/beta?type=createur&source=creators-page` → profil prérempli **Créateur** →
succès : « Bienvenue dans la première vague. Ton espace créateur est bien préparé. »

## C. Diaspora
`/diaspora` → carte France/Belgique/Canada/UK/USA →
`/beta?type=diaspora&country=France&source=diaspora-page` → pays + profil préremplis →
succès : « Bienvenue. Ta communauté diaspora est bien prise en compte. »

## D. Utilisateur local
Home (Communautés en action) ou `/communautes` → carte Kinshasa/Goma/… →
`/beta?community=kinshasa&source=community-card` → ville + pays + communauté préremplis →
succès : « Bienvenue. Ta communauté locale est bien enregistrée pour la bêta. »

## Query params supportés
`type` (userTypes) · `community` (id config/communities) · `country` · `city` · `source` (analytics).
