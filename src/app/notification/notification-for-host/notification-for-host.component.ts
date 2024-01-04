import { Component } from '@angular/core';
import { NotificationForHostService } from '../services/notification-for-host.service';
import { NotificationHost } from '../model/notification-host';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-notification-for-host',
  templateUrl: './notification-for-host.component.html',
  styleUrls: ['./notification-for-host.component.css']
})
export class NotificationForHostComponent {
  numberOfNotifications: number = 0;
  constructor(private service: NotificationForHostService,private sharedService:SharedService){
    this.sharedService.numberOfNotifications$.subscribe(data => {
      this.numberOfNotifications = data;
    });
  }

  allNotifications: NotificationHost[]  = [];
  unreadNotifications: NotificationHost[] = [];
  readNotifications: NotificationHost[] = [];
  haveUnreadNotifications: boolean = false;

  cancelReservationImage: string = "assets/images/cancel.png";
  reviewImage: string = "assets/images/star.svg"
  requestImage: string = "assets/images/quote-request.png"

  ngOnInit():void{
    this.service.getNotifications().subscribe({
      next:(notifications: NotificationHost[]) => {
        this.allNotifications = notifications;
        console.log(this.allNotifications);

        const updatedNotifications =  this.allNotifications.map(notification => {
          switch(notification.type){
            case 'RESERVATION_REQUEST':
              notification.title = "Reservation request";
              notification.icon = this.requestImage;
              break;
            case 'CANCELLED_RESERVATION':
              notification.title = "Cancelled reservation"
              notification.icon = this.cancelReservationImage;
              break;
            case 'NEW_REVIEW':
              notification.title = "New review"
              notification.icon = this.reviewImage;
              break;
          }
          return notification;
        })
        this.allNotifications = updatedNotifications;

        this.allNotifications.forEach((notification: NotificationHost) => {
          console.log(notification);
          if(notification.read){
            console.log("Procitana notifikacija")
            this.readNotifications.push(notification);
          }else{
            console.log("Neprocitana notifikacija")
            this.unreadNotifications.push(notification);
          }
        })
        if(this.unreadNotifications.length != 0){
          this.haveUnreadNotifications = true;
        }
        
      }
    })
  }
  markAsRead(notification: NotificationHost): void {
    this.service.markNotificationAsRead(notification.id || 0).subscribe({
      next:(_) => {
      }
    })
    this.unreadNotifications = this.unreadNotifications.filter(item => item !== notification);
    this.readNotifications.push(notification);

    this.sharedService.updateSharedData(this.unreadNotifications.length);
    if(this.unreadNotifications.length == 0){
      this.haveUnreadNotifications = false;
    }    
  }
}
