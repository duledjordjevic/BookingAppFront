import { Component } from '@angular/core';
import { AccommodationService } from '../services/accommodation.service';
import { AccommodationPopular } from '../model/accommodation.model';
import { environment } from 'src/env/env';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/infrastructure/auth/services/auth.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent {

	starFill = "assets/images/star-fill.svg"

  constructor(private route: ActivatedRoute, 
    private accommodationService: AccommodationService, private authService: AuthService){}


  ngOnInit(){
    this.getFavouritesAccommodations();
  }
  hostAccommodations: AccommodationPopular[] = [];
  imageBase64:string = environment.imageBase64;

  getFavouritesAccommodations() {
    this.accommodationService.getFavouritesAccommodations(this.authService.getId()).subscribe({
      next:(accommodations: AccommodationPopular[])=>{
        this.hostAccommodations = accommodations;
      }
    })
  }

  removeFavourite(accommodationId: number): void {
			this.accommodationService.removeFavourite(this.authService.getId(), accommodationId).subscribe({
				next: () => {
          this.getFavouritesAccommodations();
				},
				error: () => {
					console.log("error")
				}
			})
	}

}
