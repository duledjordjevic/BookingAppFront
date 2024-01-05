import { Component } from '@angular/core';
import { NotificationForGuestService } from '../services/notification-for-guest.service';
import { SharedService } from 'src/app/services/shared.service';
import { NotificationGuest } from '../model/notification-guest';
import { format } from 'date-fns';


@Component({
  selector: 'app-notification-for-guest',
  templateUrl: './notification-for-guest.component.html',
  styleUrls: ['./notification-for-guest.component.css']
})
export class NotificationForGuestComponent {
  numberOfNotifications: number = 0;
  constructor(private service: NotificationForGuestService,private sharedService:SharedService){
    this.sharedService.numberOfNotifications$.subscribe(data => {
      this.numberOfNotifications = data;
    });
  }
  

  allNotifications: NotificationGuest[]  = [];
  unreadNotifications: NotificationGuest[] = [];
  readNotifications: NotificationGuest[] = [];
  haveUnreadNotifications: boolean = false;

  cancelReservationImage: string = "assets/images/cancel.png";
  reviewImage: string = "assets/images/star.svg";
  requestImage: string = "assets/images/quote-request.png";
  acceptedImage: string = "assets/images/accepted.png";

  
  ngOnInit():void{
    
    this.service.getNotificationsForGuest().subscribe({
      next:(notifications: NotificationGuest[]) => {
        this.allNotifications = notifications;
        console.log(this.allNotifications);


        this.allNotifications.forEach((notification: NotificationGuest) => {
          notification.dateParsed = format(notification.dateTime || new Date, 'yyyy-MM-dd HH:mm');
          notification.title = "Response to the reservation request"
          notification.icon = this.requestImage;
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

  markAsRead(notification: NotificationGuest): void {
    this.service.markNotificationGuestAsRead(notification.id || 0).subscribe({
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
