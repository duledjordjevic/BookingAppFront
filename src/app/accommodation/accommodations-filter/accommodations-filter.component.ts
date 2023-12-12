import { Component, inject } from '@angular/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { AccommodationService } from '../services/accommodation.service';
import { AccommodationCard } from '../model/card.model';
import { AccommodationPopular, AccommodationType, Amenities } from '../model/accommodation.model';
import { environment } from 'src/env/env';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
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
  filteredAccommodations: AccommodationPopular[] = [];
  haveFilteredResults:boolean = true;


  imageBase64:string = environment.imageBase64;

  sliderValues: number[] = [300, 400];
  startedValue:number = 0;
  endValue: number = 1500;
  selectedAccommodationType: string = "";

  accommodationType?: AccommodationType | undefined;
  

  priceVisibility: boolean = false;
  accHaveRatings: boolean = true;
  isFiltered: boolean = false;

  ngOnInit(): void {
    if(!this.isFiltered){
      this.getAccommodations();
    }
  }
  fb = inject(FormBuilder)
	http = inject(HttpClient)
	
	headerFilterForm = this.fb.nonNullable.group({
		startDate: [null],
		endDate: [null],
		numOfGuests: [null],
    city: [null]
	});


  onSliderInput(event: any) {
    console.log('Slider value changed:', event.value);
    console.log(this.startedValue,this.endValue);

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
    this.isFiltered = true;
    this.priceVisibility = false;
    this.haveFilteredResults = true;

    if(this.selectedAccommodationType == '1'){
      this.accommodationType = AccommodationType.HOTEL;
    }else if(this.selectedAccommodationType == '2'){
      this.accommodationType = AccommodationType.APARTMENT;
    }
    if(this.headerFilterForm.value.startDate != null && this.headerFilterForm.value.endDate != null){
      this.priceVisibility = true;
    }
    this.accommodationService.filterAccommodations(this.headerFilterForm.value.city,this.headerFilterForm.value.numOfGuests,this.headerFilterForm.value.startDate,this.headerFilterForm.value.endDate,
      this.startedValue,this.endValue,this.amenities,this.accommodationType).subscribe({
        next:(accommodations: AccommodationPopular[]) => {
          this.filteredAccommodations = accommodations;

          console.log(this.filteredAccommodations);

          if(this.filteredAccommodations.length == 0){
            this.haveFilteredResults = false;
          }
        }
      })
  }

}
