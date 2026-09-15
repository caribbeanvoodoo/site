/* eslint-disable @next/next/no-img-element -- Preserve the existing unmodified artwork and CSS sizing. */
import type { Thing } from "schema-dts";
import { notFound } from "next/navigation";
import type { Locale } from "@/i18n/dictionaries";
import { dictionaries } from "@/i18n/dictionaries";
import { routes, musicPath, showPath } from "@/i18n/routes";
import { releases, kamikaze, getRelease } from "@/data/releases";
import { MemberGrid } from "./MemberGrid";
import { siteConfig } from "@/data/site.config";
import { shows } from "@/data/shows";
import { isPastShow, upcomingShows } from "@/lib/events";
import { pageCopy, pageGraph, releaseEntity, videoEntity } from "@/lib/seo";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { JsonLd } from "./JsonLd";
import { ActionLink } from "./ActionLink";
import frame from "./EventPage.module.css";
import styles from "./Editorial.module.css";
import ui from "./ui.module.css";

function Shell({
  locale,
  path,
  title,
  description,
  heading,
  eyebrow,
  extra = [],
  children,
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  heading: string;
  eyebrow: string;
  extra?: Thing[];
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={pageGraph(locale, path, title, description, extra)} />
      <Header />
      <main className={frame.page}>
        <div className={frame.glow} aria-hidden="true" />
        <div className={frame.inner}>
          <nav
            aria-label={locale === "es" ? "Ruta de navegación" : "Breadcrumb"}
          >
            <a className={frame.back} href={routes.home[locale]}>
              ← Caribbean Voodoo
            </a>
          </nav>
          <div className={frame.eyebrow}>{eyebrow}</div>
          <h1 className={frame.headline}>{heading}</h1>
          <div className={styles.content}>{children}</div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function ReleaseLinks({ locale }: { locale: Locale }) {
  return (
    <ul className={styles.list}>
      {releases.map((r) => (
        <li key={r.slug}>
          <a href={musicPath(r.slug, locale)}>{r.title}</a> — {r.label[locale]}
        </li>
      ))}
    </ul>
  );
}
export function BandPage({ locale }: { locale: Locale }) {
  const es = locale === "es";
  const t = dictionaries[locale];
  return (
    <Shell
      locale={locale}
      path={routes.band[locale]}
      {...pageCopy.band[locale]}
      heading="Caribbean Voodoo"
      eyebrow={es ? "La banda" : "The band"}
      extra={releases.map((r) => releaseEntity(r, locale))}
    >
      <p>{t.hero.positioning}</p>
      <h2>{es ? "Nacidos en Tulum" : "Born in Tulum"}</h2>
      <p>
        {es
          ? "La banda nació en febrero de 2020, con Dorian Remis en la voz y Che en la guitarra. JP Soria se sumó al bajo en abril de ese año. Lo que comenzó como un grupo de covers se transformó en un proyecto de canciones propias: rock and roll crudo, guitarras y psicodelia desde Quintana Roo."
          : "The band formed in February 2020 with Dorian Remis on vocals and Che on guitar. JP Soria joined on bass that April. What began with covers became a project built around original songs: raw rock and roll, guitars and psychedelia from Quintana Roo."}
      </p>
      <p>
        {es
          ? "Sus primeros escenarios estuvieron en Tulum, Playa del Carmen, Cancún, Bacalar y Holbox. Después llevaron su música a ciudades como Guadalajara, Guanajuato, Pachuca, Cuernavaca, Querétaro y Ciudad de México."
          : "Their early shows took them through Tulum, Playa del Carmen, Cancún, Bacalar and Holbox. They later brought their music to Guadalajara, Guanajuato, Pachuca, Cuernavaca, Querétaro and Mexico City."}
      </p>
      <h2>{es ? "Del Caribe al escenario" : "From the Caribbean to the stage"}</h2>
      <p>
        {es
          ? "Entre 2025 y 2026, Caribbean Voodoo compartió escenario con La Castañeda y participó en la primera edición de Caribe Suena, en Playa del Carmen, junto a Kinky, Inspector y Genitallica."
          : "In 2025 and 2026, Caribbean Voodoo shared the stage with La Castañeda and played the first edition of Caribe Suena in Playa del Carmen, alongside Kinky, Inspector and Genitallica."}
      </p>
      <h2>{es ? "Integrantes" : "Members"}</h2>
      <MemberGrid locale={locale} />
      <h2>{es ? "De Serpientes a Kamikaze" : "From Serpientes to Kamikaze"}</h2>
      <p>
        {es
          ? "Serpientes, publicado el 6 de enero de 2025, reúne trece canciones grabadas entre Tulum y Buenos Aires. Kamikaze abre la siguiente etapa: DarkPsycho Metamorphosis, un próximo álbum conceptual de nueve canciones sobre un descenso, una mutación y un renacimiento."
          : "Released on January 6, 2025, Serpientes brings together thirteen songs recorded between Tulum and Buenos Aires. Kamikaze opens the next chapter: DarkPsycho Metamorphosis, an upcoming nine-song concept album about descent, mutation and rebirth."}
      </p>
      <ReleaseLinks locale={locale} />
      <p>
        <a href={routes.shows[locale]}>
          {es ? "Conciertos y fechas" : "Shows and tour dates"}
        </a>{" "}
        ·{" "}
        <a href={routes.press[locale]}>
          {es ? "Booking y prensa" : "Booking and press"}
        </a>
      </p>
    </Shell>
  );
}

export function MusicPage({ locale, slug }: { locale: Locale; slug: string }) {
  const release = getRelease(slug);
  if (!release) notFound();
  const es = locale === "es";
  const single = release.id === "kamikaze";
  const singleOnly = release.streamingIsSingle === true;
  const stream = singleOnly ? kamikaze : release;
  const date =
    release.releaseDate &&
    new Intl.DateTimeFormat(es ? "es-MX" : "en-US", {
      dateStyle: "long",
      timeZone: "UTC",
    }).format(new Date(`${release.releaseDate}T12:00:00Z`));
  return (
    <Shell
      locale={locale}
      path={musicPath(slug, locale)}
      title={`${release.title} | Caribbean Voodoo`}
      description={release.copy[locale]}
      heading={release.title}
      eyebrow={release.label[locale]}
      extra={[
        releaseEntity(release, locale),
        ...(single ? [videoEntity(locale)] : []),
      ]}
    >
      <p>{release.copy[locale]}</p>
      {single ? (
        <>
          <iframe
            className={styles.player}
            src={`https://www.youtube.com/embed/${siteConfig.video.videoId}`}
            title="Caribbean Voodoo — Kamikaze"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          <p>
            {es
              ? "Video oficial · 2 min 46 s · publicado el 17 de agosto de 2026 (UTC)."
              : "Official music video · 2 min 46 sec · published August 17, 2026 (UTC)."}
          </p>
        </>
      ) : (
        <img
          src={release.cover}
          alt={
            es
              ? `Portada de ${release.title}, de Caribbean Voodoo`
              : `${release.title} cover artwork by Caribbean Voodoo`
          }
          width={900}
          height={900}
        />
      )}
      {date && (
        <p>
          {es ? "Lanzamiento" : "Release date"}:{" "}
          <time dateTime={release.releaseDate}>{date}</time>
        </p>
      )}
      {singleOnly && (
        <p>
          {es
            ? "El lanzamiento del álbum completo está anunciado para el 17 de septiembre de 2026. Por ahora, los enlaces de escucha corresponden al sencillo Kamikaze."
            : "The full album release is announced for September 17, 2026. For now, the listening links are for the single Kamikaze."}
        </p>
      )}
      <h2>
        {singleOnly
          ? es
            ? "Escucha Kamikaze"
            : "Listen to Kamikaze"
          : es
            ? "Escuchar"
            : "Listen"}
      </h2>
      <div className={styles.actions}>
        {Object.entries(stream.streaming)
          .filter(([key]) => key !== "youtube" || single || singleOnly)
          .map(([key, href], i) => (
            <ActionLink
              key={key}
              href={href}
              target="_blank"
              rel="noopener"
              className={`${ui.btn} ${i === 0 ? ui.solid : ui.ghost}`}
              event="streaming_click"
              details={{ album: stream.id, platform: key }}
            >
              {key === "appleMusic"
                ? "Apple Music"
                : key === "more"
                  ? es
                    ? "Más plataformas"
                    : "More platforms"
                  : key === "spotify"
                    ? href.includes("distrokid")
                      ? "Spotify · HyperFollow"
                      : "Spotify"
                    : "YouTube"}
            </ActionLink>
          ))}
      </div>
      {release.tracks && release.tracks.length > 1 && (
        <>
          <h2>{es ? "Canciones" : "Tracklist"}</h2>
          <ol className={styles.list}>
            {release.tracks.map((track) => (
              <li key={track}>{track}</li>
            ))}
          </ol>
        </>
      )}
      {release.id === "serpientes" && (
        <>
          <h2>{es ? "Grabación y producción" : "Recording and production"}</h2>
          <p>
            {es
              ? "Grabado en Javitech Studios, Tulum, y Predasound, Buenos Aires. Nicolás Guerrieri se encargó de la mezcla y masterización y compartió la producción con Che."
              : "Recorded at Javitech Studios in Tulum and Predasound in Buenos Aires. Nicolás Guerrieri handled mixing and mastering and co-produced the album with Che."}
          </p>
        </>
      )}
      {single && (
        <>
          <h2>{es ? "Portada del sencillo" : "Single artwork"}</h2>
          <img
            src={release.cover}
            alt={
              es
                ? "Portada de Kamikaze, de Caribbean Voodoo"
                : "Kamikaze cover artwork by Caribbean Voodoo"
            }
            width={900}
            height={900}
            loading="lazy"
          />
        </>
      )}
      <h2>{es ? "Más de Caribbean Voodoo" : "More from Caribbean Voodoo"}</h2>
      <ReleaseLinks locale={locale} />
      <p>
        <a href={routes.band[locale]}>
          {es ? "Conoce la banda" : "Meet the band"}
        </a>{" "}
        ·{" "}
        <a href={`${routes.home[locale]}#lista`}>
          {es ? "Recibe las novedades" : "Get the latest news"}
        </a>
      </p>
    </Shell>
  );
}

export function PressPage({ locale }: { locale: Locale }) {
  const es = locale === "es";
  return (
    <Shell
      locale={locale}
      path={routes.press[locale]}
      {...pageCopy.press[locale]}
      heading={es ? "Booking y prensa" : "Booking and press"}
      eyebrow={es ? "Contacto" : "Contact"}
    >
      <p>
        {dictionaries[locale].hero.positioning}{" "}
        {es
          ? "Rock and roll crudo, sonido propio y canciones nacidas entre la selva y el escenario."
          : "Raw rock and roll, an original sound, and songs born between the jungle and the stage."}
      </p>
      <h2>
        {es
          ? "Conciertos, festivales y entrevistas"
          : "Concerts, festivals and interviews"}
      </h2>
      <p>
        {es
          ? "Para proponer una fecha, incluye ciudad, venue, día, horario y los datos de contacto de la producción. Para entrevistas o material editorial, comparte el medio, formato y fecha de publicación."
          : "For bookings, include the city, venue, date, schedule and production contact details. For interviews or editorial material, share the publication, format and planned publication date."}
      </p>
      <div className={styles.actions}>
        <ActionLink
          className={`${ui.btn} ${ui.solid}`}
          href={`mailto:${siteConfig.contact.email}`}
          event="booking_click"
          details={{ channel: "email" }}
        >
          {es ? "Escríbenos" : "Email us"}
        </ActionLink>
        <ActionLink
          className={`${ui.btn} ${ui.ghost}`}
          href={siteConfig.contact.whatsappUrl}
          target="_blank"
          rel="noopener"
          event="booking_click"
          details={{ channel: "whatsapp" }}
        >
          WhatsApp
        </ActionLink>
      </div>
      <p>
        {siteConfig.contact.email}
        <br />
        {siteConfig.contact.whatsapp}
      </p>
      <h2>Press kit</h2>
      <p>
        {es
          ? "Descarga el dossier oficial con la historia de Caribbean Voodoo y su música."
          : "Download the official dossier for the story of Caribbean Voodoo and its music."}
      </p>
      <p>
        <ActionLink
          href={siteConfig.pressKitUrl}
          event="presskit_download"
          download="CaribbeanPress.pdf"
        >
          Caribbean Voodoo — Press kit (CaribbeanPress.pdf)
        </ActionLink>
      </p>
      <h2>{es ? "Logo oficial" : "Official logo"}</h2>
      <img
        className={styles.pressLogo}
        src="/assets/logo_gold.png"
        alt="Caribbean Voodoo"
        width={717}
        height={317}
        loading="lazy"
      />
      <p>
        <a href="/assets/logo_gold.png" download>
          {es ? "Descargar logo dorado · PNG" : "Download gold logo · PNG"}
        </a>
      </p>
      <h2>{es ? "Música y video" : "Music and video"}</h2>
      <ReleaseLinks locale={locale} />
      <p>
        <a href={routes.band[locale]}>
          {es ? "Historia e integrantes" : "History and members"}
        </a>
      </p>
    </Shell>
  );
}

export function ShowsPage({ locale }: { locale: Locale }) {
  const es = locale === "es";
  const now = Date.now();
  const upcoming = upcomingShows(shows, now);
  const past = shows
    .filter((show) => isPastShow(show, now))
    .sort((a, b) => Date.parse(b.startDateTime) - Date.parse(a.startDateTime));
  function list(items: typeof shows) {
    return (
      <ul className={styles.list}>
        {items.map((show) => (
          <li key={show.slug}>
            <a href={showPath(show.slug, locale)}>
              {show.venue} — {show.city}
            </a>{" "}
            ·{" "}
            <time dateTime={show.startDateTime}>
              {show.dateLabel[locale]} {show.startDateTime.slice(0, 4)}
            </time>
          </li>
        ))}
      </ul>
    );
  }
  return (
    <Shell
      locale={locale}
      path={routes.shows[locale]}
      {...pageCopy.shows[locale]}
      heading={es ? "Conciertos y fechas" : "Shows and tour dates"}
      eyebrow={es ? "En vivo" : "Live"}
    >
      <h2>
        {upcoming.length
          ? es
            ? "Próximas fechas"
            : "Upcoming shows"
          : dictionaries[locale].fechas.emptyHeadline}
      </h2>
      {upcoming.length ? (
        list(upcoming)
      ) : (
        <p>{dictionaries[locale].fechas.emptyCopy}</p>
      )}
      <p>
        <a href={`${routes.home[locale]}#lista`}>
          {dictionaries[locale].fechas.cta}
        </a>
      </p>
      {past.length > 0 && (
        <>
          <h2>{es ? "Archivo de conciertos" : "Concert archive"}</h2>
          <p>
            {es
              ? "Fechas anteriores. Este archivo no indica disponibilidad de boletos."
              : "Previous dates. This archive does not indicate ticket availability."}
          </p>
          {list(past)}
        </>
      )}
      <p>
        <a href={routes.press[locale]}>
          {es
            ? "Propón una fecha para tu venue o festival"
            : "Propose a show at your venue or festival"}
        </a>
      </p>
    </Shell>
  );
}
