
// import { Component } from '@angular/core';
import { AccommodationService } from "../services/accommodation.service";
import {CommentModel} from "../model/comment.model";
import { AfterViewInit, Component, OnInit, ViewChild, inject } from '@angular/core';
import { RatingModel } from "../model/rating.model";
import { AccommodationDetails, Amenities, AmenitiesIcons } from "../model/accommodation.model";
import { MapService } from "src/app/layout/map/map.service";
import { ReservationService } from "../services/reservation.service";
import { Reservation } from "../model/reservation.model";
import { AbstractControl, FormBuilder, ValidationErrors, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "src/app/infrastructure/auth/services/auth.service";
import { Observable } from "rxjs";
import { DialogService } from "src/app/shared/services/dialog.service";
import { ReservationMethod } from "../model/reservation-method.model";
import { MatCalendarCellCssClasses, MatDatepicker } from "@angular/material/datepicker";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-accommodation-details',
  templateUrl: './accommodation-details.component.html',
  styleUrls: ['./accommodation-details.component.css']
})
export class AccommodationDetailsComponent{

	constructor(private accommodationService: AccommodationService, private mapService: MapService, 
		private reservationService: ReservationService, private authService: AuthService,
		private dialogService: DialogService,private route: ActivatedRoute,private router: Router) {
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
	allCommentsVisible = false; 
	comments: CommentModel[] = []; 
	displayedComments: CommentModel[] = []; 
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
	accommodationId:number = 0;
	
	ngOnInit(): void{
		this.route.queryParams.subscribe(params => {
        	console.log(params); 
        	this.accommodationId = params['id'];
     	});
		this.accommodationService.getCommentsAboutAcc(this.accommodationId).subscribe({
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

		this.accommodationService.getAccommodationInfo(this.accommodationId).subscribe({
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
						break;
					  case 'BREAKFAST':
						amenitie.icon= 'assets/images/breakfast.svg';
						break;
					  case 'PARKING':
						amenitie.icon= 'assets/images/parking.svg';
						break;
					  case 'POOL':
						amenitie.icon= 'assets/images/swimming-pool.svg';
						break;
					  case 'AIRCONDITION':
						amenitie.icon= 'assets/images/air_condition.svg';
						break;
					  case 'KITCHEN':
						amenitie.icon= 'assets/images/kitchen-spoons-icon.svg';
						break;
					  case 'DINNER':
						amenitie.icon= 'assets/images/breakfast.svg';
						break;
					  case 'LUNCH':
						amenitie.icon= 'assets/images/breakfast.svg';
						break;
					  case 'TV':
						amenitie.icon= 'assets/images/tv.svg';
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

				//availableDates
				this.getAvailableDates(accommodationInfo.id);
				
				this.user = this.authService.getRole() ?? 'UNREGISTERED';
			}
			
		})
		
		
	}

	user: string = "";
	

	expandComments() {
		this.allCommentsVisible = true;
		this.updateDisplayedComments();
	}

	updateDisplayedComments() {
		if (this.allCommentsVisible) {
			this.displayedComments = this.comments;
		} else {
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

	availableDates: Date[] = [];

	rangeFilter = (date: Date | null): boolean => {
		if (!date || !this.availableDates) {
		  return false;
		}
		return this.availableDates.some(availableDate => availableDate.getTime() === date?.getTime());
	};

	getAvailableDates(id: number){
		this.reservationService.getAvailableDates(id).subscribe({
			next: (availableDates) => {
				availableDates.forEach( (availableDate) => {
					const date:Date = new Date(availableDate)
					this.availableDates.push(new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0))
				})
			}
		})
	}
	
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
	serverError: boolean = false;
	reservationMessage: string = "";
	reservationPrice: number = 0;

	onSubmit(){
		if(this.user == "UNREGISTERED"){
			this.router.navigate(["login"]);
		}
		this.setCustomValidators();

		this.fieldsNotValid = false;
		this.notAvailable = false;
		this.createdReservation = false;

		if(this.reservationForm.valid && this.reservationForm.value.numOfGuests !== 0){
			const reservation: Reservation = this.getReservationFromForm();
			this.calculateReservationPrice(reservation);
		}
		else{
			this.fieldsNotValid = true;
		}
	}

	reservationDialog(price: number) {
		this.dialogService
		  .confirmDialog({
			title: 'Are you sure?',
			message: 'Price for reservation is: ' + price + '$',
			confirmCaption: 'Yes',
			cancelCaption: 'No',
		  })
		  .subscribe((yes: any) => {
			if (yes) this.reservate(this.getReservationFromForm());
		  });
	}

	getReservationFromForm(): Reservation {
		this.reservationForm.value.startDate?.setHours(this.reservationForm.value.startDate.getHours() + 1);
		this.reservationForm.value.endDate?.setHours(this.reservationForm.value.endDate.getHours() + 1);
		const reservation: Reservation = {
			startDate: this.reservationForm.value.startDate,
			endDate: this.reservationForm.value.endDate,
			numberOfGuests: this.reservationForm.value.numOfGuests,
			guestId: this.authService.getId(),
			accommodationId: this.accommodationDetails?.id
		}
		return reservation;
	}

	calculateReservationPrice(reservation: Reservation): void{
		this.reservationService.getReservationPrice(reservation).subscribe({
			next: (price) => {
				this.reservationPrice = price;
				if (this.reservationPrice !== 0){
					this.reservationDialog(this.reservationPrice);
				}else{
					this.notAvailable = true;
				}
			}
		})
		
	}

	reservate(reservation: Reservation): void{
		this.reservationService.reservate(reservation).subscribe({
			next: (reservationMethod) => {
				this.createdReservation = true;
				if(reservationMethod === ReservationMethod.MANUAL) {
					this.reservationMessage = "Now, you are waiting for approve.";
				}else{
					this.reservationMessage = "Reservation automatically accepted.";
				}
			},
			error: () => {
				this.notAvailable = true;
			}
		})
	}

	
}


