import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Pages applicatives non destinées à l'indexation publique
      disallow: ["/admin", "/api/"],
    },
    sitemap: "https://songisongi.app/sitemap.xml",
  };
}
