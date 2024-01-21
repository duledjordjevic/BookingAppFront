import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/env/env';
import { UserType, UserUpdate } from '../model/user.model';
import { mockAdmin, mockUser } from '../mocks/user.service.mock';
import { AuthService } from 'src/app/infrastructure/auth/services/auth.service';
import { Admin, AdminUpdate } from '../model/admin.model';

describe('UserService', () => {
  let service: UserService;
  let httpController: HttpTestingController;
  let url = environment.apiHost;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(UserService);
    httpController = TestBed.inject(HttpTestingController);
    authService = TestBed.inject(AuthService);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should call updateUser and return the updated user from the API', () => {
    spyOn(authService, 'getId').and.returnValue(1);
    
    const updatetedUser: UserUpdate = {
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

    service.updateUser(mockUser).subscribe((data) => {
      expect(data).toEqual(updatetedUser);
    });

    const req = httpController.expectOne({
      method: 'PUT',
      url: `${url}users/${updatetedUser.id}`,
    });

    req.flush(updatetedUser);
  });

  it('should call updateAdmin and return the updated admin from the API', () => {
    spyOn(authService, 'getId').and.returnValue(1);
    
    const updatetedAdmin: Admin = {
        id: 1,
        email: "marko@gmail.com",
        password: "123",
        userType: UserType.ADMIN
    };

    service.updateAdmin(mockAdmin).subscribe((data) => {
      expect(data).toEqual(updatetedAdmin);
    });

    const req = httpController.expectOne({
      method: 'PUT',
      url: `${url}users/admin/${updatetedAdmin.id}`,
    });

    req.flush(updatetedAdmin);
  });

});
