import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { AccommodationDetailsComponent } from './accommodation-details/accommodation-details.component';
import {MaterialModule} from "../infrastructure/material/material.module";
import {GoogleMapsModule} from "@angular/google-maps"


@NgModule({
  declarations: [
    AccommodationDetailsComponent
  ],
	imports: [
		CommonModule,
		NgOptimizedImage,
		MaterialModule,
		GoogleMapsModule
	],
	exports: [
		AccommodationDetailsComponent
	]
})
export class AccommodationModule { }
