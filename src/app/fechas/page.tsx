import { ShowsPage } from "@/components/EditorialPages";
import { staticMetadata } from "@/lib/seo";
export const metadata = staticMetadata("shows", "es");
export default function Page() {
  return <ShowsPage locale="es" />;
}
