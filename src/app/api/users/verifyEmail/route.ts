import {connect} from "@/app/dbConfig/dbConfig";
import User from "@/models/user.model";
import next from "next";
import { NextRequest, NextResponse } from "next/server";

await connect();

export async function POST(req: NextRequest) {
    try {
        const { token } = await req.json();
        if (!token) {
            return NextResponse.json(
                { message: "Verification token is required" },
                { status: 400 }
            );
        }  
        
        console.log('token found to verify email',token)

        const user = await User.findOne({ 
            verifyToken: token,
            verifyTokenExpiry: { $gt: Date.now() } 
        });

            console.log('user found to verify email',user);

            if(!user){
                return NextResponse.json(
                    { message: "Invalid or expired token" },
                    { status: 400 }
                );
            }

            user.verified = true;
            user.verifyToken = undefined;
            user.verifyTokenExpiry = undefined;
            user.isVerified = true;
            await user.save();

            return NextResponse.json(
                { message: "Email verified successfully" },
                { status: 200 }
            );




    } catch (error: unknown) {
        return NextResponse.json(
            { message: "Error verifying email", error: (error as Error).message },
            { status: 500 }
        );
    }
};

