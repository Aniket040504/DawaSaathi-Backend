import {userDetails} from '../models/userAuth.model';
import {IUser} from '../interfaces/IUser'

export const updateProfile=async (id:string,update:Partial<IUser>):Promise<any> => {
    try{
    return await userDetails.findByIdAndUpdate(
        id,
        update,
        {new:true});
    }
    catch(error){
        const err=error as Error;
        console.log(err,'error in updateProfile repo');
        throw err;
    }
}
