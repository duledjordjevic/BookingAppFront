import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDelete, UserInfo, UserUpdate } from '../model/user.model';
import { inject } from '@angular/core/testing';
import { AuthService } from '../../infrastructure/auth/services/auth.service';
import { Admin, AdminUpdate } from '../model/admin.model';
import { environment } from 'src/env/env';
import { UserBlock } from '../model/user-block';
import { UserModule } from '../user.module';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,private authService: AuthService) { }

  getUser(): Observable<UserInfo> {
    const url =  environment.apiHost + `users/${this.authService.getId()}`;
    return this.http.get<UserInfo>(url);
  }
  updateUser(user: UserUpdate): Observable<UserUpdate>{
    const url = environment.apiHost + `users/${this.authService.getId()}`;
    return this.http.put<UserUpdate>(url, user);  }
    
  deleteUser(userPassword: UserDelete) {
    const url = environment.apiHost + `users/delete/${this.authService.getId()}`;
    return this.http.put(url,userPassword);
  }
  getAdmin(): Observable<Admin> {
    const url = environment.apiHost + `users/${this.authService.getId()}`;
    return this.http.get<Admin>(url);
  }
  updateAdmin(admin: AdminUpdate): Observable<Admin>{
    const url = environment.apiHost + `users/admin/${this.authService.getId()}`;
    return this.http.put<Admin>(url, admin);  }

  getReportedUserData(): Observable<UserBlock[]>{
    const url = environment.apiHost + `users/reported`;
    return this.http.get<UserBlock[]>(url);
  }
  blockUser(id: number): Observable<UserInfo>{
    const url = environment.apiHost + `users/block/${id}`;
    return this.http.put<UserInfo>(url,id);
  }

}
