/**
 * Swappable site configuration.
 *
 * Public artist identities, contact and featured video. Release-specific links
 * and copy live in albums.ts and releases.ts.
 */

/** Canonical origin. Used for metadataBase, sitemap, robots and JSON-LD. */
export const SITE_URL = "https://www.caribbeanvoodoo.mx";

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
   * Legacy Serpientes defaults. Pages use the release-specific data in albums.ts.
   */
  streaming: {
    spotify: "https://open.spotify.com/album/4dZoeDvZrNxCkpsVL7MpUf",
    youtube: "https://www.youtube.com/@caribbeanvoodoo",
    appleMusic: "https://music.apple.com/us/album/serpientes/1788897239",
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
   * src/i18n/dictionaries.ts to match. Also verify uploadDate and duration
   * for VideoObject metadata and the release data in releases.ts.
   */
  video: {
    videoId: "xUW1N8X0d70",
    caption: "kamikaze · video oficial",
    captionEn: "kamikaze · official video",
    // Verified against the public YouTube watch page, 2026-09-15.
    uploadDate: "2026-08-16T22:34:29-07:00",
    duration: "PT2M46S",
  },

  /** Band's YouTube channel. */
  youtubeChannelHandle: "@caribbeanvoodoo",

  /**
   * Press kit.
   * Current designed PDF. Keep this URL stable when replacing the file.
   */
  pressKitUrl: "/press/CaribbeanPress.pdf",

  social: {
    appleMusic: "https://music.apple.com/us/artist/caribbean-voodoo/1527192596",
    instagram: "https://instagram.com/caribbeanvoodoo",
    youtube: "https://www.youtube.com/@caribbeanvoodoo",
    spotify: "https://open.spotify.com/artist/6SWFy2ybNR8lIUiSnhQsCU",
  },
} as const;

export type SiteConfig = typeof siteConfig;
