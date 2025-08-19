import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const host = req.headers.get('host') || '';
  const url = req.nextUrl.clone();

  // Canonical: www.ipsera.io -> ipsera.io (308)
  if (host === 'www.ipsera.io') {
    url.hostname = 'ipsera.io';
    return NextResponse.redirect(url, 308);
  }

  // app.ipsera.io : tout sert /app/*
  if (host === 'app.ipsera.io' && !url.pathname.startsWith('/app')) {
    url.pathname = `/app${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

// Ignorer les assets
export const config = {
  matcher: ['/((?!_next|favicon.ico).*)'],
};

