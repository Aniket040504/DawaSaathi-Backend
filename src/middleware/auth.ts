import jwt from 'jsonwebtoken';
import {userDetails} from '../models/userAuth.model'
import { NextFunction, Request, Response } from 'express';

const validateToken=async (token:string) => {
    if(!process.env.SECRET_KEY) throw new Error('secret key not found');
    const decoded=jwt.verify(token,process.env.SECRET_KEY);
    return decoded;

}

export const protect=async (req:Request,res:Response,next:NextFunction) :Promise<any>=>{
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer') ){ // tokens start like Bearer then faasdaad
        try{
            //Get token from header
            token=req.headers.authorization.split(' ')[1]

            //Verify token

            const decoded:any=await validateToken(token)

            //Get user from token
            console.log('decoded.id:', decoded._id);


            const user:any=await  userDetails.findById(decoded._id).select('-password')

            if(!user){
               return res.status(400).json({msg:"No user found "});
            }

           (req as any).user=user

           return next()
        }
        catch(error){
            console.log(error);
            res.status(401).json({msg:'Not authorized, invalid token'});
        }
    }
      console.log("error in middleware auth");
        res.status(401).json({msg:'Not authoried, no token available'});
    
}
