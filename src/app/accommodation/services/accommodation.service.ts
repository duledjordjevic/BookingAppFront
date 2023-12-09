import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommentModel } from '../accommodation-details/model/comment.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccommodationService {

  constructor(private http: HttpClient) { }

  getCommentsAboutAcc(id: number): Observable<CommentModel[]> {
    const url = `http://localhost:8080/api/commentsAboutAcc/acc/${id}`;
    return this.http.get<CommentModel[]>(url);
  }

}


