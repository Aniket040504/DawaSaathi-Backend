import mongoose, {Schema} from "mongoose";
import { IDashBoard } from '../interfaces/IDashBoard';

const dashBoardSchema: Schema = new Schema<IDashBoard>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  name: {
    type: String,
    required:true,
  },
  medication: {
    type: [Boolean],
    default:[false,false,false],
  },
  morningmed:{
    type:String,
  },
  afternoonmed:{
    type:String,
  },
  eveningmed:{
    type:String,
  },
  date: {
    type: Date,
  },
  yesterday: {
    type: String,
  },
  adherence: {
    type: String,
  },
}, { timestamps: true });


export const dashBoardModel=mongoose.model<IDashBoard>('Dashboard',dashBoardSchema);

