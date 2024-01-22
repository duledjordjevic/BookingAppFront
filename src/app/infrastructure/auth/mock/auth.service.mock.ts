import {AdminUpdate} from "../../../user/model/admin.model";
import {User} from "../model/user.model";
import {Registration} from "../model/registration.model";

const mockUserRegister: Registration = {
	address: {
		street: 'Okrugiceva 10',
		city: 'Novi Sad',
		state: 'Srbija',
		postalCode: 25000
	},
	phoneNumber: '083294237',
	name: "Stefan",
	lastname: "Pejinovic",
	userType: "HOST",
	email: 'cao@gmail.com',
	password: "123",
};

export {mockUserRegister}
