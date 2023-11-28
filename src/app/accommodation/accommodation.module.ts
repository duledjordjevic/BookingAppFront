import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccommodationDetailsComponent } from './accommodation-details/accommodation-details.component';



@NgModule({
  declarations: [
    AccommodationDetailsComponent
  ],
  imports: [
    CommonModule
  ],
	exports: [
		AccommodationDetailsComponent
	]
})
export class AccommodationModule { }
