import { Component } from '@angular/core';
import { NotificationForHostService } from '../services/notification-for-host.service';
import { NotificationHost, NotificationType } from '../model/notification-host';
import { SharedService } from 'src/app/services/shared.service';
import { format } from 'date-fns';
import { NotificationTypeStatus } from '../model/notification-type-status';

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
  notificationsStatus: NotificationTypeStatus[] = [];
  isTurnedReservationRequest: boolean | undefined;
  isTurnedReservationCreated: boolean | undefined;
  isTurnedReservationCancelled: boolean | undefined;
  isTurnedReview: boolean | undefined;

  cancelReservationImage: string = "assets/images/cancel.png";
  reviewImage: string = "assets/images/star.svg";
  requestImage: string = "assets/images/quote-request.png";
  acceptedImage: string = "assets/images/accepted.png";

  ngOnInit():void{

    this.getNotificationsStatus();

    this.getAllNotifications();
    
  }

  getNotificationsStatus(){
    this.service.getHostNotificationsStatus().subscribe({
      next:(notificationsTypeStatus: NotificationTypeStatus[]) => {
        this.notificationsStatus = notificationsTypeStatus;
        this.notificationsStatus.forEach((notificationTypeStatus: NotificationTypeStatus) =>{
          switch(notificationTypeStatus.type){
            case NotificationType.RESERVATION_REQUEST:
              if(notificationTypeStatus.isTurned){
                this.isTurnedReservationRequest = true;
              }else{
                this.isTurnedReservationRequest = false;
              }
              break;
            case NotificationType.CREATED_RESERVATION:
              if(notificationTypeStatus.isTurned){
                this.isTurnedReservationCreated = true;
              }else{
                this.isTurnedReservationCreated = false;
              }
              break;
            case NotificationType.CANCELLED_RESERVATION:
              if(notificationTypeStatus.isTurned){
                this.isTurnedReservationCancelled = true;
              }else{
                this.isTurnedReservationCancelled = false;
              }
              break;
            case NotificationType.NEW_REVIEW:
              if(notificationTypeStatus.isTurned){
                this.isTurnedReview = true;
              }else{
                this.isTurnedReview = false;
              }
              break;
          }
        })
      }
    })
  }

  getAllNotifications(): void {
    this.service.getNotificationsHost().subscribe({
      next:(notifications: NotificationHost[]) => {
        this.allNotifications = notifications;

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
            case 'CREATED_RESERVATION':
              notification.title = "Reservation created";
              notification.icon = this.acceptedImage;
          }
          return notification;
        })
        this.allNotifications = updatedNotifications;

        this.allNotifications.forEach((notification: NotificationHost) => {
          notification.dateParsed = format(notification.dateTime || new Date, 'yyyy-MM-dd HH:mm');
          if(notification.read){
            this.readNotifications.push(notification);
          }else{
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
    this.service.markNotificationHostAsRead(notification.id || 0).subscribe({
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
