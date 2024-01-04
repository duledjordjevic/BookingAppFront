import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationForHostComponent } from './notification-for-host/notification-for-host.component';
import { NotificationForGuestComponent } from './notification-for-guest/notification-for-guest.component';



@NgModule({
  declarations: [
    NotificationForHostComponent,
    NotificationForGuestComponent
  ],
  imports: [
    CommonModule
  ]
})
export class NotificationModule { }
