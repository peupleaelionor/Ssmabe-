# Songi Songi Mabé – Roadmap Produit

## V1 – MVP (Bêta Privée) · T1 2025

**Objectif** : Valider le concept avec 500 utilisateurs sélectionnés

### Features
- [x] Onboarding 5 étapes (pays, langue, mode, âge, pseudo)
- [x] 7 modes d'ambiance
- [x] Matching vocal mock → WebRTC réel
- [x] Double consentement en fin d'appel
- [x] Numéro toujours caché
- [x] Signalement et blocage
- [x] Wallet crédits (packs Afrique et Diaspora)
- [x] 8 pays (CD, CG, FR, BE, CA, CI, CM, SN)
- [x] 5 langues (fr, ln, sw, kg, lu)
- [x] Admin dashboard basique
- [x] Score de confiance

### Paiements V1
- M-Pesa (Vodacom Congo)
- Airtel Money
- Stripe (diaspora)

### Cible
- 🇨🇩 Kinshasa-centrique
- Focus 18-35 ans
- 500 bêta-testeurs sélectionnés

---

## V2 – Lancement Public · T2-T3 2025

**Objectif** : 10 000 utilisateurs actifs, premières revenues

### Features
- [ ] Authentification téléphone + OTP (Twilio/Africa's Talking)
- [ ] WebRTC réel (LiveKit ou Agora)
- [ ] Filtre de voix (modulation légère pour anonymat accru)
- [ ] Score de confiance public
- [ ] Bons de parrainage (referral)
- [ ] Mode Nuit avec restriction horaire automatique
- [ ] Push notifications (match trouvé, bêta ouverte)
- [ ] PWA installable (iOS + Android)

### Paiements V2
- Orange Money
- MTN Money
- Wave (Sénégal)
- PayPal
- Interac (Canada)

### Expansions géographiques
- 🇰🇪 Kenya (Swahili, M-Pesa Safaricom)
- 🇳🇬 Nigeria (Anglais, Yoruba, Hausa)
- 🇹🇿 Tanzanie (Swahili)
- 🇬🇧 Royaume-Uni (diaspora)

### Nouvelles langues
- Yoruba
- Hausa
- Anglais élargi

---

## V3 – Scale & Monétisation · T4 2025

**Objectif** : 100 000 utilisateurs, profitabilité

### Features
- [ ] Intelligence artificielle de matching (ML sur historique)
- [ ] Songi Premium (abonnement mensuel)
- [ ] Appels de groupe (3-5 personnes, mode "Lounge")
- [ ] Événements vocaux live (concerts lingala, débats)
- [ ] Vérification d'identité (optionnel, badge vérifié)
- [ ] Mode "Séries" : Se retrouver avec la même voix sur plusieurs jours
- [ ] Traduction en temps réel (lingala ↔ français)
- [ ] API pour développeurs tiers

### Partenariats cibles
- Médias musicaux lingala (Radio Okapi, etc.)
- Apps de mobile money (Vodacom, Airtel)
- ONG (connexion diaspora pour soutien aux familles)

### Métriques V3 targets
- MAU : 100 000
- Revenus mensuels : $50 000+
- Ratio femmes : 45%
- NPS : 65+
- Countries : 12+

---

## V4 – Expansion africaine · 2026

**Objectif** : Plateforme vocale de référence en Afrique francophone

### Features
- [ ] Songi Pay (wallet interne multi-devises)
- [ ] Appels vidéo opt-in (avec floutage automatique)
- [ ] Mode "Diaspora Pro" (coaching vocal, réseautage)
- [ ] Podcasts communautaires
- [ ] Mode "Famille" (connexion diaspora avec famille restée au pays)

### Marchés V4
- Afrique centrale complète
- Afrique de l'Ouest francophone
- Présence en Europe complète
- Exploration Amérique du Sud (diaspora congolaise au Brésil)

---

## Principes de développement

1. **Congo First** : Toute feature est testée à Kinshasa avant d'être déployée ailleurs
2. **Safety by Design** : Aucune feature ne peut contourner la protection du numéro
3. **Offline First** : Les fonctionnalités critiques doivent marcher avec 2G (réseau faible)
4. **Local First** : M-Pesa avant Stripe. Lingala avant l'anglais.
5. **No Dark Patterns** : Pas d'abonnement caché, pas de manipulation de UI

---

## Anti-roadmap (Ce qu'on ne fera PAS)

- Photos de profil (jamais – c'est notre différenciation)
- Swipe à la Tinder
- Fil d'actualité / posts
- Messagerie texte permanente
- Publicités intrusives pendant les appels
- Vente des données utilisateurs
- Gamification toxique (likes, "likes cachés", etc.)
