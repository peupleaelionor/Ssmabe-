/**
 * Mabé Country Brain — façade
 * --------------------------------------------------------------
 * Point d'entrée unique pour adapter l'expérience pays par pays.
 * Re-exporte la configuration et les helpers du module country-brain
 * afin que le reste du produit n'importe que depuis `@/lib/mabe`.
 */
export {
  getCountry,
  getAvailableCountries,
  getCountryModes,
  getCountryLanguages,
  getCountryPayments,
  adaptExperienceForCountry,
  getDiasporaCountries,
  getHomelandCountries,
  getCountriesByLanguage,
  getCountriesByMode,
  formatPhoneForCountry,
  type AdaptedExperience,
} from "@/lib/country-brain";

export { COUNTRIES, COUNTRIES_LIST } from "@/lib/country-brain/countries";
