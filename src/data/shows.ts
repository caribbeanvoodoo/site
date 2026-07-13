export interface Show {
  city: string;
  venue: string;
  date: string;
  /** Optional ticket link; falls back to the #lista anchor when absent. */
  ticketsUrl?: string;
}

/**
 * Upcoming shows.
 *
 * Fechas auto-switches between its two states based on this array:
 *   - empty  -> "Nuevas fechas muy pronto" (honest placeholder)
 *   - filled -> "Próximas fechas" list
 *
 * Currently empty by design (no tour booked). To go live with dates, add rows:
 *
 *   { city: "Guadalajara", venue: "C3 Stage",         date: "14 mar" },
 *   { city: "León, Gto.",  venue: "Foro Paruno",      date: "22 mar" },
 *   { city: "Tulum",       venue: "Batey Mojito Bar", date: "05 abr" },
 */
export const shows: Show[] = [];
