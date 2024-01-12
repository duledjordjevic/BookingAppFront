import { Component } from '@angular/core';
import { NotificationForGuestService } from '../services/notification-for-guest.service';
import { SharedService } from 'src/app/services/shared.service';
import { NotificationGuest } from '../model/notification-guest';
import { format } from 'date-fns';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NotificationTypeStatus } from '../model/notification-type-status';
import { NotificationType } from '../model/notification-host';
import { AuthService } from 'src/app/infrastructure/auth/services/auth.service';
import { Stomp } from '@stomp/stompjs';


import * as SockJS from 'sockjs-client';
import { environment } from 'src/env/env';

@Component({
  selector: 'app-notification-for-guest',
  templateUrl: './notification-for-guest.component.html',
  styleUrls: ['./notification-for-guest.component.css']
})
export class NotificationForGuestComponent {
  numberOfNotifications: number = 0;

  constructor(private service: NotificationForGuestService,private sharedService:SharedService,
    private authService: AuthService){
    this.sharedService.numberOfNotifications$.subscribe(data => {
      this.numberOfNotifications = data;
    });
  }
 
  private serverUrl = environment.socket + 'socket'
  private stompClient: any;

  isLoaded: boolean = false;
  isCustomSocketOpened = false;
  
  allNotifications: NotificationGuest[]  = [];
  unreadNotifications: NotificationGuest[] = [];
  readNotifications: NotificationGuest[] = [];
  notificationsStatus: boolean | undefined;
  haveUnreadNotifications: boolean = false;

  cancelReservationImage: string = "assets/images/cancel.png";
  reviewImage: string = "assets/images/star.svg";
  requestImage: string = "assets/images/quote-request.png";
  acceptedImage: string = "assets/images/accepted.png";

  
  ngOnInit():void{
    this.initializeWebSocketConnection();
    this.getNotificationsTypeStatus();
    
    this.getAllNotifications();
    
  }
  getNotificationsTypeStatus(): void{
    this.service.getGuestNotificationsStatus().subscribe({
      next:(notificationsTypeStatus:NotificationTypeStatus[]) => {
        this.notificationsStatus = notificationsTypeStatus[0].isTurned;
      }
    })
  }
  onToggleChange(): void {
    const notificationTypeStatusRequest: NotificationTypeStatus = {
      type: NotificationType.RESERVATION_REQUEST_RESPOND,
      userId: this.authService.getId(),
      isTurned: this.notificationsStatus
    }
    this.service.updateNotificationStatus(notificationTypeStatusRequest).subscribe({
      next:(_) => {
      }
    })
  }
  getAllNotifications(): void {
    this.service.getNotificationsForGuest().subscribe({
      next:(notifications: NotificationGuest[]) => {
        this.allNotifications = notifications;

        this.allNotifications.forEach((notification: NotificationGuest) => {
          notification.dateParsed = format(notification.dateTime || new Date, 'yyyy-MM-dd HH:mm');
          notification.title = "Response to the reservation request"
          if(notification.description?.includes("accepted ")){
            notification.icon = this.acceptedImage;
          }else{
            notification.icon = this.cancelReservationImage;
          }
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

  isPopupOpen: boolean = false;

  openPopup(): void {
    this.isPopupOpen = true;
  }

  closePopup(): void {
    this.isPopupOpen = false;
  }
  initializeWebSocketConnection() {
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;

    this.stompClient.connect({}, function () {
      that.isLoaded = true;
      that.openSocket()
    });

  }
  openSocket() {
    if (this.isLoaded) {
      this.isCustomSocketOpened = true;
      this.stompClient.subscribe("/socket-publisher/" + this.authService.getId(), (message: { body: string; }) => {
        this.handleResult(message);
      });
    }
  }

  handleResult(message: { body: string; }) {
    if (message.body) {
      let notificationGuest: NotificationGuest = JSON.parse(message.body);
      notificationGuest.dateParsed = format(notificationGuest.dateTime || new Date, 'yyyy-MM-dd HH:mm');
      notificationGuest.title = "Response to the reservation request"
      if(notificationGuest.description?.includes("accepted ")){
        notificationGuest.icon = this.acceptedImage;
      }else{
        notificationGuest.icon = this.cancelReservationImage;
      }
      this.unreadNotifications.unshift(notificationGuest);
    }
  }

}
