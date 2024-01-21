import { AdminUpdate } from "../model/admin.model";
import { UserUpdate } from "../model/user.model";


const mockUser: UserUpdate = {
    id: 1,
    address: {
        id: 1,
        street: 'Generala Gerpata 13',
        city: 'Beograd',
        state: 'Srbija',
        postalCode: '18000'
    },
    phoneNumber: '01230',
    name: "Dusan",
    lastname: "Djordjevic",
    oldPassword: "123",
    newPassword: "12345"
};

const mockAdmin: AdminUpdate = {
    email: "marko@gmail.com",
    oldPassword: "123",
    newPassword: "12345"
};

export {mockUser, mockAdmin}