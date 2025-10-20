import { connect } from "@/app/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt  from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    // Connect to database
    await connect();

    // Parse request body
    const { email, password } = await req.json();
    console.log('Login attempt for email:', email);
    console.log('password recieve is :',password)

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" }, 
        { status: 400 }
      );
    }

    // Find user by email
    const user = await User.findOne({ email });

    console.log('user with this email is :',user);

    if (!user) {
      return NextResponse.json(
        { message: "Invalid credentials" }, 
        { status: 401 }
      );
    }

    
    const isPasswordValid = await bcrypt.compare(password, user.password);
   

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid credentials" }, 
        { status: 401 }
      );
    }
 
    // Remove password from response
    const userObject = user.toObject();
    delete userObject.password;

    // creating token data

    const tokenData = {
        id: userObject._id,
        email: userObject.email,
        username: userObject.username,
    };

    // generting jwt token

    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: '1d' });


    const response =  NextResponse.json(
      { 
        message: "Login successful", 
        user: userObject 
      }, 
      { status: 200 }
    );

    response.cookies.set('token', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60, // 1 day in seconds
    });

    return response;

  } catch (error: unknown) {
    console.error('Login error:', error);
    
    const errorObj = error as Error;
    
    return NextResponse.json(
      { 
        message: "Internal Server Error", 
        error: errorObj.message || 'Unknown error' 
      }, 
      { status: 500 }
    );
  }
}