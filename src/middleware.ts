import { NextRequest, NextResponse } from "next/server";
import { getdataFromToken } from "./helpers/getDataFromToken";

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isPublicPath = path === '/login' || path === '/signup';

  try {
    const decoded = await getdataFromToken(req);
    console.log('Decoded token:', decoded);

    const { id } = decoded || {};

    // Redirect to login if accessing protected route without authentication
    if (!isPublicPath && !id) {
      console.log('🔒 Redirecting unauthenticated user to login');
      return NextResponse.redirect(new URL('/login', req.url));
    }

    // Check if user is trying to access someone else's profile
    const profileMatch = path.match(/^\/profile\/([^/]+)/);
    const profileId = profileMatch ? profileMatch[1] : null;
    
    if (profileId && id && id !== profileId) {
      console.log(`🚫 User ${id} trying to access profile ${profileId} - redirecting to own profile`);
      const userProfileUrl = new URL(`/profile/${id}`, req.url);
      return NextResponse.redirect(userProfileUrl);
    }

    // If authenticated user tries to access login/signup, redirect to their profile
    if (isPublicPath && id) {
      console.log('✅ Authenticated user redirected to profile');
      const userProfileUrl = new URL(`/profile/${id}`, req.url);
      return NextResponse.redirect(userProfileUrl);
    }

    // Allow access - everything is fine
    return NextResponse.next();

  } catch (error) {
    console.log('Error in middleware:', error);
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: ['/', '/profile/:path*', '/login', '/signup']
};  