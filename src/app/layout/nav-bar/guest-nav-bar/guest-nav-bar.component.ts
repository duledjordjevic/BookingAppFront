import { Component } from '@angular/core';
import { Subscription, interval } from 'rxjs';
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
  refreshSubscription: Subscription = new Subscription();


  constructor(private service: NotificationForGuestService,private sharedService: SharedService) {
    this.sharedService.numberOfNotifications$.subscribe(data => {
      this.numberOfNotifications = data;
      if(this.numberOfNotifications == 0){
        this.haveNotifications = false;
      }
    });
  }
 
  ngOnInit():void {
    this.refreshSubscription = interval(20000).subscribe(() => {
      this.refreshData();
    });
    
  }
  refreshData():void{
    this.service.getNotificationsForGuest().subscribe({
      next:(notifications: NotificationGuest[]) => {
        console.log(notifications);
        this.numberOfNotifications = 0;
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

  ngOnDestroy(): void {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }
}
