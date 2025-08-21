import {dashBoardModel} from '../models/dashboard.model'
import {userDocument} from '../interfaces/IUser'

export const findDashboard=async (user:userDocument) :Promise<any> =>{
try{    
   return await dashBoardModel.findOne({user: user._id});
}   
catch(error){
    const err=error as Error;
    console.log(err,'error in findbyid repo');

} 
}
 
export const createDashboard=async (user:userDocument) :Promise<any>=> {
    
    try{
        const newDashboard=await dashBoardModel.create({
          user: user._id,
          name: user.name,
          morningmed:"00:00",
          afternoonmed:"00:00",
          eveningmed:"00:00",
          medication: [false, false, false],
          date: new Date(),
          yesterday: "N/A",
          adherence: "0%",
        });
        return newDashboard;
    }
    catch(error){
        const err=error as Error;
        console.log(err,'error in create repo');
    }
}