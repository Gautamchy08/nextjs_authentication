import { connect } from "@/app/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

// Connect to database
await connect();
export async function POST(req: NextRequest) {
    try {

        // Parse request body
        const requestBody = await req.json();
        const { username, email, password } = requestBody;

        // Validate required fields
        if (!username || !email || !password) {
            return NextResponse.json(
                { message: "All fields are required" }, 
                { status: 400 }
            );
        }

        // Check if user already exists
        const existingUser = await User.findOne({
            $or: [{ email }, { username }]
        });

        if (existingUser) {
            return NextResponse.json(
                { message: "User with given email or username already exists",existingUser }, 
                { status: 409 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Create new user
        const newUser = new User({
            username, 
            email, 
            password: hashedPassword
        });

        // Save user to database
        const savedUser = await newUser.save();

        // Remove password from response
        const userObject = savedUser.toObject();
        delete userObject.password;

        // send verification email

        await sendEmail({
            email: userObject.email,
            emailType: 'VERIFY',
            userId: userObject._id.toString()
        });

        return NextResponse.json(
            { 
                message: "User registered successfully", 
                user: userObject 
            }, 
            { status: 201 }
        );

    } catch (error: unknown) {
        console.error('Signup error:', error);
        
        const errorObj = error as Error & { code?: number; name?: string };
        
        // Handle specific MongoDB errors
        if (errorObj.code === 11000) {
            return NextResponse.json(
                { message: "User already exists" }, 
                { status: 409 }
            );
        }

        // Handle validation errors
        if (errorObj.name === 'ValidationError') {
            return NextResponse.json(
                { message: "Invalid data provided", details: errorObj.message }, 
                { status: 400 }
            );
        }

        return NextResponse.json(
            { message: "Internal Server Error", error: errorObj.message || 'Unknown error' }, 
            { status: 500 }
        );
    }
}