/**
 * Config pays — façade sur le Country Brain + ordre de déploiement marché.
 * La logique par pays vit dans lib/country-brain ; ici on ne définit que
 * la stratégie de rollout et les marchés cibles de la landing.
 */
import { CountryCode } from "@/lib/types";

export { COUNTRIES_LIST } from "@/lib/country-brain/countries";

/** Ordre de lancement : RDC-first, puis diaspora, puis Afrique francophone. */
export const ROLLOUT_WAVES: { wave: number; label: string; countries: CountryCode[] }[] = [
  { wave: 1, label: "Cœur", countries: [CountryCode.CD, CountryCode.CG] },
  { wave: 2, label: "Diaspora", countries: [CountryCode.FR, CountryCode.BE, CountryCode.CA] },
  { wave: 3, label: "Afrique francophone", countries: [CountryCode.CI, CountryCode.SN, CountryCode.CM] },
  { wave: 4, label: "Extension", countries: [CountryCode.MA, CountryCode.DZ, CountryCode.NG, CountryCode.KE] },
];

/** Villes mises en avant sur la landing (RDC-first). */
export const FEATURED_CITIES = [
  { name: "Kinshasa", country: CountryCode.CD },
  { name: "Goma", country: CountryCode.CD },
  { name: "Lubumbashi", country: CountryCode.CD },
  { name: "Mbandaka", country: CountryCode.CD },
  { name: "Brazzaville", country: CountryCode.CG },
];
