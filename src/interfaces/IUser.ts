import { Types} from "mongoose";

export interface IUser extends Document{
    _id?: Types.ObjectId,
    name:string,
    phone:string,
    email:string,
    age:number,
    password:string,
    address:string,
    otp:string,
    isVerified:boolean,
}

export type userDocument=IUser & Document;