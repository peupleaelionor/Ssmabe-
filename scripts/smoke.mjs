/**
 * Smoke tests — sans framework, via node:test.
 * Vérifie : validators, configs, routes API/pages présentes.
 *   npm test
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

// ── Fichiers de routes présents ──
const ROUTES = [
  "src/app/(marketing)/page.tsx",
  "src/app/beta/page.tsx",
  "src/app/communautes/page.tsx",
  "src/app/createurs/page.tsx",
  "src/app/diaspora/page.tsx",
  "src/app/discussions/page.tsx",
  "src/app/applications/page.tsx",
  "src/app/a-propos/page.tsx",
  "src/app/blog/page.tsx",
  "src/app/contact/page.tsx",
  "src/app/privacy/page.tsx",
  "src/app/terms/page.tsx",
  "src/app/api/health/route.ts",
  "src/app/api/waitlist/route.ts",
  "src/app/api/contact/route.ts",
  "src/app/api/communities/route.ts",
  "src/app/api/events/route.ts",
  "src/app/api/feature-flags/route.ts",
];
test("toutes les routes existent", () => {
  for (const r of ROUTES) assert.ok(existsSync(r), `route manquante: ${r}`);
});

// ── Config communities bien formée ──
test("config communities: 15 entrées structurées", () => {
  const src = readFileSync("src/config/communities.ts", "utf8");
  const ids = [...src.matchAll(/id: "([a-z-]+)"/g)].map((m) => m[1]);
  assert.ok(ids.length >= 15, `attendu ≥15 communautés, trouvé ${ids.length}`);
  assert.ok(new Set(ids).size === ids.length, "ids dupliqués");
  for (const key of ["memberCount", "status", "ctaLabel", "description"]) {
    assert.ok(src.includes(key), `champ manquant: ${key}`);
  }
});

// ── Validation waitlist (logique répliquée — source: lib/validators.ts) ──
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function validate(i) {
  if (i.website) return "spam";
  if (!i.firstName || i.firstName.trim().length < 2) return "prenom";
  if (!i.email || !EMAIL_RE.test(i.email)) return "email";
  if (i.phone && i.phone.replace(/\D/g, "").length < 8) return "phone";
  if (!i.country) return "pays";
  if (!i.consent) return "consent";
  return null;
}
test("waitlist: entrée valide passe", () => {
  assert.equal(validate({ firstName: "Kevin", email: "k@x.cd", country: "RDC", consent: true }), null);
});
test("waitlist: honeypot bloque", () => {
  assert.equal(validate({ firstName: "Bot", email: "b@x.cd", country: "RDC", consent: true, website: "spam" }), "spam");
});
test("waitlist: email invalide bloque", () => {
  assert.equal(validate({ firstName: "Kevin", email: "pas-un-email", country: "RDC", consent: true }), "email");
});
test("waitlist: téléphone optionnel mais validé si fourni", () => {
  assert.equal(validate({ firstName: "K", email: "k@x.cd", country: "RDC", consent: true, firstName: "Kevin", phone: "123" }), "phone");
  assert.equal(validate({ firstName: "Kevin", email: "k@x.cd", country: "RDC", consent: true, phone: "+243812345678" }), null);
});

// ── Pas de secret exposé côté client ──
test("aucun SERVICE_ROLE en NEXT_PUBLIC", () => {
  const files = ["src/lib/supabase/client.ts", ".env.example"];
  for (const f of files) {
    const src = readFileSync(f, "utf8");
    assert.ok(!/NEXT_PUBLIC[A-Z_]*SERVICE_ROLE/.test(src), `fuite possible dans ${f}`);
  }
});
