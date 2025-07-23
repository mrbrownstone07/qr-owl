import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  // Only run auth middleware for protected routes
  if (req.nextUrl.pathname.startsWith('/dashboard') ||
    req.nextUrl.pathname.startsWith('/api/')) {

    try {
      const supabase = createMiddlewareClient({ req, res })
      await supabase.auth.getSession()
    } catch (error) {
      // Continue without auth if there's an error
      console.warn('Auth middleware error:', error)
    }
  }

  return res
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/api/:path*',
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}