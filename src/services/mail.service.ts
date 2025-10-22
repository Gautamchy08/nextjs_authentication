import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import {connect} from "@/app/dbConfig/dbConfig";

type emailType = 'VERIFY' | 'FORGOT_PASSWORD';



export const sendEmailService = async(email: string, emailType: emailType, userId: string) => {
    await connect();
        try {
            const  hashedToken  = await bcrypt.hash(userId.toString(),10);

         if(emailType==='VERIFY'){

            await User.findByIdAndUpdate(userId,{
                verifyToken : hashedToken,
                verifyTokenExpiry : new Date(Date.now() + 20*20*1000) // 20 minutes
            })
         } 
         else if(emailType==='FORGOT_PASSWORD'){

            await User.findByIdAndUpdate(userId,{
                forgetPasswordToken : hashedToken,
                forgetPasswordTokenExpiry : new Date(Date.now() + 20*20*1000) // 20 minutes
            })
         }
         return hashedToken;

        }catch (error) {
            throw new Error('Error in sendEmail helper ',error as Error)
        }
    }