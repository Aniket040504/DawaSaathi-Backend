import {Request,Response} from 'express';
import {dashBoardModel} from '../models/dashboard.model'

//@desc    Morning Med Schedule
//@routes PATCH /api/morning
//@access Private

export const morningTime=async (req:Request,res:Response):Promise<any> => {
    try{
        const user=(req as any).user._id;
      const updateddashboard=await dashBoardModel.findOneAndUpdate(
            {user:user._id},
            req.body,
            {new:true}
        )
    if(!updateddashboard){
        return res.status(400).json({msg:'Morning medicine time set at 00:00, kindly update it'})
    }
    return res.status(202).json({
        msg:'morningmed updated successfully',
        dashboard:updateddashboard
    })
    }
    catch(error){
        const err=error as Error;
        res.status(400).json({msg:err.message || 'Server Error' });
    }
}


//@desc    Afternoon Med Schedule
//@routes PATCH /api/afternoon
//@access Private

export const afternoonTime=async (req:Request,res:Response):Promise<any> => {
    try{
        const user=(req as any).user._id;
       
      const updateddashboard=await dashBoardModel.findOneAndUpdate(
            {user:user._id},
           req.body,
            {new:true}
        )
    if(!updateddashboard){
        return res.status(400).json({msg:'Afternoon medicine time set at 00:00, kindly update it'})
    }
    return res.status(202).json({
        msg:'afternoonmed updated successfully',
        dashboard:updateddashboard
    })
}
    catch(error){
        const err=error as Error;
        res.status(400).json({msg:err.message || 'Server Error' });
    }
}


//@desc    Evening Med Schedule
//@routes PATCH /api/evening
//@access Private

export const eveningTime=async (req:Request,res:Response):Promise<any> => {
    try{
        const user=(req as any).user._id;
        const updateddashboard=await dashBoardModel.findOneAndUpdate(
            {user:user._id},
            req.body,
            {new:true}
        )
        if(!updateddashboard){
            return res.status(400).json({msg:'Evening medicine time set at 00:00, kindly update it'})
        }
        return res.status(200).json({
        msg:'afternoonmed updated successfully',
        dashboard:updateddashboard
    })
    }
    catch(error){
        const err=error as Error;
        res.status(400).json({msg:err.message || 'Server Error' });
    }
}