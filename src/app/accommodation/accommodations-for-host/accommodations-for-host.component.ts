import { Component } from '@angular/core';
import { AccommodationService } from '../services/accommodation.service';
import { AccommodationPopular } from '../model/accommodation.model';
import { environment } from 'src/env/env';

@Component({
  selector: 'app-accommodations-for-host',
  templateUrl: './accommodations-for-host.component.html',
  styleUrls: ['./accommodations-for-host.component.css']
})
export class AccommodationsForHostComponent {

  constructor(private accommodationService: AccommodationService){}

  ngOnInit(){
    this.getAccommodations();
  }
  hostAccommodations: AccommodationPopular[] = [];
  imageBase64:string = environment.imageBase64;

  getAccommodations() {
    this.accommodationService.getAccommodationsForHost().subscribe({
      next:(accommodations: AccommodationPopular[])=>{
        this.hostAccommodations = accommodations;
      }
    })
  }
}
