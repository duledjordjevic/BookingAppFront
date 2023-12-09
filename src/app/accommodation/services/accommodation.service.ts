import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommentModel } from '../accommodation-details/model/comment.model';
import { Observable } from 'rxjs';
import { AccommodationDetails } from '../accommodation-details/model/accommodation.model';

@Injectable({
  providedIn: 'root'
})
export class AccommodationService {

  constructor(private http: HttpClient) { }

  getCommentsAboutAcc(id: number): Observable<CommentModel[]> {
    const url = `http://localhost:8080/api/commentsAboutAcc/acc/${id}`;
    return this.http.get<CommentModel[]>(url);
  }

  getAccommodationInfo(id: number): Observable<AccommodationDetails> {
    const url = `http://localhost:8080/api/accommodations/${id}`;
    return this.http.get<AccommodationDetails>(url);
  }

}


