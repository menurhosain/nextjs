import { NextRequest, NextResponse } from "next/server";
import { verify_jwt } from "@/services/auth.service";

const AUTH_ROUTES = ["/login", "/register"];
const APPLICANT_ONLY_ROUTES = ["/apply-for-recrutement"];

export async function proxy(request: NextRequest) {
  const jwt = request.cookies.get("jwt")?.value;
  const { pathname } = request.nextUrl;
  const isAuthRoute = AUTH_ROUTES.includes(pathname);

  if (!jwt) {
    if (isAuthRoute) return NextResponse.next();
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  const user = await verify_jwt(jwt);

  if (!user) {
    if (isAuthRoute) return NextResponse.next();
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  if (isAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  }

  const isApplicantOnly = APPLICANT_ONLY_ROUTES.some((route) =>
    pathname.startsWith(route),
  );
  if (isApplicantOnly && (user as Record<string, unknown>).type === "contractor") {
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-user", JSON.stringify(user));

  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: [
    "/login",
    "/register",
    "/protected/:path*",
    "/apply-for-recrutement/:path*",
    "/apply-for-recrutement",
    "/profile",
    "/profile/:path*",
    "/dashboard",
    "/dashboard/:path*",
  ],
};
