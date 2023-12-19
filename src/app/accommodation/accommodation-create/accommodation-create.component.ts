import {ChangeDetectorRef, Component, inject} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Accommodation, AccommodationType, Amenities} from "../model/accommodation.model";
import {MapService} from "../../layout/map/map.service";
import {Address} from "../../models/shared.models";
import {CancellationPolicy} from "../model/cancellation-policy.model";
import {ApprovalStatus} from "../model/approval-status.model";
import {ReservationMethod} from "../model/reservation-method.model";
import {AccommodationService} from "../services/accommodation.service";
import {AuthService} from "../../infrastructure/auth/services/auth.service";

@Component({
  selector: 'app-accommodation-create',
  templateUrl: './accommodation-create.component.html',
  styleUrls: ['./accommodation-create.component.css']
})
export class AccommodationCreateComponent {

	buttonStates: { [key: string]: { button1: boolean, button2: boolean } } = {};
	constructor(private mapService: MapService, private cdr: ChangeDetectorRef,
				private accommodationService: AccommodationService, private authService: AuthService) {
		for (let i = 1; i <= 18; i++) {
			this.buttonStates[`button${i}`] = { button1: false, button2: false };
		}
	}

	fb = inject(FormBuilder);

	title = "Tell us a little about your property?";
	descOfTitle = "Start with your property name, like Hilton Downtown Los Angeles. This will make it easier to " +
		"find your address.";
	photoText = "Travelers interact with photos more than any other part of your property listing, and the right " +
		"ones can make a difference. We recommend using as many photos as you can, but 6 unique photos are required to " +
		"get you started. Duplicates will be removed and need to be replaced.";

	option: string = "option1";

	myLatLng: {lat : number, lng: number} = { lat: 42.546, lng: 21.882 };
	mapOptions: google.maps.MapOptions = {
		center: this.myLatLng,
		zoom: 15,
	};

	spot: { id: number; lat: number; lng: number } = { id: 1, lat: 42.546, lng: 21.882};

	lat: number = 0;
	lng: number = 0;

	descOfCancPolicy = "A cancellation window is the amount of time before your local cancellation cutoff (18:00) " +
		"on the day of check-in."

	optionsCancPolicy = [
		{ id: '1', label: '24-hour cancellation' },
		{ id: '2', label: '48-hour cancellation' },
		{ id: '3', label: '72-hour cancellation' },
		{ id: '4', label: 'Non-refundable' },
	];

	optionsPaymentMethod  = [
		{ id: '1', label: 'By property' },
		{ id: '2', label: 'By guests' },
	];

	optionsReservationDefinition = [
		{ id: '1', label: 'Automatic' },
		{ id: '2', label: 'Manual' },
	];

	buttonClicked = false;
	setLocationOnMap() {
		this.buttonClicked = !this.buttonClicked;
		this.lat = 0;
		this.lng = 0;

		this.mapService.search(this.accommodation.value.street + ', ' + this.accommodation.value.city).subscribe({
			next: (result) => {
				if (result && result.length > 0 && result[0].lat !== undefined && result[0].lon !== undefined) {
					this.lat = Number(result[0].lat);
					this.lng = Number(result[0].lon);

					this.spot.lat = this.lat;
					this.spot.lng = this.lng;
					this.myLatLng.lat = this.lat;
					this.myLatLng.lng = this.lng;
					this.mapOptions.center = this.myLatLng;
					this.mapOptions = {
						center: this.myLatLng,
						zoom: 15,
					};
				}
			},
		});
	}

	amenityData = [
		{ amenitie: Amenities.WIFI, question: 'Do you offer internet?', image: "assets/images/wifi.svg"},
		{ amenitie: Amenities.PARKING, question: 'Do you offer parking?', image: "assets/images/parking.svg" },
		{ amenitie: Amenities.TV, question: 'Do your guests have TV access?', image: "assets/images/tv.svg"},
		{ amenitie: Amenities.BREAKFAST, question: 'Do you offer breakfast?', image: "assets/images/breakfast.svg" },
		{ amenitie: Amenities.LUNCH, question: 'Do you offer lunch?', image: "assets/images/breakfast.svg"},
		{ amenitie: Amenities.DINNER, question: 'Do you offer dinner?', image: "assets/images/breakfast.svg"},
		{ amenitie: Amenities.POOL, question: 'Do your guests have pool access?', image: "assets/images/pool_access.svg"},
		{ amenitie: Amenities.AIRCONDITION, question: 'Do you offer air conditioning?', image: "assets/images/air_condition.svg" },
		{ amenitie: Amenities.KITCHEN, question: 'Do you offer kitchen?', image: "assets/images/kitchen.svg" },
	];

	selectedAmenities: Amenities[] = [];

