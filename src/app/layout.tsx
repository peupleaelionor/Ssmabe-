import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Songi Songi Mabé – Rencontres vocales du Congo",
    template: "%s | Songi Songi Mabé",
  },
  description:
    "La plateforme de rencontre vocale née au Congo. Parle, écoute, connecte – sans jamais partager ton numéro. Voix du Congo, cœur ouvert.",
  keywords: [
    "rencontre vocale",
    "Congo",
    "lingala",
    "appel anonyme",
    "diaspora Congo",
    "voix anonyme",
    "Kinshasa",
    "Brazzaville",
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
    url: "https://songisongi.app",
    siteName: "Songi Songi Mabé",
    title: "Songi Songi Mabé – La voix qui connecte",
    description:
      "Rencontre par la voix. Numéro protégé. La plateforme de rencontre vocale née au Congo.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Songi Songi Mabé",
    description: "Rencontre par la voix. Numéro protégé.",
    creator: "@SongiSongiApp",
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#0B0B0B",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} dark`}>
      <body className="bg-noir text-blanc-chaud antialiased">
        {children}
      </body>
    </html>
  );
}
