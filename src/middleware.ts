import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;
  const isAdminSession = request.cookies.get("admin_session")?.value === "true";

  const { pathname } = request.nextUrl;

  /* ---------------- ADMIN ---------------- */

  const isAdminRoute = pathname.startsWith("/admin");
  const isAdminLogin = pathname === "/admin/login";

  // admin non connecté
  if (isAdminRoute && !isAdminLogin && (!isAdminSession || !token)) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  // admin déjà connecté
  if (isAdminLogin && isAdminSession && token) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
  ],
};