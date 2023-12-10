import { UserType } from "./user.model";

export interface Admin{
    email:string;
    password:string;
    userType: UserType;
}