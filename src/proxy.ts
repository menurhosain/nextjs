import { NextRequest, NextResponse } from "next/server";
import { verify_jwt } from "@/services/auth.service";

const AUTH_ROUTES = ["/login", "/register-applicant", "/register-contractor"];

const PROTECTED_ROUTES = [
  "/dashboard",
  "/profile",
  "/applications",
  "/contractor-applications",
  "/protected",
];

// Match only slug-based apply routes, e.g. /apply-for-recrutement/some-job
const APPLICANT_ONLY_PATTERN = /^\/apply-for-recrutement\/.+/;
const CONTRACTOR_ONLY_PATTERN = /^\/apply-for-contractor\/.+/;
const SUBCONTRACTED_APPLY_PATTERN = /^\/apply-for-subcontractor\/.+/;

export async function proxy(request: NextRequest) {
  const jwt = request.cookies.get("jwt")?.value;
  const { pathname } = request.nextUrl;

  const isAuthRoute = AUTH_ROUTES.includes(pathname);
  const isApplicantOnly = APPLICANT_ONLY_PATTERN.test(pathname);
  const isContractorOnly = CONTRACTOR_ONLY_PATTERN.test(pathname);
  const isSubcontractedApply = SUBCONTRACTED_APPLY_PATTERN.test(pathname);
  const isProtected =
    PROTECTED_ROUTES.some((r) => pathname.startsWith(r)) ||
    isApplicantOnly ||
    isContractorOnly ||
    isSubcontractedApply;

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

  const userType = (user as Record<string, unknown>).type;


  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-user", JSON.stringify(user));
  requestHeaders.set("x-locale", locale);

  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon\\.ico).*)"],
};
