import { UserInfo } from "./user.model";

export interface UserBlock{
    id?:number;
    reason?:string;
    reportedUser?:UserInfo;
    reportingUser?:UserInfo;
    accommodationTitle?:string;
    startDate?:Date;
    endDate?:Date;
}