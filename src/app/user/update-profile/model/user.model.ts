export interface AddressModel {
    id: number | null;
    street: string;
    city: string;
    state: string;
    postalCode: string;
}

export interface UserModel {
    id: number | null;
    email: string;
    password: string;
    address: AddressModel;
    phoneNumber: string;
    userType: string; 
    name: string;
    lastname: string;
}