import type { MetadataRoute } from "next";
import { env } from "@/lib/env";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Écrans applicatifs et endpoints non destinés à l'indexation publique
      disallow: ["/api/", "/admin", "/home", "/wallet", "/onboarding", "/call"],
    },
    sitemap: `${env.siteUrl}/sitemap.xml`,
    host: env.siteUrl,
  };
}
