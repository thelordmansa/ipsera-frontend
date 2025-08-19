import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const host = req.headers.get('host') || '';
  if (host === 'app.ipsera.io') {
    const url = req.nextUrl.clone();
    if (!url.pathname.startsWith('/app')) {
      url.pathname = `/app${url.pathname}`;
      return NextResponse.rewrite(url);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|favicon.ico).*)'],
};
