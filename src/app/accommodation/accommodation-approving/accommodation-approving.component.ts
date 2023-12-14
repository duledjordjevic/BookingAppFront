import { Component } from '@angular/core';
import { AccommodationCard } from '../model/card.model';
import { AccommodationService } from '../services/accommodation.service';
import { environment } from 'src/env/env';
import { AccommodationDetails } from '../model/accommodation.model';

@Component({
  selector: 'app-accommodation-approving',
  templateUrl: './accommodation-approving.component.html',
  styleUrls: ['./accommodation-approving.component.css']
})
export class AccommodationApprovingComponent {

  constructor(private accommodationService: AccommodationService){

  }

  imageBase64:string = environment.imageBase64;

  
  cards: AccommodationCard[] = [];

  ngOnInit(): void {
    this.getAccommodations();
  }

  getAccommodations() : void{
    this.accommodationService.getAccommodations().subscribe({
      next:(accommodations: AccommodationCard[]) =>{
        this.cards = accommodations;
      },
      error:(err : any)=>{
        console.log(err);
      }
    })
  }

  setApprovalStatusAccommodation(id: number, approvalStatus: string): void {
    this.accommodationService.setApprovalStatusAccommodation(id, approvalStatus).subscribe({
      next: (accommodation: AccommodationDetails) => {
          this.getAccommodations();
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

}
