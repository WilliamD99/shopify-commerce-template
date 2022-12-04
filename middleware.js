import { NextResponse } from "next/server";
import { botdEdge } from './lib/botd'

export const config = {
  matcher: ['/', '/blocked'],
};

export default async function middleware(req) {
  if (req.nextUrl.pathname === '/blocked') {
    req.headers.set(
      'user-agent',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/90.0.4430.93 Safari/537.36'
    )
  }
  // Do light bot detection for all paths
  const res = await botdEdge(req, {
    // The request id is excluded for demo purposes because
    // Botd remembers your request id and will always show
    // you the /bot-detected page if you're a bot, and
    // never if you have been identified as a human
    useRequestId: false,
  })

  if (res && res.status !== 200) {
    // Bot detected!
    req.nextUrl.pathname = '/500'
    const rewrite = NextResponse.rewrite(req.nextUrl)
    // Move Botd headers to the rewrite response
    res.headers.forEach((v, k) => rewrite.headers.set(k, v))

    return rewrite
  }
  // Parse the cookie
  const isLogin = req.cookies.get("tn") || false;
  if (req.nextUrl.pathname.startsWith("/my-account")) {
    if (isLogin) {
      if (req.nextUrl.pathname === "/my-account") {
        req.nextUrl.pathname = `/my-account/dashboard/0`;
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
  return res

}
