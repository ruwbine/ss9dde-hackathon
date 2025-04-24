import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_ROUTES = ['/login'];

export function middleware(req: NextRequest) {
	const token = req.cookies.get('access_token')?.value;

	const isPublic = PUBLIC_ROUTES.includes(req.nextUrl.pathname);
	const isAuth = Boolean(token);

	if (!isAuth && !isPublic) {
		return NextResponse.redirect(new URL('/login', req.url));
	}

	if (isAuth && req.nextUrl.pathname === '/login') {
		return NextResponse.redirect(new URL('/', req.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/((?!_next|favicon.ico).*'],
};
