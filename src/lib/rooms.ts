/**
 * Rooms — slug public partageable (ex. /r/kin-la-nuit). Pas de DB pour le MVP :
 * le slug EST le nom de room LiveKit. Titre dérivé du slug (ou config connue).
 */
const KNOWN: Record<string, string> = {
  "kin-la-nuit": "Kin la nuit",
  "bana-paris": "Bana Paris",
  "rdc-football": "RDC Football",
  "lingala-seulement": "Lingala seulement",
};

/** Slug sûr : minuscules, chiffres, tirets. */
export function normalizeSlug(raw: string): string {
  return raw
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64);
}

export function slugToTitle(slug: string): string {
  const s = normalizeSlug(slug);
  if (KNOWN[s]) return KNOWN[s];
  const t = s.replace(/-/g, " ").trim();
  return t ? t.charAt(0).toUpperCase() + t.slice(1) : "Conversation";
}
