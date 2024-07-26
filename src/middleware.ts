import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === "/login";
  let token = request.cookies.get("auth")?.value || "";

  if (token && isPublicPath) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/"],
};
