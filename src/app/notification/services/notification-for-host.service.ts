import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificationHost } from '../model/notification-host';
import { environment } from 'src/env/env';
import { AuthService } from 'src/app/infrastructure/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationForHostService {

  constructor(private http: HttpClient,private authService: AuthService) { }

  getNotifications(): Observable<NotificationHost[]> {
    const url = environment.apiHost + `notificationsForHost/host/${this.authService.getId()}`;
    return this.http.get<NotificationHost[]>(url);
  }
  markNotificationAsRead(id: number): Observable<NotificationHost> {
    const url = environment.apiHost + `notificationsForHost/${id}`;
    return this.http.get<NotificationHost>(url);
  }
  
}
