import { Component } from '@angular/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { AccommodationService } from '../services/accommodation.service';
import { AccommodationCard } from '../model/card.model';
import { AccommodationPopular, Amenities } from '../model/accommodation.model';
import { environment } from 'src/env/env';
@Component({
  selector: 'app-accommodations-filter',
  templateUrl: './accommodations-filter.component.html',
  styleUrls: ['./accommodations-filter.component.css']
})
export class AccommodationsFilterComponent {

  constructor(private accommodationService: AccommodationService){

  }
  checkboxes: { label: string, isChecked: boolean }[] = [
    { label: 'Wi-Fi', isChecked: false },
    { label: 'Aircondition', isChecked: false },
    { label: 'Parking', isChecked: false },
    { label: 'Pool', isChecked: false },
    { label: 'Breakfast', isChecked: false },
    { label: 'Lunch', isChecked: false },
    { label: 'Dinner', isChecked: false },
    { label: 'Kitchen', isChecked: false },
    { label: 'TV', isChecked: false }
  ]
  
  cards: AccommodationPopular[] = [];
  isWiFiChecked: boolean = false;
  amenities: Amenities[] = [];


  imageBase64:string = environment.imageBase64;

  sliderValues: number[] = [300, 400];
  startedValue:number = 0;
  endValue: number = 1500;
  selectedOption: string = "";

  onSliderInput(event: any) {
    // Ova funkcija će se pozvati svaki put kada se vrednost slajdera promeni
    console.log('Slider value changed:', event.value);
    console.log(this.startedValue,this.endValue);

  }

  priceVisibility: boolean = false;
  accHaveRatings: boolean = true;


  ngOnInit(): void {
    this.getAccommodations();
  }

  getAccommodations() : void{
    this.accommodationService.getAllAccommodationsCards().subscribe({
      next:(accommodations: AccommodationPopular[]) =>{
        this.cards = accommodations;
        console.log(this.cards);
      },
      error:(err : any)=>{
        console.log(err);
      }
    })
  }

  onWiFiChange() {
    console.log('Wi-Fi checked:', this.isWiFiChecked);
  }
  onCheckboxChange() {
    this.amenities = [];
    // console.log('Promenjen je barem jedan checkbox.');
    // console.log(this.checkboxes[0].isChecked)
    if(this.checkboxes[0].isChecked){
      this.amenities.push(Amenities.WIFI);
    }
    if(this.checkboxes[1].isChecked){
      this.amenities.push(Amenities.AIRCONDITION);
    }
    if(this.checkboxes[2].isChecked){
      this.amenities.push(Amenities.PARKING);
    }
    if(this.checkboxes[3].isChecked){
      this.amenities.push(Amenities.POOL);
    }
    if(this.checkboxes[4].isChecked){
      this.amenities.push(Amenities.BREAKFAST);
    }
    if(this.checkboxes[5].isChecked){
      this.amenities.push(Amenities.LUNCH);
    }
    if(this.checkboxes[6].isChecked){
      this.amenities.push(Amenities.DINNER);
    }
    if(this.checkboxes[7].isChecked){
      this.amenities.push(Amenities.KITCHEN);
    }
    if(this.checkboxes[8].isChecked){
      this.amenities.push(Amenities.TV);
    }
  }
  filterAccommodations() {
    console.log(this.startedValue);
    console.log(this.endValue);
    console.log(this.amenities);
    console.log(this.selectedOption);
  }

}
