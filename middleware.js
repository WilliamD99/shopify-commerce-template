import { NextResponse } from 'next/server'

export const config = {
  matcher: ['/my-account/:path*', '/checkout/:path*'],
}

export function middleware(req) {
  // Parse the cookie
  const isLogin = JSON.parse(req.cookies.get('tn') || 'false')
  if (req.nextUrl.pathname.startsWith("/my-account")) {
    // Update url pathname
    req.nextUrl.pathname = `/${isLogin ? 'my-account' : 'my-account/err'}`
    // Rewrite to url
    return NextResponse.rewrite(req.nextUrl)
  } else if (req.nextUrl.pathname.startsWith("/checkout")) {
    req.nextUrl.pathname = `/${isLogin ? 'checkout' : 'my-account/err'}`
    return NextResponse.rewrite(req.nextUrl)
  }
}