import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { authKey } from "./constant/authKey";
import { decodedToken } from "./utils/jwt";

const commonPrivateRoutes = ["/dashboard"];
const authRoutes = ["/login"];

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  const accessToken = (await cookies()).get(authKey)?.value;

  if (!accessToken) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  let userProfile;
  if (accessToken) {
    try {
      userProfile = decodedToken(accessToken);

      if (!userProfile) {
        console.log("Token decode failed, redirecting to login");
        return NextResponse.redirect(new URL("/login", request.url));
      }
    } catch (error) {
      console.error("Error in middleware token decode:", error);
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (commonPrivateRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // For all other routes, allow access
  return NextResponse.next();
}

// Configure which routes this middleware should run on
export const config = {
  matcher: ["/dashboard/:path*"],
};
