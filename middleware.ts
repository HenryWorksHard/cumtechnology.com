import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// COMING SOON MODE - Set to false to disable
const COMING_SOON_MODE = false

// Paths that should bypass coming soon (API routes, assets, etc)
const BYPASS_PATHS = [
  '/coming-soon',
  '/api',
  '/_next',
  '/favicon.ico',
  '/cumshot.png',
  '/cummy.png',
  '/woody.png',
  '/johnny.png',
  '/frederick.png',
  '/noose.png',
]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // If coming soon mode is disabled, allow all traffic
  if (!COMING_SOON_MODE) {
    return NextResponse.next()
  }

  // Check if path should bypass
  const shouldBypass = BYPASS_PATHS.some(path => pathname.startsWith(path))
  
  if (shouldBypass) {
    return NextResponse.next()
  }

  // Redirect all other traffic to coming soon
  const url = request.nextUrl.clone()
  url.pathname = '/coming-soon'
  return NextResponse.rewrite(url)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.gif|.*\\.svg|.*\\.ico|.*\\.mp4|.*\\.mov|.*\\.webp).*)',
  ],
}