	toggleColor(button: string, buttonNumber: string, amenitie: Amenities) {
		// @ts-ignore
		this.buttonStates[button][buttonNumber] = !this.buttonStates[button][buttonNumber];
		const pairButtonNumber = buttonNumber === 'button1' ? 'button2' : 'button1';
		// @ts-ignore
		this.buttonStates[button][pairButtonNumber] = !this.buttonStates[button][buttonNumber];

		const amenityName = Amenities[amenitie];

		if (buttonNumber === 'button1' && this.buttonStates[button]['button1']) {
			// Provera da li je dugme "Yes" za istu amenitiju uključeno
			if (!this.buttonStates[button]['button2']) {
				// Provera da li je amenitija već dodata
				if (!this.selectedAmenities.includes(amenitie)) {
					this.selectedAmenities.push(amenitie);
				}
			}
		} else if (buttonNumber === 'button2' && this.buttonStates[button]['button2']) {
			// Provera da li je dugme "No" za istu amenitiju uključeno
			if (!this.buttonStates[button]['button1']) {
				// Ukloni amenitiju ako je već dodata
				this.selectedAmenities = this.selectedAmenities.filter(selectedAmenity => selectedAmenity !== amenitie);
			}
		}
	}



	// @ts-ignore
	accommodation = this.fb.nonNullable.group({
		title: ['', Validators.required],
		type: ['', Validators.required],
		city: ['', Validators.required],
		postalCode: ['', Validators.required],
		street: ['', Validators.required],
		state: ['', Validators.required],
		description: ['', Validators.required],
		cancellationPolicy: ['Non-refundable', Validators.required],
		reservationMethod: ['Automatic', Validators.required],
		isPriceForEntireAcc: ['By property', Validators.required],
		minGuests: [1, Validators.required],
		maxGuests: [5, Validators.required],
	});

	// trimValues() {
	// 	const name = this.accommodation.value.name;
	// 	const lastName = this.accommodation.value.lastName;
	// 	const city = this.accommodation.value.city;
	// 	const street = this.accommodation.value.street;
	// 	const state = this.accommodation.value.state;
	// 	const phoneNumber = this.accommodation.value.phoneNumber;
	// 	const email = this.accommodation.value.email;
	// 	const password = this.accommodation.value.password;
	// 	const confirmPassword = this.accommodation.value.confirmPassword;
	//
	// 	this.accommodation.patchValue({
	// 		name: name?.trim(),
	// 		lastName: lastName?.trim(),
	// 		city: city?.trim(),
	// 		street: street?.trim(),
	// 		state: state?.trim(),
	// 		phoneNumber: phoneNumber?.trim(),
	// 		email: email?.trim(),
	// 		password: password?.trim(),
	// 		confirmPassword: confirmPassword?.trim()
	// 	});
	// }

	mapCancellationPolicy(value: string | undefined): CancellationPolicy | undefined {
		switch (value) {
			case '24-hour cancellation':
				return CancellationPolicy.HOURS24;
			case '48-hour cancellation':
				return CancellationPolicy.HOURS48;
			case '72-hour cancellation':
				return CancellationPolicy.HOURS72;
			case 'Non-refundable':
				return CancellationPolicy.NON_REFUNDABLE;
			default:
				return undefined;
		}
	}

	mapReservationMethod(value: string | undefined): ReservationMethod | undefined {
		switch (value) {
			case 'Automatic':
				return ReservationMethod.AUTOMATIC;
			case 'Manual':
				return ReservationMethod.MANUAL;
			default:
				return undefined;
		}
	}

	mapPaymentMethod(value: string | undefined): boolean {
		return value === 'By property';
	}

	mapAccommodationType(value: string | undefined): AccommodationType | undefined{
		switch (value) {
			case 'HOTEL':
				return AccommodationType.HOTEL;
			case 'Manual':
				return AccommodationType.APARTMENT;
			default:
				return undefined;
		}
	}

	onSubmit(): void {
		// this.trimValues()

		if (this.accommodation.valid || this.accommodation.disabled)  {
			const address: Address = {
				id: null,
				street: this.accommodation.value.street || "",
				city: this.accommodation.value.city || "",
				postalCode: this.accommodation.value.postalCode || "",
				state: this.accommodation.value.state || "",
				latitude: 0,
				longitude: 0

			}
			// @ts-ignore
			const acc: Accommodation = {
				id: null,
				title: this.accommodation.value.title || "",
				type: this.mapAccommodationType(this.accommodation.value.type) as AccommodationType,
				description: this.accommodation.value.description || "",
				address: address,
				cancellationPolicy: this.mapCancellationPolicy(this.accommodation.value.cancellationPolicy) as CancellationPolicy,
				isPriceForEntireAcc: this.mapPaymentMethod(this.accommodation.value.isPriceForEntireAcc),
				amenities: this.selectedAmenities,
				accommodationApprovalStatus: ApprovalStatus.PENDING,
				reservationMethod: this.mapReservationMethod(this.accommodation.value.reservationMethod) as ReservationMethod,
				maxGuest: this.accommodation.value.maxGuests || 0,
				minGuest: this.accommodation.value.minGuests || 0,
				prices: null,
				images: null,
				hostId: this.authService.getId()
			}

			// console.log(this.accommodation.value);
			console.log("----");
			console.log(acc);
			console.log("----");

			this.accommodationService.addAccommodation(acc).subscribe({
				next: (createdAcc) => {
					console.log("this is created acc");
					console.log(createdAcc);
				},
				error: (error) => {
					console.error("Error creating accommodation:", error);
				}
			});
			console.log(this.selectedAmenities);
		} else {
			console.log('Forma nije ispravna. Popunite obavezna polja.');
		}
	}
}
