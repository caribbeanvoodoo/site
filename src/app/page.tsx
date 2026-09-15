import { HomePage } from "@/components/HomePage";
import { staticMetadata } from "@/lib/seo";
export const metadata = staticMetadata("home", "es");
export default function Page() {
  return <HomePage locale="es" />;
}
