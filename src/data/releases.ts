import { albums, type Album } from "./albums";
// Single release date: Apple Music. Video upload has its own date in site.config.
export const kamikaze: Album = {
  id: "kamikaze",
  slug: "kamikaze",
  modified: "2026-09-15",
  releaseDate: "2026-08-14",
  title: "Kamikaze",
  // Artwork verified on the Apple Music Kamikaze release, 2026-09-15.
  cover: "/assets/kamikaze-cover.jpg",
  label: { es: "Sencillo · 2026", en: "Single · 2026" },
  copy: {
    es: "Kamikaze abre el camino a DarkPsycho Metamorphosis, el próximo álbum conceptual de Caribbean Voodoo. El sencillo y su video oficial presentan esta nueva etapa del rock psicodélico de la banda nacida en Tulum, México.",
    en: "Kamikaze introduces DarkPsycho Metamorphosis, the upcoming concept album by Caribbean Voodoo. The single and its official music video open a new chapter for the psychedelic rock band from Tulum, Mexico.",
  },
  tracks: ["Kamikaze"],
  streaming: albums[0].streaming,
};
export const releases: Album[] = [kamikaze, ...albums];
export const getRelease = (slug: string) =>
  releases.find((release) => release.slug === slug);
