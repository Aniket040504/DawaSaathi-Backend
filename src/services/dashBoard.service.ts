import {findDashboard,createDashboard} from '../repositories/dashboard.repository';
import { userDocument } from '../interfaces/IUser';

export const createnewDashboard=async (user:userDocument):Promise<any> => {
    try{
    let dashboard=await findDashboard(user);
    if(!dashboard){
        dashboard=await createDashboard(user);
    }
    return dashboard;
}
    catch(error){
        const err=error as Error;
        console.log(err,'error in dashboard repo');
    }
}