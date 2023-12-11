import { Component } from '@angular/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
@Component({
  selector: 'app-accommodations-filter',
  templateUrl: './accommodations-filter.component.html',
  styleUrls: ['./accommodations-filter.component.css']
})
export class AccommodationsFilterComponent {
  sliderValues: number[] = [300, 400];
  startedValue:number = 200;
  endValue: number = 500;
  onSliderInput(event: any) {
    // Ova funkcija će se pozvati svaki put kada se vrednost slajdera promeni
    console.log('Slider value changed:', event.value);
  }
}
