/**
 * Resolves a channel's most recent upload with no API key:
 *   1. Fetch the channel page to extract its channelId (RSS needs the ID, not the @handle).
 *   2. Fetch the channel's public RSS feed and read the first entry's video ID.
 *
 * Both requests are cached for an hour via Next's fetch `revalidate`, so this
 * doesn't hit YouTube on every page load. Returns null on any failure so
 * callers can fall back gracefully (never throws).
 */

async function resolveChannelId(handle: string): Promise<string | null> {
  const url = `https://www.youtube.com/${handle}`;
  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) return null;
  const html = await res.text();
  // YouTube's channel page embeds the ID in a few different spots depending
  // on layout version — try the canonical link first, then known JSON keys.
  const canonical = html.match(
    /<link rel="canonical" href="https:\/\/www\.youtube\.com\/channel\/(UC[0-9A-Za-z_-]{22})"/,
  );
  if (canonical) return canonical[1];
  const jsonKey = html.match(/"(?:channelId|externalId)":"(UC[0-9A-Za-z_-]{22})"/);
  return jsonKey ? jsonKey[1] : null;
}

async function fetchLatestVideoId(channelId: string): Promise<string | null> {
  const url = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) return null;
  const xml = await res.text();
  const match = xml.match(/<yt:videoId>([\w-]{11})<\/yt:videoId>/);
  return match ? match[1] : null;
}

export async function resolveLatestVideoId(handle: string): Promise<string | null> {
  try {
    const channelId = await resolveChannelId(handle);
    if (!channelId) return null;
    return await fetchLatestVideoId(channelId);
  } catch (err) {
    console.error("[youtube] latest video resolution failed", err);
    return null;
  }
}
