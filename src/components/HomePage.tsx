import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Escuchar } from "@/components/Escuchar";
import { Ver } from "@/components/Ver";
import { Lista } from "@/components/Lista";
import { Fechas } from "@/components/Fechas";
import { Nosotros } from "@/components/Nosotros";
import { Prensa } from "@/components/Prensa";
import { Footer } from "@/components/Footer";

import type { Locale } from "@/i18n/dictionaries";
import { shows } from "@/data/shows";
import { upcomingShows } from "@/lib/events";
import { pageGraph, pageCopy, releaseEntity } from "@/lib/seo";
import { releases } from "@/data/releases";
import { routes } from "@/i18n/routes";
import { JsonLd } from "@/components/JsonLd";

export function HomePage({ locale }: { locale: Locale }) {
  const copy = pageCopy.home[locale];
  return (
    <>
      <JsonLd
        data={pageGraph(
          locale,
          routes.home[locale],
          copy.title,
          copy.description,
          releases.map((r) => releaseEntity(r, locale)),
        )}
      />
      <Header />
      <main>
        <Hero />
        <Escuchar />
        <Ver />
        <Lista />
        <Fechas shows={upcomingShows(shows, Date.now())} />
        <Nosotros />
        <Prensa />
      </main>
      <Footer />
    </>
  );
}
