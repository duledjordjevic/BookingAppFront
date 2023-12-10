import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { AccommodationDetailsComponent } from './accommodation-details/accommodation-details.component';
import {MaterialModule} from "../infrastructure/material/material.module";
import {GoogleMapsModule} from "@angular/google-maps"
import { RouterModule } from '@angular/router';
import { AccommodationDetailsImagesComponent } from './accommodation-details-images/accommodation-details-images.component';
import { AccommodationCreateComponent } from './accommodation-create/accommodation-create.component';
import { AccommodationPictureUploadComponent } from './accommodation-picture-upload/accommodation-picture-upload.component';
import {NgxDropzoneModule} from "ngx-dropzone";
import { PricelistComponent } from './pricelist/pricelist.component';


@NgModule({
  declarations: [
    AccommodationDetailsComponent,
	AccommodationDetailsImagesComponent,
 AccommodationCreateComponent,
 AccommodationPictureUploadComponent,
 PricelistComponent
  ],
	imports: [
		CommonModule,
		NgOptimizedImage,
		GoogleMapsModule,
		RouterModule,
		MaterialModule,
		NgxDropzoneModule
	],
	exports: [
		AccommodationDetailsComponent,
		AccommodationDetailsImagesComponent,
		AccommodationCreateComponent
	]
})
export class AccommodationModule { }
