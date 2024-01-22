import {UserService} from "../../../user/services/user.service";
import {AuthService} from "./auth.service";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {environment} from "../../../../env/env";
import {TestBed} from "@angular/core/testing";
import {Registration} from "../model/registration.model";
import {mockUserRegister} from "../mock/auth.service.mock";
import {User} from "../model/user.model";


describe('AuthService', () => {
	let service: AuthService;
	let httpController: HttpTestingController;
	let url = environment.apiHost;
	let authService: AuthService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
		});
		service = TestBed.inject(AuthService);
		httpController = TestBed.inject(HttpTestingController);
		authService = TestBed.inject(AuthService);
	});

	afterEach(() => {
		httpController.verify();
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});


	it('should call register and return user from the API', () => {
		const user: User = {
			id: 1,
			email: "cao@gmail.com",
			password: "123",
			isReported: false,
			userType: "HOST",
			status: "ACTIVE"
		};
		service.register(mockUserRegister).subscribe((data) => {
			expect(data).toEqual(user);
		});

		const req = httpController.expectOne({
			method: 'POST',
			url: `${url}register`,
		});

		req.flush(user);
	});


});
