import { HttpClient } from '@angular/common/http';
import { EnvironmentInjector, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateNotification, NotificationHost } from '../model/notification-host';
import { environment } from 'src/env/env';
import { AuthService } from 'src/app/infrastructure/auth/services/auth.service';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { NotificationTypeStatus } from '../model/notification-type-status';

@Injectable({
  providedIn: 'root'
})
export class NotificationForHostService {

  constructor(private http: HttpClient,private authService: AuthService) { }

  getNotificationsHost(): Observable<NotificationHost[]> {
    const url = environment.apiHost + `notificationsForHost/host/${this.authService.getId()}`;
    return this.http.get<NotificationHost[]>(url);
  }
  markNotificationHostAsRead(id: number): Observable<NotificationHost> {
    const url = environment.apiHost + `notificationsForHost/${id}`;
    return this.http.get<NotificationHost>(url);
  }

  createNotificationHost(notification: CreateNotification): Observable<CreateNotification> {
    const url = environment.apiHost + `notificationsForHost`
    return this.http.post<CreateNotification>(url,notification);
  }

  getHostNotificationsStatus(): Observable<NotificationTypeStatus[]> {
    const url = environment.apiHost + `notificationsForHost/hostNotificationStatus/${this.authService.getId()}`;
    return this.http.get<NotificationTypeStatus[]>(url);
  }
  
}
