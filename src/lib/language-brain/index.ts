import { LanguageCode, CountryCode, type Language } from "@/lib/types";
import { LANGUAGES, LANGUAGES_LIST } from "./languages";

export function getLanguage(code: LanguageCode): Language {
  const lang = LANGUAGES[code];
  if (!lang) throw new Error(`Language not found: ${code}`);
  return lang;
}

export function getAvailableLanguages(): Language[] {
  return LANGUAGES_LIST;
}

export function getLanguagesForCountry(countryCode: CountryCode): Language[] {
  return LANGUAGES_LIST.filter((l) => l.countries.includes(countryCode));
}

export function getLabel(code: LanguageCode): string {
  return LANGUAGES[code]?.name ?? code;
}

// Mock translation dictionary for key UI strings
const TRANSLATIONS: Record<string, Record<LanguageCode, string>> = {
  "find_voice": {
    [LanguageCode.FR]: "Trouver une voix",
    [LanguageCode.LN]: "Kobína ba mongó",
    [LanguageCode.SW]: "Tafuta sauti",
    [LanguageCode.KG]: "Bima maza",
    [LanguageCode.LU]: "Peta mwine wa bena",
    [LanguageCode.EN]: "Find a voice",
    [LanguageCode.PT]: "Encontrar uma voz",
  },
  "your_number_hidden": {
    [LanguageCode.FR]: "Ton numéro reste caché.",
    [LanguageCode.LN]: "Numéro na yo ezali planqué.",
    [LanguageCode.SW]: "Nambari yako imefichwa.",
    [LanguageCode.KG]: "Numéro na yo efandakana.",
    [LanguageCode.LU]: "Numéro webe wafundike.",
    [LanguageCode.EN]: "Your number stays hidden.",
    [LanguageCode.PT]: "O seu número fica escondido.",
  },
  "waiting": {
    [LanguageCode.FR]: "Recherche d'une voix compatible…",
    [LanguageCode.LN]: "Tolukaka mongó moko…",
    [LanguageCode.SW]: "Inatafuta sauti inayolingana…",
    [LanguageCode.KG]: "Tulukaka nki…",
    [LanguageCode.LU]: "Twlubisha…",
    [LanguageCode.EN]: "Searching for a matching voice…",
    [LanguageCode.PT]: "Procurando uma voz compatível…",
  },
  "end_call": {
    [LanguageCode.FR]: "Terminer l'appel",
    [LanguageCode.LN]: "Kotika appel",
    [LanguageCode.SW]: "Maliza simu",
    [LanguageCode.KG]: "Telema appel",
    [LanguageCode.LU]: "Fula appel",
    [LanguageCode.EN]: "End call",
    [LanguageCode.PT]: "Terminar chamada",
  },
};

export function translate(key: string, lang: LanguageCode = LanguageCode.FR): string {
  const dict = TRANSLATIONS[key];
  if (!dict) return key;
  return dict[lang] ?? dict[LanguageCode.FR] ?? key;
}

export { LANGUAGES, LANGUAGES_LIST };
