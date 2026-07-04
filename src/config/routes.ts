/** Routes publiques — source unique pour nav, footer, sitemap. */
export const ROUTES = [
  { path: "/", label: "Accueil", nav: false, footer: false },
  { path: "/communautes", label: "Communautés", nav: true, footer: true },
  { path: "/discussions", label: "Discussions", nav: false, footer: true },
  { path: "/createurs", label: "Créateurs", nav: true, footer: true },
  { path: "/diaspora", label: "Diaspora", nav: true, footer: true },
  { path: "/applications", label: "Applications", nav: false, footer: true },
  { path: "/a-propos", label: "À propos", nav: false, footer: true },
  { path: "/blog", label: "Blog", nav: false, footer: false },
  { path: "/contact", label: "Contact", nav: false, footer: true },
  { path: "/beta", label: "Bêta", nav: true, footer: true },
  { path: "/lite", label: "Mode léger", nav: false, footer: true },
  { path: "/pricing", label: "Offres", nav: true, footer: true },
  { path: "/privacy", label: "Confidentialité", nav: false, footer: true },
  { path: "/terms", label: "Conditions", nav: false, footer: true },
] as const;

export const NAV_ROUTES = ROUTES.filter((r) => r.nav);
export const FOOTER_ROUTES = ROUTES.filter((r) => r.footer);
