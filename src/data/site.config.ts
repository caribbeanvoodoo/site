/**
 * Swappable site configuration.
 *
 * Everything here is a placeholder-friendly value the band can swap without
 * touching component code. The README flags the streaming / video / press-kit
 * links as "need real values before launch" — they live here, NOT hardcoded in
 * the markup, so they are trivial to replace.
 */

/** Canonical origin. Used for metadataBase, sitemap, robots and JSON-LD. */
export const SITE_URL = "https://caribbeanvoodoo.mx";

export const siteConfig = {
  contact: {
    email: "caribbeanvoodoo.ok@gmail.com",
    /** Display form. */
    whatsapp: "+52 984 130 0825",
    /** Click-to-chat: wa.me needs digits only, no "+" or spaces. */
    whatsappUrl: "https://wa.me/529841300825",
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
   * "Ver" section video — an explicitly pinned YouTube video.
   *
   * This is deliberately NOT auto-resolved. An earlier version fetched the
   * channel's "latest" upload from the RSS feed, but that feed is not reliably
   * newest-first and it silently embedded an unrelated 2020 video, which
   * contradicted the section copy.
   *
   * Currently: "Kamikaze" (official video, first single from the 2026 concept
   * album DarkPsycho Metamorphosis).
   * To swap: change `videoId` here and update the `ver.*` copy in
   * src/i18n/dictionaries.ts to match. That is the only change needed.
   */
  video: {
    videoId: "xUW1N8X0d70",
    caption: "kamikaze · video oficial",
  },

  /** Band's YouTube channel. */
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
