import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { AccommodationDetailsComponent } from './accommodation-details/accommodation-details.component';
import {MaterialModule} from "../infrastructure/material/material.module";
import {GoogleMapsModule} from "@angular/google-maps"
import { RouterModule } from '@angular/router';
import { AccommodationDetailsImagesComponent } from './accommodation-details-images/accommodation-details-images.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { AccommodationCreateComponent } from './accommodation-create/accommodation-create.component';
import { AccommodationPictureUploadComponent } from './accommodation-picture-upload/accommodation-picture-upload.component';
import { PricelistComponent } from './pricelist/pricelist.component';
import { AccommodationApprovingComponent } from './accommodation-approving/accommodation-approving.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
	AccommodationApprovingComponent,
    AccommodationDetailsComponent,
	AccommodationDetailsImagesComponent,
 AccommodationCreateComponent,
 AccommodationPictureUploadComponent,
 PricelistComponent,
	AccommodationCreateComponent,
 	AccommodationPictureUploadComponent
  ],
	imports: [
		CommonModule,
		NgOptimizedImage,
		GoogleMapsModule,
		RouterModule,
		MaterialModule,
		NgxDropzoneModule,
		ReactiveFormsModule
	],
	exports: [
		AccommodationDetailsComponent,
		AccommodationDetailsImagesComponent,
		AccommodationCreateComponent,
		AccommodationApprovingComponent
	]
})
export class AccommodationModule { }
