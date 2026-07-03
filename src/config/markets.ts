/** Marchés cibles — façade sur country-brain + vagues de rollout. */
export { COUNTRIES_LIST } from "@/lib/country-brain/countries";
export { ROLLOUT_WAVES, FEATURED_CITIES } from "@/config/countries";

export const DIASPORA_MARKETS = [
  { id: "france", label: "France", flag: "🇫🇷" },
  { id: "belgique", label: "Belgique", flag: "🇧🇪" },
  { id: "canada", label: "Canada", flag: "🇨🇦" },
  { id: "uk", label: "Royaume-Uni", flag: "🇬🇧" },
  { id: "usa", label: "États-Unis", flag: "🇺🇸" },
] as const;
