import { NgModule } from '@angular/core';
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
const routes: Routes = [
  {path : "home", component : HomeComponent,},
  {path: "login", component: LogInComponent},
  {path: "register", component: RegisterComponent},
	{path: "accommodation-create", component: AccommodationCreateComponent},
  {path: "accommodation-details-images", component: AccommodationDetailsImagesComponent},
  {path: "update-profile", component: UpdateProfileComponent, canActivate: [AuthGuard], data: {role: ['ADMIN', 'GUEST', 'HOST']}},
  {path: "accommodation-approving", component: AccommodationApprovingComponent, canActivate: [AuthGuard], data: {role: ['ADMIN']}},
  {path: "update-admin", component: UpdateAdminComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
