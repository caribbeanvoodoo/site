import { HomePage } from "@/components/HomePage";
import { staticMetadata } from "@/lib/seo";
export const metadata = staticMetadata("home", "en");
export default function Page() {
  return <HomePage locale="en" />;
}
