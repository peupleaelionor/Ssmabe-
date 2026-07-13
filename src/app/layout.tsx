import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { ToasterLazy } from "@/components/ds/ToasterLazy";
import { JsonLd } from "@/components/seo/JsonLd";
import { ResourceHints } from "@/components/seo/ResourceHints";
import { PwaRegister } from "@/components/pwa/PwaRegister";
import { InstallPromptLazy } from "@/components/pwa/InstallPromptLazy";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ssmabe.vercel.app"),
  title: {
    default: "Songi Songi Mabé — Le téléchat moderne",
    template: "%s | Songi Songi Mabé",
  },
  description:
    "Parle, rencontre, rejoins. Le téléchat moderne pour l'Afrique, la diaspora et toutes les communautés : appel, WhatsApp, SMS, web et numéro protégé.",
  icons: {
    icon: [
      { url: "/brand/favicon.ico", sizes: "32x32" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/brand/app-icon-192.png", sizes: "192x192" }],
  },
  keywords: [
    "téléchat moderne",
    "rencontre vocale",
    "Congo",
    "lingala",
    "appel protégé",
    "diaspora Congo",
    "voix anonyme",
    "Kinshasa",
    "WhatsApp diaspora",
  ],
  authors: [{ name: "Songi Songi Mabé Team" }],
  creator: "Songi Songi Mabé",
  publisher: "Songi Songi Mabé",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://ssmabe.vercel.app",
    siteName: "Songi Songi Mabé",
    title: "Songi Songi Mabé — Parle. Rencontre. Rejoins.",
    description:
      "Le téléchat moderne : appel, WhatsApp, SMS, web, cercles et numéro protégé. Né à Kinshasa, ouvert au monde.",
    images: [
      {
        url: "/brand/og-ssmabe-brand.png",
        width: 1200,
        height: 630,
        alt: "Songi Songi Mabé — Parle. Rencontre. Rejoins.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Songi Songi Mabé",
    description: "Parle, rencontre, rejoins. Le téléchat moderne avec numéro protégé.",
    creator: "@SongiSongiApp",
    images: ["/brand/og-ssmabe-brand.png"],
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0D0F14",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${poppins.variable} dark`}>
      <head>
        <ResourceHints />
      </head>
      <body className="bg-noir text-blanc-chaud antialiased">
        {children}
        <ToasterLazy />
        <InstallPromptLazy />
        <PwaRegister />
        <JsonLd />
      </body>
    </html>
  );
}
