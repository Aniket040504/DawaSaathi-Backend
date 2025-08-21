import { Resend } from 'resend'
import dotenv from 'dotenv';

dotenv.config();

const resend=new Resend(process.env.RESEND_API_KEY)

export const sendOTPToEmail=async (email:string,otp:string) => {
    try{
         const htmlContent = `
         <p>Dear User,</p>
      <p>Your OTP for registration is: <strong>${otp}</strong></p>
      <p>This code will expire in 5 minutes.</p>
    `;  
        const message=await resend.emails.send({
        from: process.env.EMAIL_SENDER_ADDRESS as string,
        to: [email],
        subject: 'Verification Code',
        html: htmlContent
     });
       console.log(`OTP sent to ${email}`);
       return message;
    }
    catch(error){
        console.error("Error sending OTP", error);
        throw new Error('Failed to send OTP');
    }
}