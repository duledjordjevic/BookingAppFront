import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';
import { LogInComponent } from './layout/log-in/log-in.component';
import { RegisterComponent } from './layout/register/register.component';
import { AccommodationDetailsImagesComponent } from './accommodation/accommodation-details-images/accommodation-details-images.component';

const routes: Routes = [
  {path : "home", component : HomeComponent},
  {path: "login", component: LogInComponent},
  {path: "register", component: RegisterComponent},
  {path: "accommodation-details-images", component: AccommodationDetailsImagesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
