import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserReport } from '../model/user-report';
import { Observable } from 'rxjs';
import { environment } from 'src/env/env';

@Injectable({
  providedIn: 'root'
})
export class ReportUserService {

  constructor(private http: HttpClient) { }

  addReport(userReport: UserReport): Observable<UserReport>{
	  const url = environment.apiHost + 'users/report';
	  return this.http.post<UserReport>(url, userReport);
  }

}
