// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const pathname = url.pathname;

  // protéger les routes de candidature (ex: /jobs/:id ou /apply)
  const protect = pathname.startsWith("/jobs/") && pathname.endsWith("/apply")
                || pathname === "/apply";

  if (protect) {
    // on regarde si accessToken cookie présent
    const token = req.cookies.get("accessToken")?.value;
    if (!token) {
      url.pathname = "/auth/signin";
      url.searchParams.set("returnTo", pathname);
      return NextResponse.redirect(url);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/apply/:path*", "/jobs/:path*/apply"],
};
