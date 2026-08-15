import { siteConfig } from "./site.config";

export interface Show {
  /** URL segment: /fechas/<slug> */
  slug: string;
  /** Event name used in the page title and structured data. */
  name: string;
  city: string;
  venue: string;
  /**
   * Full street address for the venue. Required for rich Google event results.
   * TODO(address): placeholders for now — replace with real street addresses.
   */
  address: string;
  /** ISO 8601 with the venue's UTC offset. Quintana Roo = -05:00, Guanajuato = -06:00. */
  startDateTime: string;
  /** True when only the date is known (no confirmed start time yet). */
  timeTBA?: boolean;
  /** Short display date, e.g. "20 ago" / "Aug 20". */
  dateLabel: { es: string; en: string };
  /** Display time, e.g. "9:00 PM". Empty when timeTBA. */
  timeLabel: string;
  presentedBy?: string;
  lineup?: string[];
  /** Cover charge: a MXN amount, "free", or "tba" (not announced yet). */
  cover: number | "free" | "tba";
  /** One or two sentences, brand voice, per locale. */
  description: { es: string; en: string };
  /** Poster/flyer under /assets/events. Optional — page degrades gracefully. */
  flyer?: string;
  /** Primary call to action for the event. */
  cta: {
    href: string;
    label: { es: string; en: string };
    external?: boolean;
  };
}

/** WhatsApp reservation link with a prefilled message for a given event. */
function reserva(text: string): string {
  return `${siteConfig.contact.whatsappUrl}?text=${encodeURIComponent(text)}`;
}

/**
 * Upcoming shows. A non-empty array flips the Fechas section from the
 * "muy pronto" placeholder to the listed layout, and each entry gets its own
 * SEO page at /fechas/<slug>.
 */
export const shows: Show[] = [
  {
    slug: "karunna-leon-ago-2026",
    name: "Caribbean Voodoo en Karunna — León",
    city: "León, Gto.",
    venue: "Karunna",
    address: "León, Guanajuato, México", // TODO(address): full street address
    startDateTime: "2026-08-20T21:00:00-06:00",
    dateLabel: { es: "20 ago", en: "Aug 20" },
    timeLabel: "9:00 PM",
    presentedBy: "Karunna",
    lineup: ["Caribbean Voodoo", "MODUK"],
    cover: 100,
    description: {
      es: "Karunna presenta a Caribbean Voodoo, la banda de rock and roll tropical desde Tulum, con los invitados especiales MODUK. Música en vivo, cocteles y buena vibra en León. Reserva tu lugar.",
      en: "Karunna presents Caribbean Voodoo — tropical rock and roll from Tulum — with special guests MODUK. Live music, cocktails, and good vibes in León. Reserve your spot.",
    },
    flyer: undefined, // TODO(flyer): /assets/events/karunna-leon.jpg
    cta: {
      href: reserva(
        "Hola, quiero reservar para Caribbean Voodoo en Karunna, León — jueves 20 de agosto.",
      ),
      label: { es: "Reserva tu lugar", en: "Reserve your spot" },
      external: true,
    },
  },
  {
    slug: "rockstar-burger-leon-ago-2026",
    name: "Caribbean Voodoo en Rockstar Burger — León",
    city: "León, Gto.",
    venue: "Rockstar Burger, Sucursal Feria de León",
    address: "León, Guanajuato, México", // TODO(address): full street address
    startDateTime: "2026-08-22T19:00:00-06:00",
    dateLabel: { es: "22 ago", en: "Aug 22" },
    timeLabel: "7:00 PM",
    presentedBy: "Rockstar Production",
    lineup: ["Caribbean Voodoo"],
    cover: "free",
    description: {
      es: "Caribbean Voodoo en el escenario de la resistencia de México. Sin cover, sin consumo mínimo, y transmisión por Facebook Live desde Rockstar Burger, Feria de León.",
      en: "Caribbean Voodoo on Mexico's stage of resistance. No cover, no minimum, and a Facebook Live broadcast from Rockstar Burger, Feria de León.",
    },
    flyer: undefined, // TODO(flyer): /assets/events/rockstar-leon.jpg
    cta: {
      href: "/#lista",
      label: { es: "Avísame primero", en: "Notify me first" },
    },
  },
  {
    slug: "mora-mora-cancun-ago-2026",
    name: "Caribbean Voodoo en Cancún — Mora Mora",
    city: "Cancún, Q. Roo",
    venue: "Mora Mora",
    address: "Avenida Palenque 10, SM 62, MZ 5, Lote 24, 77500 Cancún, Quintana Roo, México",
    startDateTime: "2026-08-29T20:00:00-05:00",
    dateLabel: { es: "29 ago", en: "Aug 29" },
    timeLabel: "8:00 PM",
    lineup: ["Caribbean Voodoo"],
    cover: "tba",
    description: {
      es: "Caribbean Voodoo en vivo en Cancún, en Mora Mora. Una noche de rock and roll crudo y potente. Sábado 29 de agosto.",
      en: "Caribbean Voodoo live in Cancún, at Mora Mora. A night of raw, powerful rock and roll. Saturday, August 29.",
    },
    flyer: undefined, // TODO(flyer): /assets/events/mora-mora-cancun.jpg
    cta: {
      href: "/#lista",
      label: { es: "Avísame primero", en: "Notify me first" },
    },
  },
];

/** Lookup helper for the per-event route. */
export function getShow(slug: string): Show | undefined {
  return shows.find((s) => s.slug === slug);
}
