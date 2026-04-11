import { Route } from "next"
import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  // Check for auth cookie (atk = access token)
  const { pathname, searchParams } = request.nextUrl;
  const authCookie = request.cookies.get('atk');
  const isAuthenticated = !!authCookie?.value;

  if (searchParams.get('invalid') === '1') {
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete('atk');
    return response;
  }

  // If user is on login page and already authenticated, redirect to admin
  if (pathname === "/login" && isAuthenticated) {
    return NextResponse.redirect(new URL("/adminup", request.url));
  }

  // If user is not authenticated and trying to access admin pages, redirect to login
  if (!isAuthenticated && pathname.startsWith("/adminup")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config: { matcher: Route[] } = {
  matcher: [
    "/adminup/:path*",
    "/login"
  ],
}
