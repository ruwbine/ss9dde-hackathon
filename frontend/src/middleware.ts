// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
	const token = req.cookies.get('access_token')?.value;
	const path = req.nextUrl.pathname;

	if (!token && path !== '/login') {
		return NextResponse.redirect(new URL('/login', req.url));
	}

	if (token && path === '/login') {
		return NextResponse.redirect(new URL('/', req.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/((?!_next|favicon.ico|api).*)'],
};
