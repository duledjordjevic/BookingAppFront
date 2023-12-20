import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';
import { AccommodationDetailsImagesComponent } from './accommodation/accommodation-details-images/accommodation-details-images.component';
import { UpdateProfileComponent } from './user/update-profile/update-profile.component';
import {AccommodationCreateComponent} from "./accommodation/accommodation-create/accommodation-create.component";
import { LogInComponent } from './infrastructure/auth/log-in/log-in.component';
import { RegisterComponent } from './infrastructure/auth/register/register.component';
import { AuthGuard } from './infrastructure/auth/guard/auth.guard';
import { AccommodationApprovingComponent } from './accommodation/accommodation-approving/accommodation-approving.component';
import { UpdateAdminComponent } from './user/update-admin/update-admin.component';
import { AccommodationsFilterComponent } from './accommodation/accommodations-filter/accommodations-filter.component';
import { AccommodationDetailsComponent } from './accommodation/accommodation-details/accommodation-details.component';
import { combineLatest } from 'rxjs';
import { AccommodationsForHostComponent } from './accommodation/accommodations-for-host/accommodations-for-host.component';
import { UnauthorizedGuard } from './infrastructure/auth/guard/unauthorized.guard';
const routes: Routes = [
  {path : "home", component : HomeComponent,},
  {path: "login", component: LogInComponent, canActivate: [UnauthorizedGuard]},
  {path: "register", component: RegisterComponent, canActivate: [UnauthorizedGuard]},
	{path: "accommodation-create", component: AccommodationCreateComponent, canActivate: [AuthGuard], data: {role: ['HOST']}},
  {path: "accommodation-details-images", component: AccommodationDetailsImagesComponent},
  {path: "update-profile", component: UpdateProfileComponent, canActivate: [AuthGuard], data: {role: ['GUEST', 'HOST']}},
  {path: "accommodation-approving", component: AccommodationApprovingComponent, canActivate: [AuthGuard], data: {role: ['ADMIN']}},
  {path: "update-admin", component: UpdateAdminComponent, canActivate: [AuthGuard], data: {role: ['ADMIN']}},
  {path: "all-accommodations", component: AccommodationsFilterComponent},
  {path: "accommodation-details", component: AccommodationDetailsComponent},
  {path: "accommodations-for-host", component: AccommodationsForHostComponent,canActivate: [AuthGuard], data: {role: ['HOST']}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
