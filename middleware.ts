import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// COMING SOON MODE - Set to false to disable
const COMING_SOON_MODE = false

// MAINTENANCE MODE - Set to false to bring the site back
const MAINTENANCE_MODE = true

// Paths that should bypass coming soon (API routes, assets, etc)
const BYPASS_PATHS = [
  '/coming-soon',
  '/maintenance',
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

  // If no pause mode is active, allow all traffic
  if (!COMING_SOON_MODE && !MAINTENANCE_MODE) {
    return NextResponse.next()
  }

  // Check if path should bypass
  const shouldBypass = BYPASS_PATHS.some(path => pathname.startsWith(path))

  if (shouldBypass) {
    return NextResponse.next()
  }

  // Redirect all other traffic to the active pause page
  const url = request.nextUrl.clone()
  url.pathname = MAINTENANCE_MODE ? '/maintenance' : '/coming-soon'
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
