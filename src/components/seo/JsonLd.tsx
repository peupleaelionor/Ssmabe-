import { env } from "@/lib/env";

/**
 * Données structurées schema.org — Organization + WebSite.
 * Contenu statique construit côté serveur, sans entrée utilisateur.
 */
export function JsonLd() {
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Songi Songi Mabé",
      url: env.siteUrl,
      logo: `${env.siteUrl}/brand/app-icon-512.png`,
      slogan: "Né à Kinshasa. Pensé pour toutes les communautés.",
      email: "hello@songisongi.app",
      foundingLocation: { "@type": "Place", name: "Kinshasa, République Démocratique du Congo" },
      sameAs: ["https://twitter.com/SongiSongiApp"],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Songi Songi Mabé",
      url: env.siteUrl,
      description:
        "Le téléchat moderne pour l'Afrique, la diaspora et toutes les communautés : appel, WhatsApp, SMS, web et numéro protégé.",
      inLanguage: "fr",
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
