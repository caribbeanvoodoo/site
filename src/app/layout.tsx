import type { Metadata } from "next";
import { headers } from "next/headers";
import { Bagel_Fat_One, Kaushan_Script, Work_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { LocaleProvider } from "@/i18n/LocaleContext";
import { SITE_URL } from "@/data/site.config";
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
      className={`${bagel.variable} ${kaushan.variable} ${workSans.variable}`}
    >
      <body>
        <LocaleProvider locale={locale}>{children}</LocaleProvider>
        <Analytics />
      </body>
    </html>
  );
}
