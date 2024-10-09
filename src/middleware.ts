import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest): NextResponse | undefined {
  const { pathname } = request.nextUrl;
  const gameState = request.cookies.get('gameState')?.value;

  if (!gameState || gameState === 'not_started') {
    if (pathname !== '/') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  if (gameState === 'in_progress') {
    const currentRound = request.cookies.get('currentRound')?.value || '1';
    const currentSelection =
      request.cookies.get('currentSelection')?.value || '1';
    const isRescue = request.cookies.get('isRescue')?.value === 'true';

    const targetUrl = isRescue
      ? `/round/${currentRound}/rescue`
      : `/round/${currentRound}/${currentSelection}`;

    if (pathname !== targetUrl) {
      return NextResponse.redirect(new URL(targetUrl, request.url));
    }
  }

  if (gameState === 'completed') {
    if (pathname !== '/result') {
      return NextResponse.redirect(new URL('/result', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/round/:path*', '/result'],
};
