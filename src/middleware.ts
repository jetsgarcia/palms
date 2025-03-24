import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export default async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  });

  const unprotectedRoutes = ["/login", "/", "/change-password"];
  // Check if the current route is unprotected
  const isUnprotectedRoute = unprotectedRoutes.includes(
    request.nextUrl.pathname
  );

  // Redirect unauthenticated users trying to access protected routes to login
  if (!token && !isUnprotectedRoute) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect to change password for first time login
  if (
    token &&
    token.firstLogin &&
    request.nextUrl.pathname !== "/change-password"
  ) {
    const changePasswordUrl = new URL("/change-password", request.url);
    return NextResponse.redirect(changePasswordUrl);
  }

  // Redirect authenticated users trying to access login page to home
  if (token && request.nextUrl.pathname === "/login") {
    const homeUrl = new URL("/", request.url);
    return NextResponse.redirect(homeUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
