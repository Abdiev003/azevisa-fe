import { NextRequest, NextResponse } from "next/server";
import { isTokenValid } from "@/lib/auth-token";

const AUTH_ROUTES = ["/login", "/register"];
const PROTECTED_ROUTES = ["/apply"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAuthRoute = AUTH_ROUTES.includes(pathname);
  const isProtectedRoute = PROTECTED_ROUTES.includes(pathname);
  const accessToken = request.cookies.get("access_token")?.value;
  const hasValidAccessToken = isTokenValid(accessToken);

  if (accessToken && !hasValidAccessToken) {
    const response = isProtectedRoute
      ? NextResponse.redirect(new URL("/login", request.url))
      : NextResponse.next();

    response.cookies.delete("access_token");
    response.cookies.delete("refresh_token");
    return response;
  }

  if (isAuthRoute) {
    if (hasValidAccessToken) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (isProtectedRoute) {
    if (!hasValidAccessToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/register", "/apply"],
};
