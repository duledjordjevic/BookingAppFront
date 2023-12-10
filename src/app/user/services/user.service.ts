import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInfo, UserUpdate } from '../model/user.model';
import { inject } from '@angular/core/testing';
import { AuthService } from '../../infrastructure/auth/services/auth.service';
import { Admin } from '../model/admin.model';
import { environment } from 'src/env/env';

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
    
  deleteUser() {
    const url = environment.apiHost + `users/${this.authService.getId()}`;
    return this.http.delete(url);
  }
  getAdmin(): Observable<Admin> {
    const url = environment.apiHost + `users/${this.authService.getId()}`;
    return this.http.get<Admin>(url);
  }

}
