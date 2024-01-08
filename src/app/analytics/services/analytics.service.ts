import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "src/app/infrastructure/auth/services/auth.service";
import { environment } from "src/env/env";
import { Analytics } from "../models/analytics.model";


@Injectable({
    providedIn: 'root'
  })
export class AnalyticsService {
    constructor(private http: HttpClient, private authService: AuthService) { }

  getAnnualAnalytics(year: number, accommodationId: number, hostId: number): Observable<Analytics> {
    const url = environment.apiHost + `analytics/annualAnalytics/${year}/${accommodationId}/${hostId}`;
    return this.http.get<Analytics>(url);
  }
  
  getAnalyticsForAll(startDate: Date, endDate: Date, hostUserId: number): Observable<Analytics[]> {
    const url = environment.apiHost + `analytics/allAccommodations/${hostUserId}`;

    let params = new HttpParams();

    params = params.set("startDate", startDate.getFullYear() + "-" + String(startDate.getMonth() + 1).padStart(2, '0') + "-" + String(startDate.getDate()).padStart(2, '0'));
    params = params.set("endDate", endDate.getFullYear() + "-" + String(endDate.getMonth() + 1).padStart(2, '0') + "-" + String(endDate.getDate()).padStart(2, '0'));

    return this.http.get<Analytics[]>(url, { params: params });
  }


}