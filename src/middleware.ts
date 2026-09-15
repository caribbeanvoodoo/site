import { NextResponse, type NextRequest } from "next/server";
// Override any caller header: only the URL determines the rendered language.
export function middleware(request: NextRequest) {
  const headers = new Headers(request.headers);
  const path = request.nextUrl.pathname;
  headers.set(
    "x-cv-locale",
    path === "/en" || path.startsWith("/en/") ? "en" : "es",
  );
  return NextResponse.next({ request: { headers } });
}
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|assets|press/|favicon.ico|icon.png|apple-icon.png|robots.txt|sitemap.xml).*)",
  ],
};
