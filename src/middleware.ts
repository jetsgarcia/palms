import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const unprotectedRoutes = ["/login", "/", "/change-password"];

async function fetchFirstLogin(userId: string) {
  try {
    const response = await fetch("http://localhost:3000/api/first-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });

    if (!response.ok) throw new Error("Failed to fetch first login status");

    const { user } = await response.json();
    return user?.firstLogin;
  } catch (error) {
    console.error("Error fetching first login status:", error);
    return false;
  }
}

export default async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  });
  const { pathname } = request.nextUrl;

  const isUnprotectedRoute = unprotectedRoutes.includes(pathname);

  // Redirect unauthenticated users trying to access protected routes
  if (!token && !isUnprotectedRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token) {
    // Redirect authenticated users from login page to home
    if (pathname === "/login") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    const firstLogin = await fetchFirstLogin(token.id as string);

    // Redirect users to change password if it's their first login
    if (firstLogin && pathname !== "/change-password") {
      return NextResponse.redirect(new URL("/change-password", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
