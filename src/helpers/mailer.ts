import nodemailer from 'nodemailer';
import { sendEmailService } from '@/services/mail.service';


type emailType = 'VERIFY' | 'FORGOT_PASSWORD';

interface SendEmailParams { 
    email : string;
    emailType : emailType;
    userId : string;
}




export const sendEmail = async({
    email,
    emailType,
    userId
}: SendEmailParams): Promise<nodemailer.SentMessageInfo> => {

        try {


            const hashedToken = await sendEmailService(email, emailType, userId);

// Looking to send emails in production? Check out our Email API/SMTP product!
const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAIL_TRAP_USER,
    pass: process.env.MAIL_TRAP_PASS
  }
});

const mailOptions = {
    from:'gautamchy8789@gmail.com',
    to : email,
    subject : emailType==='VERIFY' ? 'Verify your email' : 'Reset your password',
    html : `<p>please click the link below to ${emailType==='VERIFY' ? 'verify your email' : 'reset your password'}</p>
    <a href="${process.env.DOMAIN}/${
        emailType==='VERIFY' ? 'verifyEmail' : 'reset-password'
    }?token=${hashedToken}">Click here</a>
    `
};

const mailResponse = await transport.sendMail(mailOptions);
console.log('Mail sent response:', mailResponse);
return mailResponse;



            
        } catch (error) {
          
            throw new Error('Error in sendEmail helper ',error as Error)
        }
    }

