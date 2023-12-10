import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "src/app/infrastructure/auth/services/auth.service";
import { AccommodationCard } from "../model/card.model";
import { environment } from "src/env/env";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class AccommodationService{

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
}