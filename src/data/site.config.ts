/**
 * Swappable site configuration.
 *
 * Everything here is a placeholder-friendly value the band can swap without
 * touching component code. The README flags the streaming / video / press-kit
 * links as "need real values before launch" — they live here, NOT hardcoded in
 * the markup, so they are trivial to replace.
 */

export const siteConfig = {
  contact: {
    email: "caribbeanvoodoo.ok@gmail.com",
    whatsapp: "+52 984 130 0825",
  },

  /**
   * Streaming / listen links.
   * Spotify / Apple Music / "Más plataformas" all point at the band's DistroKid
   * HyperFollow smart link, which fans out to every platform from one page.
   */
  streaming: {
    spotify: "https://distrokid.com/hyperfollow/caribbeanvoodoo/serpientes",
    youtube: "https://www.youtube.com/@caribbeanvoodoo",
    appleMusic: "https://distrokid.com/hyperfollow/caribbeanvoodoo/serpientes",
    more: "https://distrokid.com/hyperfollow/caribbeanvoodoo/serpientes",
  },

  /**
   * "Ver" live session.
   * The real video is resolved automatically at request time from the band's
   * YouTube channel (see src/app/api/latest-video/route.ts and Ver.tsx).
   * `posterHref` below is only the fallback used if that resolution fails.
   */
  video: {
    posterHref: "https://www.youtube.com/results?search_query=Caribbean+Voodoo+en+vivo",
    caption: "from the garden · vol. 1",
  },

  /** Band's YouTube channel, used to auto-resolve the latest upload for "Ver". */
  youtubeChannelHandle: "@caribbeanvoodoo",

  /**
   * Press kit.
   * TODO(launch): confirm this is the file you want public, or swap for an
   * updated press kit.
   */
  pressKitUrl: "/press/CaribbeanPress.pdf",

  social: {
    instagram: "https://instagram.com/caribbeanvoodoo",
    youtube: "https://www.youtube.com/@caribbeanvoodoo",
    spotify: "https://distrokid.com/hyperfollow/caribbeanvoodoo/serpientes",
  },
} as const;

export type SiteConfig = typeof siteConfig;
