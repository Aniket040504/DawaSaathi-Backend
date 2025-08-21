import twilio from 'twilio';
import dotenv from 'dotenv';

dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID! ;
const authToken = process.env.TWILIO_AUTH_TOKEN! ;
const client = twilio(accountSid,authToken)

export const sendOTPToPhone=async (phone:string, otp:string)=> {
    try{
          const formattedMobile = phone.startsWith('+') ? phone : `+91${phone}`;
          const message=await client.messages.create({
             body:` Dear User, Your OTP for registration is: ${otp}`,
            from: process.env.TWILIO_PHONE_NUMBER!,
             to: formattedMobile
    })

    console.log(`Otp sent to ${formattedMobile}: SID=${message.sid}`);
    return message;
    }
    catch(error){
        console.error("Error sending OTP", error);
        throw new Error('Failed to send OTP');
    }

}


