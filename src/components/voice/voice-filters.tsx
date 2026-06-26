"use client";

import { CallMode, CountryCode, LanguageCode } from "@/lib/types";
import { useAppStore } from "@/lib/store";
import { COUNTRIES_LIST } from "@/lib/country-brain/countries";
import { LANGUAGES_LIST } from "@/lib/language-brain/languages";
import { MODES_LIST } from "@/lib/constants/modes";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface VoiceFiltersProps {
  showMode?: boolean;
  showCountry?: boolean;
  showLanguage?: boolean;
  compact?: boolean;
}

export function VoiceFilters({
  showMode = true,
  showCountry = true,
  showLanguage = true,
  compact = false,
}: VoiceFiltersProps) {
  const {
    selectedCountry,
    selectedLanguage,
    selectedMode,
    setSelectedCountry,
    setSelectedLanguage,
    setSelectedMode,
  } = useAppStore();

  const availableLanguages = LANGUAGES_LIST.filter((l) =>
    l.countries.includes(selectedCountry)
  );

  const availableModes = MODES_LIST.filter((m) =>
    m.availableCountries.includes(selectedCountry)
  );

  return (
    <div className={compact ? "flex gap-2 flex-wrap" : "flex flex-col gap-3"}>
      {showCountry && (
        <div>
          {!compact && (
            <label className="text-xs text-gris-texte mb-1.5 block font-medium">
              Pays
            </label>
          )}
          <Select
            value={selectedCountry}
            onValueChange={(v) => setSelectedCountry(v as CountryCode)}
          >
            <SelectTrigger className={compact ? "w-auto min-w-[140px]" : "w-full"}>
              <SelectValue>
                <span>
                  {COUNTRIES_LIST.find((c) => c.code === selectedCountry)?.flag}{" "}
                  {COUNTRIES_LIST.find((c) => c.code === selectedCountry)?.name}
                </span>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {COUNTRIES_LIST.map((country) => (
                <SelectItem key={country.code} value={country.code}>
                  {country.flag} {country.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {showLanguage && (
        <div>
          {!compact && (
            <label className="text-xs text-gris-texte mb-1.5 block font-medium">
              Langue
            </label>
          )}
          <Select
            value={selectedLanguage}
            onValueChange={(v) => setSelectedLanguage(v as LanguageCode)}
          >
            <SelectTrigger className={compact ? "w-auto min-w-[120px]" : "w-full"}>
              <SelectValue>
                <span>
                  {LANGUAGES_LIST.find((l) => l.code === selectedLanguage)?.nameLocal}
                </span>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {availableLanguages.map((lang) => (
                <SelectItem key={lang.code} value={lang.code}>
                  {lang.flag} {lang.nameLocal}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {showMode && (
        <div>
          {!compact && (
            <label className="text-xs text-gris-texte mb-1.5 block font-medium">
              Ambiance
            </label>
          )}
          <Select
            value={selectedMode}
            onValueChange={(v) => setSelectedMode(v as CallMode)}
          >
            <SelectTrigger className={compact ? "w-auto min-w-[130px]" : "w-full"}>
              <SelectValue>
                <span>
                  {MODES_LIST.find((m) => m.id === selectedMode)?.icon}{" "}
                  {MODES_LIST.find((m) => m.id === selectedMode)?.label}
                </span>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {availableModes.map((mode) => (
                <SelectItem key={mode.id} value={mode.id}>
                  {mode.icon} {mode.label}
                  {mode.free && (
                    <span className="ml-2 text-xs text-vert-light">(gratuit)</span>
                  )}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
}
