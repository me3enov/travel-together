import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const gameState = request.cookies.get('gameState')?.value;

    // Логика для состояния "not_started"
    if (!gameState || gameState === 'not_started') {
        // Если игра не начата, разрешаем доступ только к главной странице
        if (pathname !== '/') {
            return NextResponse.redirect(new URL('/', request.url));
        }
    }

    // Логика для состояния "in_progress"
    if (gameState === 'in_progress') {
        const currentRound = request.cookies.get('currentRound')?.value || '1';
        const currentSelection = request.cookies.get('currentSelection')?.value || '1';
        const isRescue = request.cookies.get('isRescue')?.value === 'true';

        const targetUrl = isRescue
            ? `/round/${currentRound}/rescue`
            : `/round/${currentRound}/${currentSelection}`;

        // Если пользователь пытается попасть на любую страницу, кроме текущего раунда, редиректим его
        if (pathname !== targetUrl) {
            return NextResponse.redirect(new URL(targetUrl, request.url));
        }
    }

    // Логика для состояния "completed"
    if (gameState === 'completed') {
        // Если игра завершена, разрешаем доступ только к странице результатов
        if (pathname !== '/result') {
            return NextResponse.redirect(new URL('/result', request.url));
        }
    }

    return NextResponse.next();
}

// Применяем middleware ко всем страницам
export const config = {
    matcher: ['/', '/round/:path*', '/result'],
};
