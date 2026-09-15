import { EventRoute, eventMetadata } from "@/components/EventRoute";
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props) {
  return eventMetadata((await params).slug, "es");
}
export default async function Page({ params }: Props) {
  return <EventRoute slug={(await params).slug} locale="es" />;
}
