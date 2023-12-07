import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { AccommodationDetailsComponent } from './accommodation-details/accommodation-details.component';
import {MaterialModule} from "../infrastructure/material/material.module";
import {GoogleMapsModule} from "@angular/google-maps"
import { RouterModule } from '@angular/router';
import { AccommodationDetailsImagesComponent } from './accommodation-details-images/accommodation-details-images.component';
import { AccommodationCreateComponent } from './accommodation-create/accommodation-create.component';


@NgModule({
  declarations: [
    AccommodationDetailsComponent,
	AccommodationDetailsImagesComponent,
 AccommodationCreateComponent
  ],
	imports: [
		CommonModule,
		NgOptimizedImage,
		GoogleMapsModule,
		RouterModule,
		MaterialModule
	],
	exports: [
		AccommodationDetailsComponent,
		AccommodationDetailsImagesComponent
	]
})
export class AccommodationModule { }
