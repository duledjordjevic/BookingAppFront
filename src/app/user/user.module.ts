import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from "../infrastructure/material/material.module";
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule} from '@angular/forms';
import { UpdateAdminComponent } from './update-admin/update-admin.component';
import { BlockUserComponent } from './block-user/block-user.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { RequestCertificatePopupComponent } from './request-certificate-popup/request-certificate-popup.component';




@NgModule({
  declarations: [
    UpdateProfileComponent,
    UpdateAdminComponent,
    BlockUserComponent,
    RequestCertificatePopupComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MaterialModule,
    MatCheckboxModule
  ],
  exports: [
    UpdateProfileComponent,
    UpdateAdminComponent
  ]
})
export class UserModule { }
