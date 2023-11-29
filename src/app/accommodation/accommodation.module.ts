import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { AccommodationDetailsComponent } from './accommodation-details/accommodation-details.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatButtonModule} from "@angular/material/button";
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
		RouterModule
	],
	exports: [
		AccommodationDetailsComponent,
		AccommodationDetailsImagesComponent
	]
})
export class AccommodationModule { }
