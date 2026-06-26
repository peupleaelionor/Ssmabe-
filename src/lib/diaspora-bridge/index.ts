import { CountryCode, type Country } from "@/lib/types";
import { COUNTRIES, COUNTRIES_LIST } from "@/lib/country-brain/countries";

export interface DiasporaBridgeConnection {
  diasporaCountry: Country;
  homelandCountry: Country;
  estimatedLatencyMs: number;
  bridgeStrength: "strong" | "medium" | "weak";
}

export function getDiasporaCountries(): Country[] {
  return COUNTRIES_LIST.filter((c) => c.isDiaspora);
}

export function getHomelandCountries(): Country[] {
  return COUNTRIES_LIST.filter((c) => !c.isDiaspora);
}

export function getHomelandFromDiaspora(diasporaCode: CountryCode): Country[] {
  const diaspora = COUNTRIES[diasporaCode];
  if (!diaspora?.isDiaspora || !diaspora.homelandCodes) return [];
  return diaspora.homelandCodes.map((code) => COUNTRIES[code]).filter(Boolean);
}

export function connectDiaspora(
  diasporaCode: CountryCode,
  homelandCode: CountryCode
): DiasporaBridgeConnection | null {
  const diaspora = COUNTRIES[diasporaCode];
  const homeland = COUNTRIES[homelandCode];

  if (!diaspora || !homeland) return null;
  if (!diaspora.isDiaspora) return null;
  if (!diaspora.homelandCodes?.includes(homelandCode)) return null;

  // Estimate latency based on continent pairs
  const latencyMap: Record<string, number> = {
    "FR-CD": 180,
    "FR-CG": 175,
    "BE-CD": 170,
    "BE-CG": 168,
    "CA-CD": 220,
    "CA-CG": 215,
  };

  const key = `${diasporaCode}-${homelandCode}`;
  const latency = latencyMap[key] ?? 200;

  const bridgeStrength: DiasporaBridgeConnection["bridgeStrength"] =
    latency < 180 ? "strong" : latency < 210 ? "medium" : "weak";

  return {
    diasporaCountry: diaspora,
    homelandCountry: homeland,
    estimatedLatencyMs: latency,
    bridgeStrength,
  };
}

export function isDiasporaCountry(code: CountryCode): boolean {
  return COUNTRIES[code]?.isDiaspora ?? false;
}

export function getCompatiblePairings(): Array<{ diaspora: CountryCode; homeland: CountryCode }> {
  const pairs: Array<{ diaspora: CountryCode; homeland: CountryCode }> = [];

  for (const country of getDiasporaCountries()) {
    if (country.homelandCodes) {
      for (const homeland of country.homelandCodes) {
        pairs.push({ diaspora: country.code, homeland });
      }
    }
  }

  return pairs;
}
