import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Demo gate: before entering any blog section, visitors are sent to /login.
 * "Signing in" on the login page simply drops a cookie (any credentials work),
 * so this is a soft gate — not a real auth system. Swap the cookie check for
 * real session validation before going live.
 */
const AUTH_COOKIE = 'crypto-pulse-auth';

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const authed = request.cookies.get(AUTH_COOKIE)?.value === '1';

  // Already signed in — don't park them on the login page.
  if (pathname === '/login' && authed) {
    const url = request.nextUrl.clone();
    url.pathname = '/';
    url.search = '';
    return NextResponse.redirect(url);
  }

  // Protected section — bounce to /login and remember where they were heading.
  if (pathname !== '/login' && !authed) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    url.search = `?next=${encodeURIComponent(`${pathname}${search || ''}`)}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  // Blog pages only. /login passes through so the form can render, and the
  // cookie set there is evaluated on the next navigation. Public assets
  // (/ads/..., /_next/...) are not matched.
  matcher: ['/', '/posts/:path*', '/category/:path*', '/login'],
};