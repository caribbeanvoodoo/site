import type {
  Graph,
  Thing,
  MusicAlbum,
  VideoObject,
  MusicEvent,
} from "schema-dts";
import type { Metadata } from "next";
import type { Locale } from "@/i18n/dictionaries";
import { dictionaries } from "@/i18n/dictionaries";
import { routes, translatePath, musicPath } from "@/i18n/routes";
import { siteConfig, SITE_URL } from "@/data/site.config";
import { members } from "@/data/members";
import { releases } from "@/data/releases";
import type { Album } from "@/data/albums";
import type { Show } from "@/data/shows";
import { isPastShow } from "./events";

export const CONTENT_MODIFIED = "2026-09-15";
export const absolute = (path: string) =>
  new URL(path, SITE_URL).href.replace(/\/$/, "");
const BAND_ID = `${SITE_URL}/#band`;
export function pageMetadata(
  locale: Locale,
  path: string,
  title: string,
  description: string,
  image = "/assets/og.jpg",
): Metadata {
  const languages = {
    "es-MX": absolute(translatePath(path, "es")),
    en: absolute(translatePath(path, "en")),
    "x-default": absolute(translatePath(path, "es")),
  };
  return {
    title,
    description,
    alternates: { canonical: absolute(path), languages },
    openGraph: {
      type: "website",
      siteName: "Caribbean Voodoo",
      title,
      description,
      url: absolute(path),
      locale: locale === "es" ? "es_MX" : "en_US",
      alternateLocale: [locale === "es" ? "en_US" : "es_MX"],
      images: [{ url: absolute(image), alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absolute(image)],
    },
  };
}
export const pageCopy = {
  home: {
    es: {
      title: "Caribbean Voodoo | Rock psicodélico desde Tulum, México",
      description:
        "Sitio oficial de Caribbean Voodoo, banda de rock psicodélico de Tulum, México. Mira Kamikaze, conoce DarkPsycho Metamorphosis y recibe nuevas fechas.",
    },
    en: {
      title: "Caribbean Voodoo | Psychedelic Rock Band from Tulum, Mexico",
      description:
        "The official Caribbean Voodoo website. Watch Kamikaze, discover the upcoming album DarkPsycho Metamorphosis, and get news from the psychedelic rock band from Tulum.",
    },
  },
  band: {
    es: {
      title: "Caribbean Voodoo: banda de rock psicodélico de Tulum",
      description:
        "Conoce la historia, los integrantes y la música de Caribbean Voodoo: rock psicodélico de Tulum, Quintana Roo, de Serpientes a Kamikaze.",
    },
    en: {
      title: "About Caribbean Voodoo | Psychedelic Rock from Mexico",
      description:
        "Meet Caribbean Voodoo, the psychedelic rock band formed in Tulum, Mexico. Explore the band's origins, current members, Serpientes and Kamikaze.",
    },
  },
  shows: {
    es: {
      title: "Conciertos y fechas | Caribbean Voodoo",
      description:
        "Consulta las próximas fechas de Caribbean Voodoo y el archivo de conciertos. Recibe avisos de nuevos shows y encuentra información de cada venue.",
    },
    en: {
      title: "Live Shows and Tour Dates | Caribbean Voodoo",
      description:
        "Find upcoming Caribbean Voodoo shows and browse the concert archive. Get new date announcements and venue information from the band's official website.",
    },
  },
  press: {
    es: {
      title: "Booking y press kit | Caribbean Voodoo",
      description:
        "Contacta a Caribbean Voodoo para conciertos, festivales y entrevistas. Descarga el press kit oficial de la banda de rock psicodélico de Tulum, México.",
    },
    en: {
      title: "Booking and Press Kit | Caribbean Voodoo",
      description:
        "Book Caribbean Voodoo for concerts and festivals or arrange an interview. Download the official press kit for the psychedelic rock band from Tulum, Mexico.",
    },
  },
};
export function staticMetadata(key: keyof typeof pageCopy, locale: Locale) {
  const { title, description } = pageCopy[key][locale];
  return pageMetadata(locale, routes[key][locale], title, description);
}
export function releaseMetadata(release: Album, locale: Locale) {
  const suffix =
    release.id === "kamikaze"
      ? locale === "es"
        ? "Video oficial y sencillo"
        : "Official Video and Single"
      : locale === "es"
        ? "Álbum"
        : "Album";
  return pageMetadata(
    locale,
    musicPath(release.slug, locale),
    `${release.title} | ${suffix} | Caribbean Voodoo`,
    release.copy[locale],
    release.cover,
  );
}
export function releaseEntity(release: Album, locale: Locale) {
  return {
    "@type": "MusicAlbum" as const,
    "@id": `${SITE_URL}/#release-${release.slug}`,
    name: release.title,
    url: absolute(musicPath(release.slug, locale)),
    image: absolute(release.cover),
    description: release.copy[locale],
    byArtist: { "@id": BAND_ID },
    albumReleaseType: `https://schema.org/${release.id === "kamikaze" ? "SingleRelease" : "AlbumRelease"}`,
    ...(release.releaseDate ? { datePublished: release.releaseDate } : {}),
    numTracks: release.tracks?.length,
    // Announced dates do not make the single links identities for the full album.
    ...(release.releaseDate && !release.streamingIsSingle
      ? {
          track: release.tracks?.map((name, index) => ({
            "@type": "MusicRecording" as const,
            "@id": `${SITE_URL}/#track-${release.slug}-${index + 1}`,
            name,
            byArtist: { "@id": BAND_ID },
            inAlbum: { "@id": `${SITE_URL}/#release-${release.slug}` },
          })),
          sameAs: [
            release.streaming.appleMusic,
            ...(release.streaming.spotify.includes("open.spotify.com/album/")
              ? [release.streaming.spotify]
              : []),
          ],
        }
      : {}),
  } satisfies MusicAlbum;
}
export function videoEntity(locale: Locale) {
  return {
    "@type": "VideoObject" as const,
    "@id": `${SITE_URL}/#kamikaze-video`,
    name: "Caribbean Voodoo — Kamikaze",
    description: dictionaries[locale].ver.copy,
    thumbnailUrl: [
      `https://i.ytimg.com/vi/${siteConfig.video.videoId}/hqdefault.jpg`,
    ],
    uploadDate: siteConfig.video.uploadDate,
    duration: siteConfig.video.duration,
    embedUrl: `https://www.youtube.com/embed/${siteConfig.video.videoId}`,
    url: `https://www.youtube.com/watch?v=${siteConfig.video.videoId}`,
    creator: { "@id": BAND_ID },
    mainEntityOfPage: absolute(musicPath("kamikaze", locale)),
  } satisfies VideoObject;
}
export function eventEntity(
  show: Show,
  locale: Locale,
  path: string,
  now: number,
) {
  if (
    !show.fullAddress ||
    Object.values(show.fullAddress).some((value) => !value.trim()) ||
    !Number.isFinite(Date.parse(show.startDateTime)) ||
    show.timeTBA ||
    isPastShow(show, now)
  )
    return null;
  const status = (
    {
      scheduled: "EventScheduled",
      cancelled: "EventCancelled",
      postponed: "EventPostponed",
    } as const
  )[show.status ?? "scheduled"];
  return {
    "@type": "MusicEvent" as const,
    "@id": `${SITE_URL}/#event-${show.slug}`,
    name: show.name,
    description: show.description[locale],
    url: absolute(path),
    startDate: show.startDateTime,
    ...(show.endDateTime ? { endDate: show.endDateTime } : {}),
    eventStatus: `https://schema.org/${status}` as const,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    ...(show.flyer ? { image: absolute(show.flyer) } : {}),
    location: {
      "@type": "Place" as const,
      name: show.venue,
      address: { "@type": "PostalAddress" as const, ...show.fullAddress },
    },
    performer: (show.lineup ?? ["Caribbean Voodoo"]).map((name) =>
      name === "Caribbean Voodoo"
        ? { "@id": BAND_ID }
        : { "@type": "MusicGroup" as const, name },
    ),
    ...(show.ticketUrl && show.cover !== "tba" && status === "EventScheduled"
      ? {
          offers: {
            "@type": "Offer" as const,
            url: show.ticketUrl,
            price: show.cover === "free" ? 0 : show.cover,
            priceCurrency: "MXN",
          },
        }
      : {}),
  } satisfies MusicEvent;
}
export function pageGraph(
  locale: Locale,
  path: string,
  title: string,
  description: string,
  extra: Thing[] = [],
): Graph {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite" as const,
        "@id": `${SITE_URL}/#website`,
        name: "Caribbean Voodoo",
        url: absolute("/"),
        inLanguage: ["es-MX", "en"],
        publisher: { "@id": BAND_ID },
      },
      {
        "@type": "MusicGroup" as const,
        "@id": BAND_ID,
        name: "Caribbean Voodoo",
        description: dictionaries[locale].hero.positioning,
        url: absolute(routes.home[locale]),
        genre: ["Psychedelic Rock", "Rock and Roll"],
        foundingDate: "2020-02",
        foundingLocation: {
          "@type": "Place" as const,
          name: "Tulum, Quintana Roo, México",
        },
        logo: absolute("/assets/logo_gold.png"),
        image: absolute("/assets/og.jpg"),
        email: siteConfig.contact.email,
        sameAs: Object.values(siteConfig.social),
        member: members.map(({ name }) => ({
          "@type": "Person" as const,
          name,
        })),
        album: releases.map((r) => ({
          "@id": `${SITE_URL}/#release-${r.slug}`,
        })),
      },
      {
        "@type": "WebPage" as const,
        "@id": `${absolute(path)}#webpage`,
        url: absolute(path),
        name: title,
        description,
        inLanguage: locale === "es" ? "es-MX" : "en",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": BAND_ID },
        ...(path !== routes.home[locale]
          ? { breadcrumb: { "@id": `${absolute(path)}#breadcrumbs` } }
          : {}),
      },
      ...(path === routes.home[locale]
        ? []
        : [
            {
              "@type": "BreadcrumbList" as const,
              "@id": `${absolute(path)}#breadcrumbs`,
              itemListElement: [
                {
                  "@type": "ListItem" as const,
                  position: 1,
                  name: "Caribbean Voodoo",
                  item: absolute(routes.home[locale]),
                },
                {
                  "@type": "ListItem" as const,
                  position: 2,
                  name: title,
                  item: absolute(path),
                },
              ],
            },
          ]),
      ...extra,
    ],
  };
}
