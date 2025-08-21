import {Request,Response} from 'express'
import {updateProfileService} from '../services/profile.services'

//@desc    Update User Profile
//@routes POST /api/updateprofile
//@access Public


export const updateProfile=async (req:Request,res:Response) :Promise<any> => {
    try{
    const id=req.params.id;
    
     const updates = { ...req.body };
     
    const updateUser=await updateProfileService(id,updates);
    res.status(202).json({
        msg:"Profile updated successfully",
        updateUser
    })    
    }
    catch(error){
        const err=error as Error;
        console.log(err,'Error in updateProfile controller');
        res.status(500).json(err.message || 'Internal Server Error');
    }
}