import mongoose from 'mongoose';
import { IUser } from '../interfaces/IUser';
import {updateProfile} from '../repositories/profile.repository';
import jwt from 'jsonwebtoken';

export const updateProfileService=async (id:string,updates:Partial<IUser>) => {


//for converting age from dd/mm/yyyy to integer

//      if (updates.age) {
//     const birthDate = new Date(updates.age);

//     if (!isNaN(birthDate.getTime())) {
//         const ageDiffMs = Date.now() - birthDate.getTime();
//         const ageDate = new Date(ageDiffMs);
//         const calculatedAge = Math.abs(ageDate.getUTCFullYear() - 1970);

//         updates.age = calculatedAge; 
//     } else {
//         console.log("Invalid birthdate format");
//     } 
// } 

 if(id.length!=24) throw new Error('Invalid Id')

const updatedUser=await updateProfile(id,updates);

if (!updatedUser) {
    throw new Error("User not found with the given ID");
  }

const token=jwt.sign(
    {_id:updatedUser._id,},
    process.env.SECRET_KEY!,
    {expiresIn:"1d"}
);
    
    if(!updatedUser) throw new Error('failed to update');

    return {
        updatedUser,
        token,
    }
    
}