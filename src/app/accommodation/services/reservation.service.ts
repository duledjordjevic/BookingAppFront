import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/infrastructure/auth/services/auth.service';
import { environment } from 'src/env/env';
import { Reservation } from '../model/reservation.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  reservate(reservation: Reservation): Observable<any>{
    const url = environment.apiHost + 'reservations';
    return this.http.post<any>(url, reservation, {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    });
  }
}
