
// import { Component } from '@angular/core';
import { AccommodationService } from "../services/accommodation.service";
import {CommentModel} from "./model/comment.model";
import { AfterViewInit, Component, OnInit, ViewChild, inject } from '@angular/core';
import { RatingModel } from "./model/rating.model";
import { AccommodationDetails, Amenities, AmenitiesIcons } from "./model/accommodation.model";
import { MapService } from "src/app/layout/map/map.service";
import { ReservationService } from "../services/reservation.service";
import { Reservation } from "../model/reservation.model";
import { AbstractControl, FormBuilder, ValidationErrors, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "src/app/infrastructure/auth/services/auth.service";

@Component({
  selector: 'app-accommodation-details',
  templateUrl: './accommodation-details.component.html',
  styleUrls: ['./accommodation-details.component.css']
})
export class AccommodationDetailsComponent{

	constructor(private accommodationService: AccommodationService, private mapService: MapService, 
		private reservationService: ReservationService, private authService: AuthService) {
		this.updateDisplayedComments();
		this.reservationForm.get('numOfGuests')?.setValue(0);
	}

	mainPicture = "assets/images/main.jpeg";

	WIFI = "assets/images/wifi.svg";
	amenitieBreakfast = "assets/images/breakfast.svg";
	amenitieAirCondition = "assets/images/air_condition.svg";
	amenitieParking= "assets/images/parking.svg";

	starFill = "assets/images/star-fill.svg"
	star = "assets/images/star.svg"
	
	commentsAboutAcc: CommentModel[] = [];

	myLatLng: {lat : number, lng: number} = { lat: 42.546, lng: 21.882 };
	mapOptions: google.maps.MapOptions = {};


	search(street: string): void {
		this.mapService.search(street).subscribe({
		  next: (result) => {
			this.myLatLng = { lat: Number(result[0].lat), lng: Number(result[0].lon) };
			this.mapOptions =  {
				center: this.myLatLng,
				zoom: 15,
			};
		  },
		  error: () => {},
		});
	  }


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
	


	remainingPicturesCount: number = 0;
	displayLinkToRemainingPictures: boolean = true;
	haveCommentsAndReviews: boolean = true;
	numberOfGuests: number[] = [];
	
	ngOnInit(): void{
		this.accommodationService.getCommentsAboutAcc(1).subscribe({
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

		this.accommodationService.getAccommodationInfo(1).subscribe({
			next:(accommodationInfo: AccommodationDetails)=> {
				this.accommodationDetails = accommodationInfo;

				this.search(this.accommodationDetails.address.street + ', ' + this.accommodationDetails.address.city);

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



	
	fb = inject(FormBuilder)
	http = inject(HttpClient)
	
	reservationForm = this.fb.nonNullable.group({
		startDate: [new Date(), Validators.required],
		endDate: [new Date(), Validators.required],
		numOfGuests: [0, Validators.required]
	});

	
	// reservation: Reservation = {
	// 	startDate: new Date('2023-12-17'),
	// 	endDate: new Date('2023-12-18'),
	// 	numberOfGuests: 3,
	// 	guestId: 3,
	// 	accommodationId: 1
	// }
	
	setCustomValidators() {
		this.reservationForm.setValidators(this.dateValidator.bind(this));
		this.reservationForm.updateValueAndValidity();
	  }
	
	dateValidator(control: AbstractControl): ValidationErrors | null {
		const startDate = control.get('startDate')?.value;
		const endDate = control.get('endDate')?.value;

		if (startDate && endDate && startDate > endDate) {
			return { 'dateError': true, 'message': 'End date must be greater than start date.' };
		}

		if (startDate && startDate < new Date()) {
			return { 'dateError': true, 'message': 'Start date must be in the future.' };
		}

		return null;
	}


	fieldsNotValid: boolean = false;
	notAvailable : boolean = false;
	createdReservation: boolean = false;

	onSubmit(){
		this.setCustomValidators();

		this.fieldsNotValid = false;
		this.notAvailable = false;
		this.createdReservation = false;

		if(this.reservationForm.valid && this.reservationForm.value.numOfGuests !== 0){
			this.reservationForm.value.startDate?.setHours(this.reservationForm.value.startDate.getHours() + 1);
			this.reservationForm.value.endDate?.setHours(this.reservationForm.value.endDate.getHours() + 1);
			const reservation: Reservation = {
				startDate: this.reservationForm.value.startDate,
				endDate: this.reservationForm.value.endDate,
				numberOfGuests: this.reservationForm.value.numOfGuests,
				guestId: this.authService.getId(),
				accommodationId: this.accommodationDetails?.id
			}
			this.reservate(reservation);
		}
		else{
			this.fieldsNotValid = true;
		}
	}


	reservate(reservation: Reservation): void{
		this.reservationService.reservate(reservation).subscribe({
			next: () => {
				this.createdReservation = true;
			},
			error: () => {
				this.notAvailable = true;
			}
		})
	}

}


