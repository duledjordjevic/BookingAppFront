import { Address } from "src/app/models/shared.models";

export interface UserInfo {
    id: number | null;
    email: string;
    userType: UserType;
    address: Address;
    phoneNumber: string;
    name: string;
    lastname: string;
    oldPassword: string;
    newPassword: string;
}

export interface UserUpdate {
    id: number | null;
    address: Address;
    phoneNumber: string;
    name: string;
    lastname: string;
    oldPassword: string;
    newPassword: string;
}

export enum UserType{
    GUEST = "GUEST",
    HOST = "HOST",
    ADMIN = "ADMIN"
}

export interface UserDelete{
    password:string;
}
