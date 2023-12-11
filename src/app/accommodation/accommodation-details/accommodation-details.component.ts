
// import { Component } from '@angular/core';
import { AccommodationService } from "../services/accommodation.service";
import {CommentModel} from "../model/comment.model";
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { RatingModel } from "../model/rating.model";
import { AccommodationDetails, Amenities, AmenitiesIcons } from "../model/accommodation.model";


@Component({
  selector: 'app-accommodation-details',
  templateUrl: './accommodation-details.component.html',
  styleUrls: ['./accommodation-details.component.css']
})
export class AccommodationDetailsComponent{
	sidePicture1 = "assets/images/side1.jpg";
	sidePicture2 = "assets/images/side2.jpg";
	sidePicture3 = "assets/images/side3.jpg";
	sidePicture4 = "assets/images/side4.png";
	mainPicture = "assets/images/main.jpeg";

	WIFI = "assets/images/wifi.svg";
	amenitieBreakfast = "assets/images/breakfast.svg";
	amenitieAirCondition = "assets/images/air_condition.svg";
	amenitieParking= "assets/images/parking.svg";

	starFill = "assets/images/star-fill.svg"
	star = "assets/images/star.svg"
	
	commentsAboutAcc: CommentModel[] = [];

	myLatLng: {lat : number, lng: number} = { lat: 42.546, lng: 21.882 };
	mapOptions: google.maps.MapOptions = {
		center: this.myLatLng,
		zoom: 15,
	};

	spot: { id: number; lat: number; lng: number } = { id: 1, lat: 42.546, lng: 21.882};


	images:String[] = [];
	allCommentsVisible = false; // Da li su svi komentari vidljivi
	comments: CommentModel[] = []; // Niz svih komentara
	displayedComments: CommentModel[] = []; // Niz komentara koji trenutno treba da se prikažu
	ratings: RatingModel = {
		average: 0,
		count: 0,
		excellent:0,
		good:0,
		okay:0,
		poor:0,
		terrible:0,
	};
	
	accommodationDetails: AccommodationDetails |undefined;
	amenities: Amenities[] = [];
	amenitiesIcons: AmenitiesIcons[] = [];
	
	constructor(private service: AccommodationService) {
		this.updateDisplayedComments();
	}


	remainingPicturesCount: number = 0;
	displayLinkToRemainingPictures: boolean = true;
	haveCommentsAndReviews: boolean = true;
	numberOfGuests: number[] = [];
	
	ngOnInit(): void{
		this.service.getCommentsAboutAcc(3).subscribe({
			next:(allComments:CommentModel[]) =>{
				this.comments = allComments;
				this.ratings.count = this.comments.length;
				if(this.ratings.count == 0){
					this.haveCommentsAndReviews = false;
				}
				const updatedComments = this.comments.map(comment => {
					switch (comment.rating) {
					  case 5:
						comment.ratingDescription = 'Excellent';
						this.ratings.excellent += 1;
						break;
					  case 4:
						comment.ratingDescription = 'Good';
						this.ratings.good += 1;
						break;
					  case 3:
						comment.ratingDescription = 'Okay';
						this.ratings.okay += 1;
						break;
					  case 2:
						comment.ratingDescription = 'Poor';
						this.ratings.poor += 1;
						break;
					  case 1:
						comment.ratingDescription = 'Terrible';
						this.ratings.terrible += 1;
						break;
					  default:
						comment.ratingDescription = 'Unknown';
						break;
					}
					return comment;
				  });
				this.ratings.average = this.calculateAverageRating();
				this.displayedComments = updatedComments.slice(0, 3);
			}
		})
		this.service.getAccommodationInfo(2).subscribe({
			next:(accommodationInfo: AccommodationDetails)=> {
				this.accommodationDetails = accommodationInfo;

				this.amenities = accommodationInfo.amenities;
				for(const element of this.amenities){
					let amenitieTemp = {
						name:element,
						icon:""
					};
					this.amenitiesIcons.push(amenitieTemp);
				}
				const updatedAmenities = this.amenitiesIcons.map(amenitie => {
					switch (amenitie.name) {
					  case 'WIFI':
						amenitie.icon = 'assets/images/wifi.svg';
						this.ratings.excellent += 1;
						break;
					  case 'BREAKFAST':
						amenitie.icon= 'assets/images/breakfast.svg';
						this.ratings.good += 1;
						break;
					  case 'PARKING':
						amenitie.icon= 'assets/images/parking.svg';
						this.ratings.okay += 1;
						break;
					  case 'POOL':
						amenitie.icon= 'assets/images/swimming-pool.svg';
						this.ratings.poor += 1;
						break;
					  case 'AIRCONDITION':
						amenitie.icon= 'assets/images/air_condition.svg';
						this.ratings.terrible += 1;
						break;
					case 'KITCHEN':
						amenitie.icon= 'assets/images/kitchen-spoons-icon.svg';
						this.ratings.terrible += 1;
						break;
					  default:
						amenitie.icon= 'Unknown';
						break;
					}
					return amenitie;
				  });
				const updateImagesData = this.accommodationDetails.images.map(image =>{
					this.images.push('data:image/jpeg;base64,' + image);
				})
				this.remainingPicturesCount = this.images.length - 5;
				if(this.remainingPicturesCount == 0){
					this.displayLinkToRemainingPictures = false;
				}
				this.amenitiesIcons = updatedAmenities;
				for(let i  = this.accommodationDetails.minGuest; i <= this.accommodationDetails.maxGuest; i++){
					this.numberOfGuests.push(i);
				}
				console.log(this.accommodationDetails);
			}
		})
	}
	// Metoda koja se poziva prilikom klika na dugme
	expandComments() {
		this.allCommentsVisible = true;
		this.updateDisplayedComments();
	}

	// Metoda za ažuriranje prikazanih komentara
	updateDisplayedComments() {
		if (this.allCommentsVisible) {
			this.displayedComments = this.comments;
		} else {
			// Prikazi samo prvih 3 komentara
			this.displayedComments = this.comments.slice(0, 3);
		}
	}
	calculateAverageRating(): number {
	  
		const sumaOcena = this.comments.reduce((suma, komentar) => suma + komentar.rating, 0);
		const prosecnaOcena = sumaOcena / this.comments.length;
	  
		return Number(prosecnaOcena.toFixed(1));
	  }

}


