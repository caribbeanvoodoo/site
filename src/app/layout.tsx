import type { Metadata } from "next";
import { Bagel_Fat_One, Kaushan_Script, Work_Sans } from "next/font/google";
import { LocaleProvider } from "@/i18n/LocaleContext";
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
  title: "Caribbean Voodoo · Rock and Roll from Tulum",
  description:
    "Caribbean Voodoo — raw psychedelic rock and roll from Tulum, Mexico. Escucha Serpientes, mira la sesión en vivo y únete a la lista.",
  openGraph: {
    title: "Caribbean Voodoo · Rock and Roll from Tulum",
    description:
      "Raw psychedelic rock and roll from Tulum, Mexico. Únete al culto.",
    images: ["/assets/serpientes_cover.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${bagel.variable} ${kaushan.variable} ${workSans.variable}`}>
      <body>
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
