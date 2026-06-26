import { CountryCode, CallMode, LanguageCode, PaymentProvider, type Country } from "@/lib/types";
import { COUNTRIES, COUNTRIES_LIST } from "./countries";

export function getCountry(code: CountryCode): Country {
  const country = COUNTRIES[code];
  if (!country) throw new Error(`Country not found: ${code}`);
  return country;
}

export function getAvailableCountries(): Country[] {
  return COUNTRIES_LIST;
}

export function getCountryModes(code: CountryCode): CallMode[] {
  return getCountry(code).modes;
}

export function getCountryLanguages(code: CountryCode): LanguageCode[] {
  return getCountry(code).languages;
}

export function getCountryPayments(code: CountryCode): PaymentProvider[] {
  return getCountry(code).payments;
}

export interface AdaptedExperience {
  tagline: string;
  cta: string;
  waitingMessage: string;
  matchedMessage: string;
  endMessage: string;
  safetyReminder: string;
  startingPrice: number;
  currency: string;
  primaryPayment: PaymentProvider;
  safetyLevel: number;
  availableModes: CallMode[];
}

export function adaptExperienceForCountry(code: CountryCode): AdaptedExperience {
  const country = getCountry(code);
  return {
    tagline: country.localTexts.tagline,
    cta: country.localTexts.cta,
    waitingMessage: country.localTexts.waitingMessage,
    matchedMessage: country.localTexts.matchedMessage,
    endMessage: country.localTexts.endMessage,
    safetyReminder: country.localTexts.safetyReminder,
    startingPrice: country.startingPrice,
    currency: country.currency,
    primaryPayment: country.payments[0],
    safetyLevel: country.safetyLevel,
    availableModes: country.modes,
  };
}

export function getDiasporaCountries(): Country[] {
  return COUNTRIES_LIST.filter((c) => c.isDiaspora);
}

export function getHomelandCountries(): Country[] {
  return COUNTRIES_LIST.filter((c) => !c.isDiaspora);
}

export function getCountriesByLanguage(lang: LanguageCode): Country[] {
  return COUNTRIES_LIST.filter((c) => c.languages.includes(lang));
}

export function getCountriesByMode(mode: CallMode): Country[] {
  return COUNTRIES_LIST.filter((c) => c.modes.includes(mode));
}

export function formatPhoneForCountry(phone: string, code: CountryCode): string {
  const country = getCountry(code);
  const cleaned = phone.replace(/\D/g, "");
  return `${country.phonePrefix}${cleaned}`;
}

export { COUNTRIES, COUNTRIES_LIST };
