import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getShow, shows } from "@/data/shows";
import { siteConfig, SITE_URL } from "@/data/site.config";
import { EventPage } from "@/components/EventPage";

export function generateStaticParams() {
  return shows.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const show = getShow(slug);
  if (!show) return {};

  const title = `${show.name} · Caribbean Voodoo`;
  const description = show.description.es;
  const url = `/fechas/${show.slug}`;
  const image = show.flyer ?? "/assets/og.jpg";

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      images: [{ url: image }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export default async function EventRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const show = getShow(slug);
  if (!show) notFound();

  // MusicEvent structured data — this is what earns the rich Google event card.
  const offers =
    show.cover === "free"
      ? { "@type": "Offer", price: "0", priceCurrency: "MXN", availability: "https://schema.org/InStock" }
      : {
          "@type": "Offer",
          price: String(show.cover),
          priceCurrency: "MXN",
          availability: "https://schema.org/InStock",
        };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MusicEvent",
    name: show.name,
    // Date-only when the start time isn't confirmed yet.
    startDate: show.timeTBA ? show.startDateTime.slice(0, 10) : show.startDateTime,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    url: `${SITE_URL}/fechas/${show.slug}`,
    image: `${SITE_URL}${show.flyer ?? "/assets/og.jpg"}`,
    description: show.description.es,
    location: {
      "@type": "Place",
      name: show.venue,
      address: { "@type": "PostalAddress", addressLocality: show.city, streetAddress: show.address, addressCountry: "MX" },
    },
    performer: (show.lineup ?? ["Caribbean Voodoo"]).map((name) => ({
      "@type": "MusicGroup",
      name,
    })),
    ...(show.presentedBy
      ? { organizer: { "@type": "Organization", name: show.presentedBy } }
      : {}),
    offers,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <EventPage show={show} whatsappUrl={siteConfig.contact.whatsappUrl} />
    </>
  );
}
