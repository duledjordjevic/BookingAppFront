import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { AccommodationDetailsComponent } from './accommodation-details/accommodation-details.component';
import {MaterialModule} from "../infrastructure/material/material.module";
import {GoogleMapsModule} from "@angular/google-maps"
import { RouterModule } from '@angular/router';
import { AccommodationDetailsImagesComponent } from './accommodation-details-images/accommodation-details-images.component';


@NgModule({
  declarations: [
    AccommodationDetailsComponent,
	AccommodationDetailsImagesComponent
  ],
	imports: [
		CommonModule,
		NgOptimizedImage,
		MatFormFieldModule,
		MatInputModule,
		MatDatepickerModule,
		MatNativeDateModule,
		MatButtonModule,
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
