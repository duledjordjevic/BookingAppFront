import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommentModel } from '../accommodation-details/model/comment.model';
import { Observable } from 'rxjs';
import { AccommodationDetails } from '../accommodation-details/model/accommodation.model';
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
  approveAccommodation(id: number): Observable<any>{
    const url = environment.apiHost + 'accommodations/' + id + '/approvalStatus' ;
    const approvalStatus = {"approvalStatus" : "APPROVED"};
    return this.http.post<boolean>(url, approvalStatus);

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

