import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [
    NavBarComponent,
    HomeComponent,
    FooterComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NavBarComponent,
    HomeComponent,
    FooterComponent
  ]
})
export class LayoutModule { }
