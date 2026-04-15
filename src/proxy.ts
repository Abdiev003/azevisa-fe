import { NextRequest, NextResponse } from "next/server";

const AUTH_ROUTES = ["/login", "/register"];
const PROTECTED_ROUTES = ["/apply"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAuthRoute = AUTH_ROUTES.includes(pathname);
  const isProtectedRoute = PROTECTED_ROUTES.includes(pathname);

  if (isAuthRoute) {
    const accessToken = request.cookies.get("access_token")?.value;
    if (accessToken) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (isProtectedRoute) {
    const accessToken = request.cookies.get("access_token")?.value;
    if (!accessToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/register", "/apply"],
};
