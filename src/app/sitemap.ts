import type { MetadataRoute } from "next";
import { env } from "@/lib/env";

/**
 * Sitemap — mêmes domaine et sources que metadataBase (env.siteUrl), listant
 * uniquement les pages publiques réellement servies. Les écrans applicatifs
 * (/home, /admin, /wallet, /onboarding, /call) restent hors index.
 */
const BASE = env.siteUrl;

type Entry = { path: string; priority: number; freq: MetadataRoute.Sitemap[number]["changeFrequency"] };

const PAGES: Entry[] = [
  { path: "/", priority: 1, freq: "weekly" },
  { path: "/pricing", priority: 0.8, freq: "monthly" },
  { path: "/communautes", priority: 0.8, freq: "weekly" },
  { path: "/beta", priority: 0.7, freq: "monthly" },
  { path: "/diaspora", priority: 0.7, freq: "monthly" },
  { path: "/createurs", priority: 0.7, freq: "monthly" },
  { path: "/create", priority: 0.6, freq: "monthly" },
  { path: "/voice", priority: 0.6, freq: "monthly" },
  { path: "/a-propos", priority: 0.6, freq: "monthly" },
  { path: "/blog", priority: 0.6, freq: "weekly" },
  { path: "/contact", priority: 0.6, freq: "monthly" },
  { path: "/safety", priority: 0.6, freq: "monthly" },
  { path: "/discussions", priority: 0.5, freq: "weekly" },
  { path: "/applications", priority: 0.5, freq: "monthly" },
  { path: "/lite", priority: 0.5, freq: "monthly" },
  { path: "/demo", priority: 0.5, freq: "monthly" },
  { path: "/privacy", priority: 0.3, freq: "yearly" },
  { path: "/terms", priority: 0.3, freq: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return PAGES.map(({ path, priority, freq }) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: freq,
    priority,
  }));
}
