import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/infrastructure/auth/services/auth.service';
import { CreateNotificationGuest, NotificationGuest } from '../model/notification-guest';
import { Observable } from 'rxjs';
import { environment } from 'src/env/env';
import { CreateNotification } from '../model/notification-host';
import { NotificationTypeStatus } from '../model/notification-type-status';

@Injectable({
  providedIn: 'root'
})
export class NotificationForGuestService {

  constructor(private http: HttpClient,private authService: AuthService) { }

  getNotificationsForGuest(): Observable<NotificationGuest[]> {
    const url = environment.apiHost + `notificationsForGuest/guest/${this.authService.getId()}`;
    return this.http.get<NotificationGuest[]>(url);
  }
  markNotificationGuestAsRead(id: number): Observable<NotificationGuest> {
    const url = environment.apiHost + `notificationsForGuest/${id}`;
    return this.http.get<NotificationGuest>(url);
  }

  createNotificationGuest(notification: CreateNotificationGuest): Observable<NotificationGuest> {
    const url = environment.apiHost + `notificationsForGuest`
    return this.http.post<NotificationGuest>(url,notification);
  }

  getGuestNotificationsStatus(): Observable<NotificationTypeStatus[]> {
    const url = environment.apiHost + `notificationsForGuest/guestNotificationStatus/${this.authService.getId()}`;
    return this.http.get<NotificationTypeStatus[]>(url);
  }
}
