import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommentModel } from '../model/comment.model';
import { Observable } from 'rxjs';
import { AccommodationDetails, AccommodationPopular, AccommodationType, Amenities } from '../model/accommodation.model';
import { environment } from 'src/env/env';
import { AuthService } from "src/app/infrastructure/auth/services/auth.service";
import { AccommodationCard } from "../model/card.model";
import { DatePipe } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class AccommodationService {

  constructor(private http: HttpClient,private datePipe: DatePipe) { }

  getAccommodations(): Observable<AccommodationCard[]> {
    const url = environment.apiHost + 'accommodations/adminApproving';
    return this.http.get<AccommodationCard[]>(url);
``}


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


  getAllAccommodationsCards(): Observable<AccommodationPopular[]>{
    const url = environment.apiHost + `accommodations/popular`;
    return this.http.get<AccommodationPopular[]>(url);
  }


  filterAccommodations(
    city?: string | null,
    numberOfGuests?: number | null,
    startDate?: Date | null,
    endDate?: Date | null,
    startPrice?: number,
    endPrice?: number,
    amenities?: Amenities[],  
    accommodationType?: AccommodationType
  ): Observable<AccommodationPopular[]> {
    // const params = new HttpParams()
    //   .set('city', city || '' )
    //   .set('numberOfGuests', numberOfGuests?.toString() || '')
    //   .set('startDate', startDate ? startDate.toISOString() : '')
    //   .set('endDate', endDate ? endDate.toISOString() : "")
    //   .set('startPrice', startPrice?.toString() || '')
    //   .set('endPrice', endPrice?.toString() || '')
    //   .set('amenities', amenities?.join(',') || '')
    //   .set('accommodationType', accommodationType || '');
    const url = environment.apiHost + `accommodations/cards/filter`;
    let params = new HttpParams()
      .set('city', city || '')
      .set('numberOfGuests',  numberOfGuests?.toString() || '')
      .set('startPrice', startPrice?.toString() || '')
      .set('endPrice', endPrice?.toString() || '')
      .set('amenities', amenities ? amenities.join(',') : '')
      .set('accommodationType', accommodationType || '');

    if (startDate) {
      params = params.set('startDate', this.datePipe.transform(startDate, 'yyyy-MM-dd') || '');
    }

    if (endDate) {
      params = params.set('endDate', this.datePipe.transform(endDate, 'yyyy-MM-dd') || '');
    }

    return this.http.get<AccommodationPopular[]>(url, { params });
  }

}

