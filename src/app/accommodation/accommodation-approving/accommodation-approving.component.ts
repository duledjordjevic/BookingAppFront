import { Component } from '@angular/core';
import { AccommodationCard } from '../model/card.model';
import { AccommodationService } from '../services/accommodation.service';
import { environment } from 'src/env/env';
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
    this.accommodationService.getAccommodations().subscribe({
      next:(accommodations: AccommodationCard[]) =>{
        const card: AccommodationCard = accommodations[0];
        card.description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Id leo in vitae turpis massa sed elementum tempus egestas. Ipsum dolor sit amet consectetur adipiscing elit ut aliquam. Iaculis eu non diam phasellus vestibulum lorem sed risus. In dictum non consectetur a erat nam at lectus. Senectus et netus et malesuada fames. Nibh nisl condimentum id venenatis a condimentum vitae sapien. Iaculis at erat pellentesque adipiscing commodo. Nunc sed augue lacus viverra vitae. Dictum at tempor commodo ullamcorper a lacus. Morbi leo urna molestie at elementum. Eros in cursus turpis massa tincidunt. Donec massa sapien faucibus et molestie ac feugiat sed. ";
        card.address = "Banovic Strahinje 30, Vranje";
        // const card2: AccommodationCard = accommodations[1];
        // card2.description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Id leo in vitae turpis massa sed elementum tempus egestas. Ipsum dolor sit amet consectetur adipiscing elit ut aliquam. Iaculis eu non diam phasellus vestibulum lorem sed risus. In dictum non consectetur a erat nam at lectus. Senectus et netus et malesuada fames. Nibh nisl condimentum id venenatis a condimentum vitae sapien. Iaculis at erat pellentesque adipiscing commodo. Nunc sed augue lacus viverra vitae. Dictum at tempor commodo ullamcorper a lacus. Morbi leo urna molestie at elementum. Eros in cursus turpis massa tincidunt. Donec massa sapien faucibus et molestie ac feugiat sed. ";
        // card2.address = "Banovic Strahinje 30, Vranje";
        this.cards = [card];
      },
      error:(err : any)=>{
        console.log(err);
      }
    })
  }

  approve(id: number): void {

  }

  decline(id: number): void {

  }
}
