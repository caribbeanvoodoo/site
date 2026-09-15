import { notFound } from "next/navigation";
import { MusicPage } from "@/components/EditorialPages";
import { getRelease } from "@/data/releases";
import { releaseMetadata } from "@/lib/seo";
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props) {
  const release = getRelease((await params).slug);
  if (!release) notFound();
  return releaseMetadata(release, "es");
}
export default async function Page({ params }: Props) {
  return <MusicPage locale="es" slug={(await params).slug} />;
}
