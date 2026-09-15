import type { Show } from "@/data/shows";
// If no end time is known, keep the event visible through its venue-local day.
// This avoids hiding a show when doors open, or guessing a made-up duration.
export function isPastShow(show: Show, now: number): boolean {
  if (show.endDateTime) return Date.parse(show.endDateTime) <= now;
  const offset = show.startDateTime.match(/(Z|[+-]\d{2}:\d{2})$/)?.[1] ?? "Z";
  return (
    Date.parse(`${show.startDateTime.slice(0, 10)}T23:59:59.999${offset}`) < now
  );
}
export function upcomingShows(shows: Show[], now: number) {
  return shows
    .filter(
      (show) =>
        !isPastShow(show, now) && (!show.status || show.status === "scheduled"),
    )
    .sort((a, b) => Date.parse(a.startDateTime) - Date.parse(b.startDateTime));
}
