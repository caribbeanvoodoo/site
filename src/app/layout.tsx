import type { Metadata } from "next";
import { Bagel_Fat_One, Kaushan_Script, Work_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { LocaleProvider } from "@/i18n/LocaleContext";
import { siteConfig, SITE_URL } from "@/data/site.config";
import "./globals.css";

const bagel = Bagel_Fat_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const kaushan = Kaushan_Script({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-script",
  display: "swap",
});

const workSans = Work_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const TITLE = "Caribbean Voodoo · Rock and Roll from Tulum";
// Spanish-first, matching the default page language (an earlier version
// code-switched mid-sentence between English and Spanish).
const DESCRIPTION =
  "Caribbean Voodoo — rock and roll psicodélico y crudo desde Tulum, México. Escucha Serpientes, mira el video y únete a la lista.";

export const metadata: Metadata = {
  // Without metadataBase, relative OG images resolve against whatever host
  // built the page — which is how share previews ended up pointing at a
  // throwaway *.vercel.app domain.
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Caribbean Voodoo",
    url: "/",
    locale: "es_MX",
    alternateLocale: ["en_US"],
    title: TITLE,
    description: "Raw psychedelic rock and roll from Tulum, Mexico. Únete al culto.",
    images: [{ url: "/assets/og.jpg", width: 1200, height: 630, alt: "Caribbean Voodoo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: "Raw psychedelic rock and roll from Tulum, Mexico. Únete al culto.",
    images: ["/assets/og.jpg"],
  },
};

/** Helps search engines understand this is a band, not a generic page. */
const musicGroupJsonLd = {
  "@context": "https://schema.org",
  "@type": "MusicGroup",
  name: "Caribbean Voodoo",
  genre: ["Psychedelic Rock", "Rock and Roll"],
  foundingDate: "2020-02",
  foundingLocation: { "@type": "Place", name: "Tulum, Quintana Roo, Mexico" },
  url: SITE_URL,
  logo: `${SITE_URL}/assets/logo_gold.png`,
  image: `${SITE_URL}/assets/band_bw.jpg`,
  email: siteConfig.contact.email,
  sameAs: [siteConfig.social.instagram, siteConfig.social.youtube, siteConfig.streaming.spotify],
  album: {
    "@type": "MusicAlbum",
    name: "Serpientes",
    datePublished: "2025",
    image: `${SITE_URL}/assets/serpientes_cover.jpg`,
  },
  member: [
    { "@type": "Person", name: "Dorian Remis" },
    { "@type": "Person", name: "Che" },
    { "@type": "Person", name: "JP" },
    { "@type": "Person", name: "Detz conde" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${bagel.variable} ${kaushan.variable} ${workSans.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(musicGroupJsonLd) }}
        />
        <LocaleProvider>{children}</LocaleProvider>
        <Analytics />
      </body>
    </html>
  );
}
