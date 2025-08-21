import { Request,Response } from "express";
import {userSignupservice,userLoginService,verifyOTPService,forgotPasswordService, resetPasswordService} from '../services/userAuth.services';


//@desc    Register User
//@routes POST /api/signup
//@access Public

export const userSignup=async (
    req:Request,
    res:Response
    ) :Promise<any> => {

    try{

        const {email,phone,password,confirmpassword}=req.body;
       //  if(!phone || !password || !confirmpassword || phone.length!=10) return res.status(400).json({msg:"Kindly fill all the fields"});
        if(password!=confirmpassword) return res.status(400).json({msg:"Passwords do not not match"});

       await userSignupservice(req.body);
        return res.status(202).json({
            msg:'OTP sent for verification',
    })
}
    catch(error){
        const err=error as Error;
        console.log(err);
        return res.status(500).json({msg:err.message || 'Signup failed'});
    }
}


//@desc   Verify User
//@routes POST /api/verifyotp
//@access Public

export const verifyOTP=async (req:Request,res:Response) :Promise<any>=> {
    try{
        let {email,otp}=req.body;
        if(!email || !otp ){
            return res.status(400).json({msg:'Valid Email and Otp are required'});
        }

        const result=await verifyOTPService(email,otp);
        res.json(result);
        }
    catch(error){
        const err=error as Error;
        console.log(err, "error in verify OTP controller ");
        return res.status(500).json({ msg: err.message || 'Verification failed' });
    }
}


//@desc   Login User
//@routes POST /api/login
//@access Public

export const userLogin = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: 'Kindly Enter a Valid Email and Password' });
    }

    const result = await userLoginService(email, password);

    if (result.requiresVerification) {
      return res.status(401).json({
        message: result.message,
        requiresVerification: true,
        email: result.email,
      });
    }

    return res.json({
      token: result.token,
      user: result.updatedUser,
      message: result.message,
    });

  } catch (error) {
    const err = error as Error;
    console.log(err, 'Error in userLogin Controller');
    return res.status(500).json({ msg: err.message || 'Login Failed' });
  }
};



//@desc   Forgot Password
//@routes POST /api/forgot-password
//@access Public


export const forgotPassword=async (req:Request,res:Response): Promise<any>=>{
  try{
  const {phone}=req.body;
  const result=await forgotPasswordService(phone);
  return res.status(202).json({
    msg: result.message
  })
}
  catch(error){
    const err = error as Error;
    console.log(err, 'Error in userLogin Controller');
    return res.status(500).json({ msg: err.message || 'Unable to forgot pass' });
  }
}


//@desc  Reset Password
//@routes POST /api/reset-password
//@access Public


export const resetPassword=async (req:Request,res:Response):Promise<any>=>{
  try{
   const {phone,newpass,otp}=req.body;
   const result=await resetPasswordService(phone,newpass,otp);
   res.status(202).json({
    msg:result.message
   }
   );
  }
  catch(error){
    const err = error as Error;
    console.log(err, 'Error in userLogin Controller');
    return res.status(500).json({ msg: err.message || 'Unable to reset pass' });
  }
}

