export interface Registration {
    name: string;
    lastname: string;
    address: Address;
    userType: string;
    email: string;
    password: string;
    phoneNumber: number;
}

export interface Address{
    street: string;
    city: string;
    postalCode: number;
    state: string;
}