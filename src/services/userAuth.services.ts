import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { sendOTPToPhone } from '../utils/twilioClient';
import {sendOTPToEmail} from '../utils/resendClient'
import {createUser,findbyphone,updateUser,findbyemail} from '../repositories/userAuth.repositories';
import {createDashboard} from '../repositories/dashboard.repository';
import { IUser} from '../interfaces/IUser';
import { Error } from 'mongoose';


//SIGNUP

export const userSignupservice=async (data:IUser) :Promise<any> => {
    try{
    const existingUser=await findbyemail(data.email); 

        if(existingUser) throw new Error('User already exists');

        const hashedPass=await bcrypt.hash(data.password,10);

         const otp=Math.floor(1000 + Math.random() * 9000).toString();

       const newuser= await createUser({...data, password: hashedPass, otp, isVerified:false});

        await sendOTPToEmail(data.email,otp);

        return newuser;
    } 
    catch(error){
        const err=error as Error;
        console.log(err,'err in userSignUpservice');
        throw err;
    }
}

//LOGIN

export const userLoginService=async (email:string,password:string) :Promise<any>=> {
       try{
        const user=await findbyemail(email);
        if(!user) throw new Error('No user found');
        if(!user || typeof user.password!=="string") throw new Error("Invalid user or password"); 

        if (!user.isVerified) {
        const otp=Math.floor(1000 + Math.random() * 9000).toString();
        await updateUser(email, { otp });
       await sendOTPToEmail(user.email,otp);
       return {
        message: 'User not verified. OTP has been sent again.',
        requiresVerification: true,
        email: user.email,
      };
    }

        const match= await bcrypt.compare(password,user.password);
        if(!match) throw new Error("Invalid Credentials");
           
        const token=jwt.sign(
            {_id:user._id,email},process.env.SECRET_KEY!,{expiresIn:"1d"}
        );

        await createDashboard(user);
        
            return{
                token,
                updatedUser:user,
                message:'Login Successful'
            };
    }
    catch(error){
        const err=error as Error;
        console.log(err,'err in userLoginservice');
        throw err;
    }
}

//Verify OTP

export const verifyOTPService=async (email:string,otp:string) :Promise<any> => {
    try{
        //const user=await findbyphone(phone);
        const user=await findbyemail(email);
        if(!user || !user.otp){
            throw new Error('OTP not found or Expired');
        }
        if(user.otp!==otp){
            throw new Error('Invalid OTP');
        }
        
        await updateUser(email,{isVerified:true, otp:""});

         const token=jwt.sign(
         {_id:user._id},process.env.SECRET_KEY!,{expiresIn:"1h"}
         )

         return {
              msg:'OTP Verified Successfully',
              token
             };
        }    
    catch(error){
       const err=error as Error;
        console.log(err,'err in userVerifyservice');
        throw err;
    }
    
}

// Forgot Password

export const forgotPasswordService=async (email:string):Promise<any> => {
    try{
    //   const user= await findbyphone(phone);
    const user=await findbyemail(email);
      if(!user) throw new Error('user not found');

        console.log('old password is',user.password);
         const otp=Math.floor(1000 + Math.random() * 9000).toString();
       user.otp=otp;
       await user.save();
       await sendOTPToEmail(email,otp);

       return {
        success:true,
        message:'OTP sent successfully'
       }
    }
    catch(error){
        const err=error as Error;
        console.log(err,'error in forgotPassword Service');
    }
}
// Reset Password

export const resetPasswordService=async (email:string,newpass:string,otp:string) :Promise<any>=> {
    try{
        // const user=await findbyphone(phone);
        const user=await findbyemail(email);
        if(!user || user.otp!=otp) throw new Error('Invalid otp');
        user.password=await bcrypt.hash(newpass,10);
        user.otp="";
       await  user.save();
       console.log('new pass is', user.password)
       return { success: true, message: 'Password updated successfully' };
    }
    catch(error){
        const err=error as Error;
        console.log(err,'error in resetPasswordService')
    }
}