import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { fetchFirstLogin } from "./actions/auth";

const unprotectedRoutes = ["/login", "/", "/change-password"];

export default async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
  });
  const { pathname } = request.nextUrl;

  const isUnprotectedRoute = unprotectedRoutes.includes(pathname);

  // Redirect unauthenticated users trying to access protected routes
  if (!token && !isUnprotectedRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Prevent authenticated users from accessing the login and landing page
  if (pathname === "/login" || pathname === "/") {
    if (token?.role === "STUDENT") {
      return NextResponse.redirect(new URL("/student", request.url));
    }

    if (token?.role === "ADMIN") {
      return NextResponse.redirect(new URL("/admin", request.url));
    }

    if (token?.role === "INSTRUCTOR") {
      return NextResponse.redirect(new URL("/instructor", request.url));
    }
  }

  // Restrict access based on roles
  if (pathname.startsWith("/admin") && token?.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (pathname.startsWith("/student") && token?.role !== "STUDENT") {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (pathname.startsWith("/instructor") && token?.role !== "INSTRUCTOR") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Only fetch firstLogin if user is authenticated
  try {
    const response = await fetchFirstLogin(token?.id as string);
    console.log("first login:", response.ok && response.firstLogin);
    if (response.ok && response.firstLogin && pathname !== "/change-password") {
      console.log("Redirecting to change password page");
      return NextResponse.redirect(new URL("/change-password", request.url));
    }
  } catch (error) {
    console.error(error);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
