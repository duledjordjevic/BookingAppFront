import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule} from '@angular/forms';
import { UpdateAdminComponent } from './update-admin/update-admin.component';



@NgModule({
  declarations: [
    UpdateProfileComponent,
    UpdateAdminComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    UpdateProfileComponent
  ]
})
export class UserModule { }
