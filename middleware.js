import { NextResponse } from 'next/server'

export const config = {
  matcher: ['/my-account/:path*', '/checkout/:path*'],
}

export function middleware(req) {
  // Parse the cookie
  const isLogin = (req.cookies.get('tn') || 'false')
  if (req.nextUrl.pathname.startsWith("/my-account")) {
    if (isLogin) {
      if (req.nextUrl.pathname === "/my-account") {
        req.nextUrl.pathname = `/my-account/dashboard`
      }
    } else {
      req.nextUrl.pathname = `/err`
    }
    // Update url pathname
    // Rewrite to url
    return NextResponse.rewrite(req.nextUrl)
  } else if (req.nextUrl.pathname.startsWith("/checkout")) {
    req.nextUrl.pathname = `/${isLogin ? 'checkout' : 'err'}`
    return NextResponse.rewrite(req.nextUrl)
  }
}