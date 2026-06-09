import { NextRequest, NextResponse } from "next/server";
import { verify_jwt } from "@/services/auth.service";

const AUTH_ROUTES = ["/login", "/register-subcontractor"];

const PROTECTED_ROUTES = [
  "/dashboard",
  "/profile",
  "/contractor-applications",
];

const SUBCONTRACTED_APPLY_PATTERN = /^\/apply-for-subcontractor\/.+/;

export async function proxy(request: NextRequest) {
  const jwt = request.cookies.get("jwt")?.value;
  const { pathname } = request.nextUrl;

  const isAuthRoute = AUTH_ROUTES.includes(pathname);
  const isSubcontractedApply = SUBCONTRACTED_APPLY_PATTERN.test(pathname);
  const isProtected =
    PROTECTED_ROUTES.some((r) => pathname.startsWith(r)) ||
    isSubcontractedApply;

  if (pathname === "/") {
    return NextResponse.redirect(new URL("/subcontracted-projects", request.nextUrl));
  }

  const user = jwt ? await verify_jwt(jwt) : null;

  const locale = request.cookies.get("locale")?.value ?? "en";

  if (!user) {
    if (isProtected) {
      return NextResponse.redirect(new URL("/login", request.nextUrl));
    }
    const headers = new Headers(request.headers);
    headers.set("x-locale", locale);
    return NextResponse.next({ request: { headers } });
  }

  if (isAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-user", JSON.stringify(user));
  requestHeaders.set("x-locale", locale);

  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon\\.ico).*)"],
};
