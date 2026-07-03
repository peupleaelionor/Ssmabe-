import { fr, type Content } from "./fr";
import { en } from "./en";
import { ln } from "./ln";

export type Locale = "fr" | "en" | "ln";

export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

/** Fusion superficielle profonde : les trous du partiel retombent sur la base. */
function mergeContent(base: Content, partial: DeepPartial<Content>): Content {
  const out = structuredClone(base) as Record<string, unknown>;
  const merge = (target: Record<string, unknown>, source: Record<string, unknown>) => {
    for (const [key, value] of Object.entries(source)) {
      if (value && typeof value === "object" && !Array.isArray(value) && typeof target[key] === "object") {
        merge(target[key] as Record<string, unknown>, value as Record<string, unknown>);
      } else if (value !== undefined) {
        target[key] = value;
      }
    }
  };
  merge(out, partial as Record<string, unknown>);
  return out as unknown as Content;
}

const CONTENT: Record<Locale, Content> = {
  fr,
  en,
  ln: mergeContent(fr, ln),
};

/** Point d'entrée i18n. La landing rend "fr" aujourd'hui. */
export function getContent(locale: Locale = "fr"): Content {
  return CONTENT[locale] ?? fr;
}

export { fr, en };
export type { Content };
