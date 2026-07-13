/*
 * Service Worker — Songi Songi Mabé
 * Stratégies conservatrices, pensées pour les réseaux instables (Afrique-first) :
 *  - Navigations : network-first → si hors-ligne, page /offline précachée.
 *  - Assets statiques (_next/static, /brand, /avatars, images, polices) :
 *    stale-while-revalidate.
 *  - /api/ : jamais interceptée (toujours le réseau).
 *  - GET same-origin uniquement.
 * En ligne, l'utilisateur voit toujours du contenu frais (network-first nav).
 */
const VERSION = "ssmabe-v2";
const PRECACHE = "precache-" + VERSION;
const RUNTIME = "runtime-" + VERSION;
const OFFLINE_URL = "/offline";

const PRECACHE_URLS = [
  OFFLINE_URL,
  "/manifest.json",
  "/brand/app-icon-192.png",
  "/brand/app-icon-512.png",
  "/favicon.svg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(PRECACHE);
      await cache.addAll(PRECACHE_URLS);
      await self.skipWaiting();
    })()
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys.filter((k) => !k.endsWith(VERSION)).map((k) => caches.delete(k))
      );
      await self.clients.claim();
    })()
  );
});

self.addEventListener("message", (event) => {
  if (event.data === "SKIP_WAITING") self.skipWaiting();
});

function isStaticAsset(url, req) {
  const dest = req.destination;
  if (dest === "style" || dest === "script" || dest === "image" || dest === "font") return true;
  return (
    url.pathname.startsWith("/_next/static") ||
    url.pathname.startsWith("/avatars") ||
    url.pathname.startsWith("/brand")
  );
}

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  let url;
  try {
    url = new URL(req.url);
  } catch (_e) {
    return;
  }
  if (url.origin !== self.location.origin) return; // same-origin only
  if (url.pathname.startsWith("/api/")) return; // ne jamais toucher l'API

  // Navigations : network-first, repli /offline.
  if (req.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          return await fetch(req);
        } catch (_e) {
          const cache = await caches.open(PRECACHE);
          const offline = await cache.match(OFFLINE_URL);
          return offline || Response.error();
        }
      })()
    );
    return;
  }

  // Assets statiques : stale-while-revalidate.
  if (isStaticAsset(url, req)) {
    event.respondWith(
      (async () => {
        // Cherche dans TOUS les caches (RUNTIME + PRECACHE) — les assets
        // précachés (icônes) restent servis hors-ligne.
        const cached = await caches.match(req);
        const network = fetch(req)
          .then((res) => {
            if (res && res.status === 200 && res.type === "basic") {
              caches.open(RUNTIME).then((c) => c.put(req, res.clone()));
            }
            return res;
          })
          .catch(() => cached);
        return cached || network;
      })()
    );
  }
  // sinon : passthrough réseau par défaut.
});
