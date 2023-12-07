import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../infrastructure/material/material.module';
import {AccommodationModule} from "../accommodation/accommodation.module";
import { FormsModule } from '@angular/forms';
import { AdminNavBarComponent } from './nav-bar/admin-nav-bar/admin-nav-bar.component';
import { GuestNavBarComponent } from './nav-bar/guest-nav-bar/guest-nav-bar.component';
import { HostNavBarComponent } from './nav-bar/host-nav-bar/host-nav-bar.component'


@NgModule({
  declarations: [
    NavBarComponent,
    HomeComponent,
    FooterComponent,
    AdminNavBarComponent,
    GuestNavBarComponent,
    HostNavBarComponent
  ],
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule,
        AccommodationModule,
        MaterialModule,
        FormsModule
    ],
  exports: [
    NavBarComponent,
    HomeComponent,
    FooterComponent
  ]
})
export class LayoutModule { }
