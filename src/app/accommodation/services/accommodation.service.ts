import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommentModel } from '../model/comment.model';
import { Observable } from 'rxjs';
import { AccommodationDetails } from '../model/accommodation.model';
import { environment } from 'src/env/env';
import { AuthService } from "src/app/infrastructure/auth/services/auth.service";
import { AccommodationCard } from "../model/card.model";

@Injectable({
  providedIn: 'root'
})
export class AccommodationService {

  constructor(private http: HttpClient,private authService: AuthService) { }

  getAccommodations(): Observable<AccommodationCard[]> {
    const url = environment.apiHost + 'accommodations/adminApproving';
    return this.http.get<AccommodationCard[]>(url);
}


   // return this.http.post<User>(environment.apiHost + 'register', user, {
  //     headers: this.headers,
  //   });
  setApprovalStatusAccommodation(id: number, approvalStatus: string): Observable<AccommodationDetails>{
    const url = environment.apiHost + 'accommodations/' + id + '/approvalStatus' ;
    return this.http.put<AccommodationDetails>(url, {"approvalStatus" : approvalStatus}, {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
          })
    });
  }

  getCommentsAboutAcc(id: number): Observable<CommentModel[]> {
    const url = environment.apiHost + `commentsAboutAcc/acc/${id}`;
    return this.http.get<CommentModel[]>(url);
  }

  getAccommodationInfo(id: number): Observable<AccommodationDetails> {
    const url = environment.apiHost + `accommodations/${id}`;
    return this.http.get<AccommodationDetails>(url);
  }

}

