import { NextRequest, NextResponse } from "next/server";
import { verify_jwt } from "@/services/auth.service";

export async function middleware(request: NextRequest) {
  const jwt = request.cookies.get("jwt")?.value;

  if (!jwt) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  const user = await verify_jwt(jwt);

  if (!user) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/protected/:path*"],
};
