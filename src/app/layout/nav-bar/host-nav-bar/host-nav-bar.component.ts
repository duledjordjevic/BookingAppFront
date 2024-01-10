import { Component } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { NotificationHost } from 'src/app/notification/model/notification-host';
import { NotificationForHostService } from 'src/app/notification/services/notification-for-host.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-host-nav-bar',
  templateUrl: './host-nav-bar.component.html',
  styleUrls: ['./host-nav-bar.component.css']
})
export class HostNavBarComponent {
  numberOfNotifications: number = 0;
  haveNotifications: boolean = false;
  refreshSubscription: Subscription = new Subscription();


  constructor(private service: NotificationForHostService,private sharedService: SharedService) {
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
    this.service.getNotificationsHost().subscribe({
      next:(notifications: NotificationHost[]) => {
        this.numberOfNotifications = 0;

        notifications.forEach((notification: NotificationHost) => {
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
