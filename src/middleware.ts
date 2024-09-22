// middleware.ts

import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;
    const isLoggedIn = !!token;
    const role = token?.role || 'CUSTOMER';

    if (pathname === '/' && isLoggedIn && role === 'OWNER') {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    if (pathname.startsWith('/dashboard') && isLoggedIn && role === 'CUSTOMER') {
      return NextResponse.redirect(new URL('/catalog', req.url));
    }

    if (pathname.startsWith('/dashboard') && !isLoggedIn) {
      return NextResponse.redirect(new URL('/', req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: () => true,
    },
  }
);

// Specify which routes to apply the middleware to
export const config = {
  matcher: ['/', '/dashboard/:path*', '/catalog/:path*', '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
