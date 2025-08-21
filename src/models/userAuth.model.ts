import mongoose, {Schema} from "mongoose";
import {IUser} from '../interfaces/IUser';


const userSchema :Schema=new Schema<IUser>({
    name:{
        type:String,
    },
    email:{
        type:String
    },
    phone:{
        type:String
    },
    password:{
        type:String
    },
    age:{
        type:Number
    },
    address:{
        type:String
    },
    otp:{
        type:String
    },
    isVerified:{
        type:Boolean
    },
},
{timestamps:true,}
)

export const userDetails= mongoose.model<IUser>('user', userSchema);


