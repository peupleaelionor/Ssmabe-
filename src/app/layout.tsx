import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://songisongi.app"),
  title: {
    default: "Songi Songi Mabé — Le réseau vivant de la parole africaine",
    template: "%s | Songi Songi Mabé",
  },
  description:
    "La voix d'abord, le numéro protégé. Songi Songi Mabé connecte les voix, les idées et les communautés entre la RDC, l'Afrique et la diaspora.",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/assets/songi/icons/app-icon.svg" }],
  },
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
    title: "Songi Songi Mabé — La voix d'abord. Le contact après.",
    description:
      "Appels anonymes, numéro protégé. Le téléchat vocal né au Congo, pensé pour la diaspora, ouvert au monde.",
    images: [
      {
        url: "/assets/songi/social/og-cover.svg",
        width: 1200,
        height: 630,
        alt: "Songi Songi Mabé — Téléchat vocal né au Congo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Songi Songi Mabé",
    description: "Rencontre par la voix. Numéro protégé.",
    creator: "@SongiSongiApp",
    images: ["/assets/songi/social/og-cover.svg"],
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
    <html lang="fr" className={`${inter.variable} ${playfair.variable} dark`}>
      <body className="bg-noir text-blanc-chaud antialiased">
        {children}
      </body>
    </html>
  );
}
