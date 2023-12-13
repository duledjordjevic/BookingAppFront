import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/infrastructure/auth/services/auth.service';
import { environment } from 'src/env/env';
import { Reservation } from '../model/reservation.model';
import { Observable } from 'rxjs';
import { ReservationMethod } from '../model/reservation-method.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http: HttpClient, private authService: AuthService) { }

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

}
