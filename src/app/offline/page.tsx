import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hors-ligne",
  robots: { index: false, follow: false },
};

/**
 * Page de repli hors-ligne (servie par le service worker).
 * Styles INLINE volontairement : reste lisible même si la feuille de style
 * n'est pas encore en cache (premier accès hors-ligne).
 */
export default function OfflinePage() {
  return (
    <main
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1.25rem",
        padding: "2rem",
        textAlign: "center",
        background: "#0D0F14",
        color: "#F3EFE6",
        fontFamily: "-apple-system, Segoe UI, Roboto, Arial, sans-serif",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/brand/app-icon-192.png" alt="Songi Songi Mabé" width={72} height={72} style={{ borderRadius: 18 }} />
      <h1 style={{ fontSize: "1.5rem", fontWeight: 700, margin: 0 }}>Tu es hors-ligne</h1>
      <p style={{ color: "#A9A69A", maxWidth: 340, lineHeight: 1.6, margin: 0 }}>
        La connexion est coupée. Dès qu&apos;elle revient, tu retrouves tes cercles
        et tes conversations. Rien n&apos;est perdu.
      </p>
      {/* Rechargement dur volontaire (reconnexion fiable) — pas de routing client. */}
      {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
      <a
        href="/"
        style={{
          display: "inline-block",
          background: "#E0694A",
          color: "#0D0F14",
          fontWeight: 600,
          textDecoration: "none",
          padding: "12px 28px",
          borderRadius: 999,
        }}
      >
        Réessayer
      </a>
      <p style={{ color: "#7A7F62", fontSize: 12, margin: 0 }}>Né à Kinshasa. Pensé pour toutes les communautés.</p>
    </main>
  );
}
