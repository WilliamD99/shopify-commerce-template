import { NextResponse } from "next/server";

export const config = {
  matcher: ["/my-account/:path*", "/checkout/:path*"],
};

export function middleware(req) {
  // Parse the cookie
  const isLogin = req.cookies.get("tn") || false;
  if (req.nextUrl.pathname.startsWith("/my-account")) {
    if (isLogin) {
      if (req.nextUrl.pathname === "/my-account") {
        req.nextUrl.pathname = `/my-account/dashboard`;
      }
    } else {
      req.nextUrl.pathname = `/no-user`;
    }
    // Update url pathname
    // Rewrite to url
    return NextResponse.rewrite(req.nextUrl);
  } else if (req.nextUrl.pathname.startsWith("/checkout")) {
    if (!isLogin) {
      req.nextUrl.pathname = `/no-user`;
    }
    return NextResponse.rewrite(req.nextUrl);
  }
}
