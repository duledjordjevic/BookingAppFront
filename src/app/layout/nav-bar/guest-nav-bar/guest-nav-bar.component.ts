import { Component } from '@angular/core';
import { NotificationGuest } from 'src/app/notification/model/notification-guest';
import { NotificationForGuestService } from 'src/app/notification/services/notification-for-guest.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-guest-nav-bar',
  templateUrl: './guest-nav-bar.component.html',
  styleUrls: ['./guest-nav-bar.component.css']
})
export class GuestNavBarComponent {
  numberOfNotifications: number = 0;
  haveNotifications: boolean = false;

  constructor(private service: NotificationForGuestService,private sharedService: SharedService) {
    this.sharedService.numberOfNotifications$.subscribe(data => {
      this.numberOfNotifications = data;
      if(this.numberOfNotifications == 0){
        this.haveNotifications = false;
      }
    });
  }
 
  ngOnInit():void {
    this.service.getNotificationsForGuest().subscribe({
      next:(notifications: NotificationGuest[]) => {
        console.log(notifications);
        notifications.forEach((notification: NotificationGuest) => {
          if (!notification.read) {
            this.numberOfNotifications += 1;
          }
        });
        if(this.numberOfNotifications != 0){
          this.haveNotifications = true;
        }
      }
    })
  }
}
