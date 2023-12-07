export interface AddressModel {
    id: number | null;
    street: string;
    city: string;
    state: string;
    postalCode: number;
}

export interface UserModel {
    id: number | null;
    email: string;
    password: string;
    address: AddressModel;
    phoneNumber: string;
    userType: "GUEST" | "HOST" | "ADMIN"; 
    name: string;
    lastname: string;
}