import { Component } from '@angular/core';
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

  constructor(private service: NotificationForHostService,private sharedService: SharedService) {
    this.sharedService.numberOfNotifications$.subscribe(data => {
      this.numberOfNotifications = data;
      if(this.numberOfNotifications == 0){
        this.haveNotifications = false;
      }
    });
  }
 
  ngOnInit():void {
    this.service.getNotifications().subscribe({
      next:(notifications: NotificationHost[]) => {

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
}
