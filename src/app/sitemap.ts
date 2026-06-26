import type { MetadataRoute } from "next";

const BASE = "https://songisongi.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/demo`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/safety`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];
}
