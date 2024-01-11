import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationForHostComponent } from './notification-for-host/notification-for-host.component';
import { NotificationForGuestComponent } from './notification-for-guest/notification-for-guest.component';
import { SharedService } from '../services/shared.service';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatDialog} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    NotificationForHostComponent,
    NotificationForGuestComponent,
  ],
  imports: [
    CommonModule,
    MatSlideToggleModule,
    FormsModule
  ],
  exports:[
    NotificationForHostComponent,
  ]
})
export class NotificationModule { }
