import type { Metadata } from "next";
import { headers } from "next/headers";
import { Special_Elite, Work_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { LocaleProvider } from "@/i18n/LocaleContext";
import { SITE_URL } from "@/data/site.config";
import "./globals.css";

const typewriter = Special_Elite({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-typewriter",
  display: "swap",
});

const workSans = Work_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Caribbean Voodoo",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = (await headers()).get("x-cv-locale") === "en" ? "en" : "es";
  return (
    <html
      lang={locale === "es" ? "es-MX" : "en"}
      className={`${typewriter.variable} ${workSans.variable}`}
    >
      <body>
        <LocaleProvider locale={locale}>{children}</LocaleProvider>
        <Analytics />
      </body>
    </html>
  );
}
