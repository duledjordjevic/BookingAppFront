import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInfo, UserUpdate } from './update-profile/model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUser(id: number): Observable<UserInfo> {
    const url = `http://localhost:8080/api/users/${id}`;
    return this.http.get<UserInfo>(url);
  }
  updateUser(user: UserUpdate,id: number): Observable<UserUpdate>{
    const url = `http://localhost:8080/api/users/${id}`;
    return this.http.put<UserUpdate>(url, user);  }
    
  deleteUser(id: number) {
    const url = `http://localhost:8080/api/users/${id}`;
    return this.http.delete(url);
  }

}
