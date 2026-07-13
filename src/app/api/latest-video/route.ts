import { NextResponse } from "next/server";
import { siteConfig } from "@/data/site.config";
import { resolveLatestVideoId } from "@/lib/youtube";

/**
 * Exposes the latest-upload resolver as an endpoint (useful for manual
 * verification/debugging). Ver.tsx calls `resolveLatestVideoId` directly as a
 * server component rather than hitting this route over HTTP.
 */
export async function GET(): Promise<NextResponse<{ videoId: string | null }>> {
  const videoId = await resolveLatestVideoId(siteConfig.youtubeChannelHandle);
  return NextResponse.json({ videoId });
}
