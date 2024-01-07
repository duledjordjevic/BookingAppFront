import { HttpClient } from "@angular/common/http";
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
  
    


}