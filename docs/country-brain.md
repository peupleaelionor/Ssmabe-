# Country Brain – Documentation

## Vue d'ensemble

Le **Country Brain** est le module d'adaptation culturelle de Songi Songi Mabé. Il permet à chaque expérience d'être personnalisée en fonction du pays de l'utilisateur : langue, paiement, modes disponibles, prix, ton marketing.

## Principes

1. **Pas un seul produit universel** : L'expérience à Kinshasa n'est pas la même qu'à Paris
2. **Payments natifs** : M-Pesa est le premier mode de paiement pour l'Afrique, pas Stripe
3. **Textes locaux** : Chaque pays a ses propres messages, taglines et call-to-actions
4. **Modes disponibles** : Certains modes ne sont disponibles que dans certains pays

## Structure Country

```typescript
interface Country {
  code: CountryCode;           // "CD", "FR", etc.
  name: string;                // "République Démocratique du Congo"
  nameLocal: string;           // "Republiki ya Kongo Demokratiki"
  flag: string;                // "🇨🇩"
  currency: string;            // "CDF"
  phonePrefix: string;         // "+243"
  languages: LanguageCode[];   // ["fr", "ln", "sw", "kg", "lu"]
  cities: string[];            // ["Kinshasa", "Lubumbashi", ...]
  payments: PaymentProvider[]; // [MPESA, AIRTEL_MONEY, ...]
  modes: CallMode[];           // Modes disponibles dans ce pays
  safetyLevel: number;         // 1-5
  marketingTone: string;       // "pride" | "warmth" | "trust" | "aspiration"
  localTexts: LocalTexts;      // Textes personnalisés
  startingPrice: number;       // Prix d'entrée en devise locale
  matchingRules: MatchingRules;
  isDiaspora: boolean;
  homelandCodes?: CountryCode[]; // Si diaspora, pays d'origine
}
```

## Pays et leurs spécificités

### 🇨🇩 RDC (Code : CD)
- **Langue principale** : Français + Lingala + Swahili + Kikongo + Tshiluba
- **Paiements** : M-Pesa (Vodacom), Airtel Money, Orange Money
- **Modes** : Tous les 7 modes disponibles
- **Villes** : Kinshasa, Lubumbashi, Mbuji-Mayi, Goma, Bukavu
- **Ton marketing** : Fierté congolaise
- **Prix** : 500 CDF pour le pack Découverte

### 🇨🇬 Congo-Brazza (Code : CG)
- **Langue principale** : Français + Lingala + Kikongo
- **Paiements** : Airtel Money, MTN Money, Orange Money
- **Modes** : 6 modes (pas Diaspora)
- **Prix** : 200 XAF

### 🇫🇷 France (Code : FR)
- **Statut** : Pays diaspora → homeland : CD, CG
- **Langue** : Français + Lingala
- **Paiements** : Stripe, PayPal, Paylib
- **Modes** : Diaspora en priorité + autres
- **Prix** : 1.99 EUR

### 🇧🇪 Belgique (Code : BE)
- **Statut** : Pays diaspora → homeland : CD, CG
- **Villes** : Bruxelles, Liège, Charleroi
- **Prix** : 1.99 EUR

### 🇨🇦 Canada (Code : CA)
- **Statut** : Pays diaspora → homeland : CD, CG
- **Villes** : Montréal, Toronto, Ottawa
- **Paiements** : Stripe, PayPal, Interac
- **Prix** : 2.49 CAD

### 🇨🇮 Côte d'Ivoire (Code : CI)
- **Paiements** : Orange Money, MTN Money, Wave
- **Prix** : 200 XOF

### 🇨🇲 Cameroun (Code : CM)
- **Langues** : Français + Anglais
- **Paiements** : MTN Money, Orange Money
- **Prix** : 200 XAF

### 🇸🇳 Sénégal (Code : SN)
- **Paiements** : Orange Money, Wave, PayPal
- **Ton** : Térangea (hospitalité sénégalaise)
- **Prix** : 200 XOF

## Fonctions principales

```typescript
getCountry(code)           // Récupère un pays
getAvailableCountries()    // Liste tous les pays
getCountryModes(code)      // Modes disponibles dans un pays
getCountryLanguages(code)  // Langues disponibles dans un pays
getCountryPayments(code)   // Paiements dans un pays
adaptExperienceForCountry(code) // Adapte l'UI au pays
getDiasporaCountries()     // France, Belgique, Canada
getHomelandCountries()     // CD, CG, CI, CM, SN
```

## Extensibilité

Pour ajouter un nouveau pays :
1. Ajouter le code dans l'enum `CountryCode`
2. Créer l'objet `Country` dans `countries.ts`
3. Ajouter les textes locaux dans `localTexts`
4. Configurer les paiements dans `payments`
5. Définir les modes disponibles
6. (Optionnel) Créer des campagnes marketing spécifiques
