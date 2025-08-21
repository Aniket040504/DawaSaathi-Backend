import { Types } from "mongoose";

export interface IDashBoard extends Document{
    name:string,
    user: Types.ObjectId,
    morningmed:string;
    afternoonmed:string;
    eveningmed:string;
    medication:[boolean,boolean,boolean],
    date:Date,
    adherence:string,
    yesterday:string
}