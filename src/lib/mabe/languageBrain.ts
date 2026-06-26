/**
 * Mabé Language Brain — façade
 * --------------------------------------------------------------
 * Gère les langues disponibles, les labels et les textes locaux.
 */
export {
  getLanguage,
  getAvailableLanguages,
  getLanguagesForCountry,
  getLabel,
  translate,
} from "@/lib/language-brain";

export { LANGUAGES, LANGUAGES_LIST } from "@/lib/language-brain/languages";
