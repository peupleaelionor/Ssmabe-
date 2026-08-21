"use client";

import * as React from "react";
import { getContent, type Content, type Locale } from "@/content";

const KEY = "ssmabe.locale";
export const LOCALES: Locale[] = ["fr", "ln", "en"];
export const LOCALE_LABELS: Record<Locale, string> = { fr: "Français", ln: "Lingala", en: "English" };
export const LOCALE_SHORT: Record<Locale, string> = { fr: "FR", ln: "LN", en: "EN" };

interface LocaleCtx {
  locale: Locale;
  setLocale: (l: Locale) => void;
}

const Ctx = React.createContext<LocaleCtx>({ locale: "fr", setLocale: () => {} });

/**
 * Provider i18n runtime. SSR/statique rend "fr" ; au montage, on applique la
 * préférence enregistrée (cookie/localStorage). Le contenu vient de getContent
 * (en = complet, ln = fusionné sur fr → aucune clé manquante).
 */
export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = React.useState<Locale>("fr");

  React.useEffect(() => {
    try {
      const s = localStorage.getItem(KEY);
      if (s === "fr" || s === "ln" || s === "en") {
        setLocaleState(s);
        document.documentElement.lang = s;
      }
    } catch {
      /* stockage indisponible */
    }
  }, []);

  const setLocale = React.useCallback((l: Locale) => {
    setLocaleState(l);
    try {
      localStorage.setItem(KEY, l);
      document.cookie = `ssmabe_locale=${l};path=/;max-age=31536000;samesite=lax`;
      document.documentElement.lang = l;
    } catch {
      /* ignore */
    }
  }, []);

  return <Ctx.Provider value={{ locale, setLocale }}>{children}</Ctx.Provider>;
}

export function useLocale(): LocaleCtx {
  return React.useContext(Ctx);
}

/** Contenu localisé réactif. Remplace `const c = getContent("fr")`. */
export function useContent(): Content {
  return getContent(useLocale().locale);
}
