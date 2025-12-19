import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
    const token = request.cookies.get('access_token')?.value
    const isAdminSession = request.cookies.get('admin_session')?.value === 'true'

    const { pathname } = request.nextUrl

    const isAuthPage = pathname.startsWith('/auth')
    const isProtectedRoute =
        pathname.startsWith('/espace-candidat') ||
        pathname.startsWith('/espace-recruteur')

    if (!token && isProtectedRoute) {
        return NextResponse.redirect(new URL('/auth/signin', request.url))
    }

    if (token && isAuthPage) {
        return NextResponse.redirect(new URL('/', request.url))
    }


    const isAdminRoute = pathname.startsWith('/admin')
    const isAdminLogin = pathname === '/admin/login'


    if (isAdminRoute && !isAdminLogin && !isAdminSession) {
        return NextResponse.redirect(new URL('/admin/login', request.url))
    }


    if (isAdminLogin && isAdminSession) {
        return NextResponse.redirect(new URL('/admin', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/auth/:path*',
        '/espace-candidat/:path*',
        '/espace-recruteur/:path*',
        '/admin/:path*',
    ],
}
