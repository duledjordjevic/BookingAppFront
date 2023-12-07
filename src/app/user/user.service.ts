import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from './update-profile/model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUser(): Observable<UserModel> {
    return this.http.get<UserModel>('http://localhost:8080/api/users/1');
  }
  updateUser(user: UserModel): Observable<UserModel>{
    return this.http.put<UserModel>('http://localhost:8080/api/users/2',user);
  }
}
