import { LanguageCode, CountryCode, type Language } from "@/lib/types";

export const LANGUAGES: Record<LanguageCode, Language> = {
  [LanguageCode.FR]: {
    code: LanguageCode.FR,
    name: "Français",
    nameLocal: "Français",
    flag: "🇫🇷",
    countries: [
      CountryCode.CD,
      CountryCode.CG,
      CountryCode.FR,
      CountryCode.BE,
      CountryCode.CA,
      CountryCode.CI,
      CountryCode.CM,
      CountryCode.SN,
    ],
    rtl: false,
  },

  [LanguageCode.LN]: {
    code: LanguageCode.LN,
    name: "Lingala",
    nameLocal: "Lingála",
    flag: "🎵",
    countries: [
      CountryCode.CD,
      CountryCode.CG,
      CountryCode.FR,
      CountryCode.BE,
      CountryCode.CA,
    ],
    rtl: false,
  },

  [LanguageCode.SW]: {
    code: LanguageCode.SW,
    name: "Swahili",
    nameLocal: "Kiswahili",
    flag: "🌍",
    countries: [CountryCode.CD, CountryCode.KE],
    rtl: false,
  },

  [LanguageCode.KG]: {
    code: LanguageCode.KG,
    name: "Kikongo",
    nameLocal: "Kikongo",
    flag: "🌿",
    countries: [CountryCode.CD, CountryCode.CG],
    rtl: false,
  },

  [LanguageCode.LU]: {
    code: LanguageCode.LU,
    name: "Tshiluba",
    nameLocal: "Tshiluba",
    flag: "💎",
    countries: [CountryCode.CD],
    rtl: false,
  },

  [LanguageCode.EN]: {
    code: LanguageCode.EN,
    name: "English",
    nameLocal: "English",
    flag: "🇬🇧",
    countries: [CountryCode.CA, CountryCode.CM, CountryCode.NG, CountryCode.KE],
    rtl: false,
  },

  [LanguageCode.PT]: {
    code: LanguageCode.PT,
    name: "Portugais",
    nameLocal: "Português",
    flag: "🇵🇹",
    countries: [],
    rtl: false,
  },

  [LanguageCode.AR]: {
    code: LanguageCode.AR,
    name: "Arabic",
    nameLocal: "العربية",
    flag: "🌙",
    countries: [CountryCode.MA, CountryCode.DZ],
    rtl: true,
  },
};

export const LANGUAGES_LIST = Object.values(LANGUAGES);
