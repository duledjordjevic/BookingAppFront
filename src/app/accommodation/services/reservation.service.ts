import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/infrastructure/auth/services/auth.service';
import { environment } from 'src/env/env';
import { Reservation , ReservationFilter, ReservationStatus} from '../model/reservation.model';
import { Observable } from 'rxjs';
import { ReservationMethod } from '../model/reservation-method.model';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http: HttpClient, private authService: AuthService, private datePipe: DatePipe) { }

  reservate(reservation: Reservation): Observable<ReservationMethod>{
    const url = environment.apiHost + 'reservations';
    return this.http.post<ReservationMethod>(url, reservation, {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    });
  }

  getReservationPrice(reservation: Reservation): Observable<number> {
    const url = environment.apiHost + 'reservations/reservationPrice';
    return this.http.post<number>(url, reservation, {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    });
  }

  getAvailableDates(id: number): Observable<Date[]> {
    const url = environment.apiHost + 'accommodations/' + id + '/availableDates';
    return this.http.get<Date[]>(url);
  }

  getGuestReservations(filter: ReservationFilter): Observable<Reservation[]> {
    const url = environment.apiHost + 'reservations/filterGuest';

    let params = new HttpParams();
    Object.keys(filter).forEach(key => {
      if (filter[key] !== undefined && filter[key] !== null) {
        if (filter[key] instanceof Date) {
          const formattedDate = this.datePipe.transform((filter[key] as Date), 'yyyy-MM-dd');
          if (formattedDate !== null){
            params = params.set(key, formattedDate);
          }
        } else {
          params = params.set(key, filter[key]!.toString());
        }
      }
    });
    console.log(params)
    return this.http.get<Reservation[]>(url, { params: params });
  }

  getHostReservations(filter: ReservationFilter): Observable<Reservation[]> {
    const url = environment.apiHost + 'reservations/filterHost';

    let params = new HttpParams();
    Object.keys(filter).forEach(key => {
      if (filter[key] !== undefined && filter[key] !== null) {
        if (filter[key] instanceof Date) {
          const formattedDate = this.datePipe.transform((filter[key] as Date), 'yyyy-MM-dd');
          if (formattedDate !== null){
            params = params.set(key, formattedDate);
          }
        } else {
          params = params.set(key, filter[key]!.toString());
        }
      }
    });
    console.log(params)
    return this.http.get<Reservation[]>(url, { params: params });
  }

  deletePendingReservation(reservation: Reservation): Observable<boolean> {
    const url = environment.apiHost + `reservations/pending/${reservation.id}`;
    return this.http.delete<boolean>(url);
  }

  updateReservationStatus(id: number, reservationStatus: ReservationStatus): Observable<Reservation>{
    const url = environment.apiHost + `reservations/${id}/${reservationStatus}`;
    return this.http.put<Reservation>(url, { });
  }

  cancelAcceptedReservation(idReservation: number): Observable<Reservation>{
    const url = environment.apiHost + `reservations/cancelAccepted/${idReservation}`;
    return this.http.put<Reservation>(url, { });
  }

}
