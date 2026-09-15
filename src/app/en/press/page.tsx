import { PressPage } from "@/components/EditorialPages";
import { staticMetadata } from "@/lib/seo";
export const metadata = staticMetadata("press", "en");
export default function Page() {
  return <PressPage locale="en" />;
}
