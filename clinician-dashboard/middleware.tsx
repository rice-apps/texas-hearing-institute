import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { format } from 'path'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    // Get some user property
    let name = user.user_metadata.name;
    if (!name) {
      name = user.user_metadata.full_name
    }

    const formattedName = name.toLowerCase().replace(/\s+/g, '-');

    if (request.nextUrl.pathname === '/auth/login') {
      return NextResponse.redirect(new URL(`/dashboard/${formattedName}`, request.url));
    }

    if (request.nextUrl.pathname === '/dashboard') {
      return NextResponse.redirect(new URL(`/dashboard/${formattedName}`, request.url));
    }
  }

  if (!user) {
    if (request.nextUrl.pathname === '/dashboard') {
      return NextResponse.redirect(new URL('/', request.url));
    }

    // More space down here for future redirects if needed
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}