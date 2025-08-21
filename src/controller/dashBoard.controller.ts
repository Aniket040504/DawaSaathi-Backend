import {Request,Response} from 'express';
import {createnewDashboard} from '../services/dashBoard.service'

export const userName=async (req:Request,res:Response):Promise<any> => {
    try{
       
const user = (req as any).user;
const dashboard=await createnewDashboard(user);

const currH=new Date().getHours();

if(currH<12){
res.json({
   greet: `Good Morning ${dashboard.name}`,
   message:'Have a nice Morning',
})
}
else if(currH<18){
res.json({
   greet: `Good Afternoon ${dashboard.name}`,
   message:'Have a nice Afternoon',
})
}
else{
res.json({
   greet: `Good Night ${dashboard.name}`,
   message:'Have a nice Night',
})
}

    }
    catch(error){
        const err=error as Error;
        console.log(err);
        return res.status(404).json({msg:err.message || 'couldnt fetch user data'});
    }
}