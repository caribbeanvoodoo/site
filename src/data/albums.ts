/**
 * Discography shown in the "Escuchar" section.
 *
 * The first entry is rendered as the featured release (larger, with tracklist);
 * later entries render as previous releases. Direct release links are used
 * where verified; more platforms uses the corresponding HyperFollow page.
 * The upcoming album currently links to its available single, labeled in the UI.
 */

export interface Album {
  id: string;
  slug: string;
  modified: string;
  releaseDate?: string;
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
    slug: "darkpsycho-metamorphosis",
    modified: "2026-09-15",
    title: "DarkPsycho Metamorphosis",
    cover: "/assets/darkpsycho_cover.jpg",
    label: { es: "Próximo álbum conceptual", en: "Upcoming concept album" },
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
      spotify: "https://open.spotify.com/album/3BlwqSrof10sdlwqvKhOFu",
      youtube: "https://www.youtube.com/watch?v=xUW1N8X0d70",
      appleMusic: "https://music.apple.com/us/album/kamikaze-single/6801705493",
      more: KAMIKAZE_HYPERFOLLOW,
    },
  },
  {
    id: "serpientes",
    slug: "serpientes",
    modified: "2026-09-15",
    releaseDate: "2025-01-06",
    tracks: [
      "Miedo",
      "Asteroides",
      "Paseo Por Marte",
      "Libre",
      "La Cruda",
      "Abismos",
      "Espectro Viejo",
      "El Tigre",
      "Alguna Vez",
      "Demencia",
      "No Se Quien Soy",
      "Normalidad",
      "Pensamientos Electricos",
    ],
    title: "Serpientes",
    cover: "/assets/serpientes_cover.jpg",
    label: { es: "Álbum · 2025", en: "Album · 2025" },
    copy: {
      es: "Nuestro primer álbum Long Play. Trece canciones grabadas entre Tulum y Buenos Aires, con la esencia cruda y potente de la banda.",
      en: "Our first full-length album. Thirteen songs recorded between Tulum and Buenos Aires, carrying the band's raw, powerful essence.",
    },
    streaming: {
      spotify: "https://open.spotify.com/album/4dZoeDvZrNxCkpsVL7MpUf",
      youtube: YOUTUBE_CHANNEL,
      appleMusic: "https://music.apple.com/us/album/serpientes/1788897239",
      more: SERPIENTES_HYPERFOLLOW,
    },
  },
];
