import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInfo, UserUpdate } from './update-profile/model/user.model';
import { inject } from '@angular/core/testing';
import { AuthService } from '../infrastructure/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,private authService: AuthService) { }

  getUser(): Observable<UserInfo> {
    const url = `http://localhost:8080/api/users/${this.authService.getId()}`;
    return this.http.get<UserInfo>(url);
  }
  updateUser(user: UserUpdate): Observable<UserUpdate>{
    const url = `http://localhost:8080/api/users/${this.authService.getId()}`;
    return this.http.put<UserUpdate>(url, user);  }
    
  deleteUser() {
    const url = `http://localhost:8080/api/users/${this.authService.getId()}`;
    return this.http.delete(url);
  }

}
