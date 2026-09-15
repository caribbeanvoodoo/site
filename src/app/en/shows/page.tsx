import { ShowsPage } from "@/components/EditorialPages";
import { staticMetadata } from "@/lib/seo";
export const metadata = staticMetadata("shows", "en");
export default function Page() {
  return <ShowsPage locale="en" />;
}
