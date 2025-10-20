import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

interface TokenPayload {
  id: string;
  email: string;
  username: string;
}

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json(
        { message: "No active session" }, 
        { status: 401 }
      );
    }

    // Verify token (optional - we can logout even with invalid tokens)
    try {
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET!) as TokenPayload;
      
      if (!decoded || !decoded.id) {
        return NextResponse.json(
          { message: "Invalid token" }, 
          { status: 401 }
        );
      }
    } catch (tokenError) {
      // Even if token is invalid, we can still clear it
      console.log('Token verification failed during logout:', tokenError);
    }

    // Create response and clear the token
    const response = NextResponse.json({
      message: "Logged out successfully",
      success: true
    });

    response.cookies.set('token', '', {
      httpOnly: true,
      maxAge: 0, // Expire the cookie immediately
    });

    return response;

  } catch (error) {
    console.log('Error during logout:', error);
    return NextResponse.json(
      { message: "Error during logout" }, 
      { status: 500 }
    );
  }
}