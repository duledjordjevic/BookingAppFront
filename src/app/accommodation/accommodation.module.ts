import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { AccommodationDetailsComponent } from './accommodation-details/accommodation-details.component';



@NgModule({
  declarations: [
    AccommodationDetailsComponent
  ],
	imports: [
		CommonModule,
		NgOptimizedImage
	],
	exports: [
		AccommodationDetailsComponent
	]
})
export class AccommodationModule { }
