import { NextRequest, NextResponse } from "next/server";
import { verify_jwt } from "@/services/auth.service";

export async function proxy(request: NextRequest) {
  const jwt = request.cookies.get("jwt")?.value;

  if (!jwt) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  const user = await verify_jwt(jwt);

  if (!user) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-user", JSON.stringify(user));

  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: [
    "/protected/:path*",
    "/apply-for-recrutement/:path*",
    "/apply-for-recrutement",
    "/profile",
    "/profile/:path*",
  ],
};
