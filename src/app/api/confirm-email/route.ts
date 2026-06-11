import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");
  const base = request.nextUrl.origin;

  if (!token) {
    return NextResponse.redirect(new URL("/login?error=invalid-token", base));
  }

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(
    `${apiUrl}/api/auth/email-confirmation?confirmation=${token}`
  ).catch(() => null);

  if (!res || !res.ok) {
    return NextResponse.redirect(
      new URL("/login?error=confirmation-failed", base)
    );
  }

  return NextResponse.redirect(new URL("/login?confirmed=true", base));
}
