/**
 * Discography shown in the "Escuchar" section.
 *
 * The first entry is rendered as the featured release (larger, with tracklist);
 * later entries render as previous releases. All streaming links point at the
 * album's DistroKid HyperFollow smart link, which fans out to every platform
 * from one page — swap `streaming.*` here to repoint the buttons.
 */

export interface Album {
  id: string;
  title: string;
  cover: string;
  /** Small uppercase label above the copy, e.g. "Concept album · 2026". */
  label: { es: string; en: string };
  copy: { es: string; en: string };
  /** Optional tracklist. Song titles stay identical in both locales. */
  tracks?: string[];
  streaming: {
    spotify: string;
    youtube: string;
    appleMusic: string;
    more: string;
  };
}

const KAMIKAZE_HYPERFOLLOW =
  "https://distrokid.com/hyperfollow/caribbeanvoodoo/kamikaze?ref=release";
const SERPIENTES_HYPERFOLLOW =
  "https://distrokid.com/hyperfollow/caribbeanvoodoo/serpientes";
const YOUTUBE_CHANNEL = "https://www.youtube.com/@caribbeanvoodoo";

export const albums: Album[] = [
  {
    id: "darkpsycho",
    title: "DarkPsycho Metamorphosis",
    cover: "/assets/darkpsycho_cover.jpg",
    label: { es: "Álbum conceptual · 2026", en: "Concept album · 2026" },
    copy: {
      es: "Nuestro nuevo álbum conceptual: un descenso, una mutación y un renacimiento. Nueve canciones cósmicas e instintivas, grabadas con la esencia cruda de la banda. El sencillo Kamikaze ya está disponible, con video musical.",
      en: "Our new concept album: a descent, a mutation, and a rebirth. Nine cosmic, instinctive songs recorded with the band's raw essence. The single Kamikaze is out now, with a music video.",
    },
    tracks: [
      "Kamikaze",
      "Cielo Rojo",
      "Lobo",
      "Fantasma",
      "Naufrague",
      "Serpientes",
      "Rosas Negras",
      "Rio",
      "Psicopata",
    ],
    streaming: {
      spotify: KAMIKAZE_HYPERFOLLOW,
      youtube: YOUTUBE_CHANNEL,
      appleMusic: KAMIKAZE_HYPERFOLLOW,
      more: KAMIKAZE_HYPERFOLLOW,
    },
  },
  {
    id: "serpientes",
    title: "Serpientes",
    cover: "/assets/serpientes_cover.jpg",
    label: { es: "Álbum · 2025", en: "Album · 2025" },
    copy: {
      es: "Nuestro primer álbum Long Play. Trece canciones grabadas entre Tulum y Buenos Aires, con la esencia cruda y potente de la banda.",
      en: "Our first full-length album. Thirteen songs recorded between Tulum and Buenos Aires, carrying the band's raw, powerful essence.",
    },
    streaming: {
      spotify: SERPIENTES_HYPERFOLLOW,
      youtube: YOUTUBE_CHANNEL,
      appleMusic: SERPIENTES_HYPERFOLLOW,
      more: SERPIENTES_HYPERFOLLOW,
    },
  },
];
