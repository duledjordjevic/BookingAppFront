import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule} from '@angular/forms';
import { UpdateAdminComponent } from './update-admin/update-admin.component';
import { BlockUserComponent } from './block-user/block-user.component';



@NgModule({
  declarations: [
    UpdateProfileComponent,
    UpdateAdminComponent,
    BlockUserComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    UpdateProfileComponent,
    UpdateAdminComponent
  ]
})
export class UserModule { }
