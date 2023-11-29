import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../infrastructure/material/material.module';
import { LogInComponent } from './log-in/log-in.component';
import { RegisterComponent } from './register/register.component';
import {AccommodationModule} from "../accommodation/accommodation.module";
import { FormsModule } from '@angular/forms'


@NgModule({
  declarations: [
    NavBarComponent,
    HomeComponent,
    FooterComponent,
    LogInComponent,
    RegisterComponent
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
