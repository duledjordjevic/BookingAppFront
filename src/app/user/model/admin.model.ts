import { UserType } from "./user.model";

export interface Admin{
    id?: number;
    email:string;
    password:string;
    userType: UserType;
}
export interface AdminUpdate{
    email:string;
    newPassword:string;
    oldPassword:string;
}
