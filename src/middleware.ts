import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authKey } from "./constants/authKey";
import { decodedToken } from "./utils/jwt";

const commonPrivateRoutes = ["/dashboard", "/dashboard/change-password"];

const authRoutes = ["/login", "/register"];

const roleBasedPrivateRoutes = {
  attendee: [/^\/dashboard\/attendee/],
  organizer: [/^\/dashboard\/organizer/],
  admin: [/^\/dashboard\/admin/],
  super_admin: [/^\/dashboard\/super-admin/],
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = cookies().get(authKey)?.value;

  if (!accessToken) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  let userProfile;

  if (accessToken) {
    userProfile = decodedToken(accessToken) as any;
  }

  const roleCap = userProfile?.role;

  const role = roleCap.toLowerCase();

  if (accessToken && commonPrivateRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  //   if (
  //     role &&
  //     roleBasedPrivateRoutes[role as keyof typeof roleBasedPrivateRoutes]
  //   ) {
  //     const routes =
  //       roleBasedPrivateRoutes[role as keyof typeof roleBasedPrivateRoutes];

  //     if (routes.some((route) => pathname.match(route))) {
  //       return NextResponse.next();
  //     }
  //   }

  if (
    accessToken &&
    role === "admin" &&
    pathname.startsWith("/dashboard/admin")
  ) {
    return NextResponse.next();
  }

  if (
    accessToken &&
    role === "organizer" &&
    pathname.startsWith("/dashboard/organizer")
  ) {
    return NextResponse.next();
  }
  if (
    accessToken &&
    role === "super_admin" &&
    pathname.startsWith("/dashboard/super-admin")
  ) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
