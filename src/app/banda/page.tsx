import { BandPage } from "@/components/EditorialPages";
import { staticMetadata } from "@/lib/seo";
export const metadata = staticMetadata("band", "es");
export default function Page() {
  return <BandPage locale="es" />;
}
