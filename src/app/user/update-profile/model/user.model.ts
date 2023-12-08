export interface Address {
    id: number | null;
    street: string;
    city: string;
    state: string;
    postalCode: string;
}
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
