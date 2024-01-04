import { Component } from '@angular/core';
import { NotificationForHostService } from '../services/notification-for-host.service';
import { NotificationHost } from '../model/notification-host';

@Component({
  selector: 'app-notification-for-host',
  templateUrl: './notification-for-host.component.html',
  styleUrls: ['./notification-for-host.component.css']
})
export class NotificationForHostComponent {
  constructor(private service: NotificationForHostService){}
  allNotifications: NotificationHost[]  = [];

  ngOnInit():void{
    this.service.getNotifications().subscribe({
      next:(notifications: NotificationHost[]) => {
        this.allNotifications = notifications;
        console.log(this.allNotifications);
      }
    })
  }
}
