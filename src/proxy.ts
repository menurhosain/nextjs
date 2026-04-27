import { NextRequest, NextResponse } from "next/server";
import { verify_jwt } from "@/services/auth.service";

const AUTH_ROUTES = ["/login", "/register"];

const PROTECTED_ROUTES = [
  "/dashboard",
  "/profile",
  "/apply-for-recrutement",
  "/apply-for-contractor",
  "/applications",
  "/protected",
];

const APPLICANT_ONLY_ROUTES = ["/apply-for-recrutement"];
const CONTRACTOR_ONLY_ROUTES = ["/apply-for-contractor"];

export async function proxy(request: NextRequest) {
  const jwt = request.cookies.get("jwt")?.value;
  const { pathname } = request.nextUrl;

  const isAuthRoute = AUTH_ROUTES.includes(pathname);
  const isProtected = PROTECTED_ROUTES.some((r) => pathname.startsWith(r));

  const user = jwt ? await verify_jwt(jwt) : null;

  if (!user) {
    if (isProtected) {
      return NextResponse.redirect(new URL("/login", request.nextUrl));
    }
    return NextResponse.next();
  }

  if (isAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  }

  const userType = (user as Record<string, unknown>).type;

  const isApplicantOnly = APPLICANT_ONLY_ROUTES.some((r) =>
    pathname.startsWith(r),
  );
  if (isApplicantOnly && userType === "contractor") {
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  }

  const isContractorOnly = CONTRACTOR_ONLY_ROUTES.some((r) =>
    pathname.startsWith(r),
  );
  if (isContractorOnly && userType !== "contractor") {
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-user", JSON.stringify(user));

  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon\\.ico).*)"],
};
