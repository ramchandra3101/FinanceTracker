// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This middleware runs on the edge and protects routes
export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const isLoggedIn = !!token;
  
  // Check if the user is trying to access a protected route
  if (request.nextUrl.pathname.startsWith('/dashboard') && !token) {
    // Redirect to login if not authenticated
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  // If the user is authenticated and tries to access login/signup pages
  if ((request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/signup') && token) {
    // Redirect to dashboard if already authenticated
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  return NextResponse.next();
}

// Configure which paths this middleware is run for
export const config = {
  matcher: ['/dashboard/:path*', '/login', '/signup'],
};