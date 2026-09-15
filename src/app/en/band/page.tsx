import { BandPage } from "@/components/EditorialPages";
import { staticMetadata } from "@/lib/seo";
export const metadata = staticMetadata("band", "en");
export default function Page() {
  return <BandPage locale="en" />;
}
