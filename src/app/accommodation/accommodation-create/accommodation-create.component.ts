import { Component } from '@angular/core';

@Component({
  selector: 'app-accommodation-create',
  templateUrl: './accommodation-create.component.html',
  styleUrls: ['./accommodation-create.component.css']
})
export class AccommodationCreateComponent {

	buttonStates: { [key: string]: { button1: boolean, button2: boolean } } = {};
	constructor() {
		for (let i = 1; i <= 18; i++) {
			this.buttonStates[`button${i}`] = { button1: false, button2: false };
		}
	}

	title = "Tell us a little about your property?";
	descOfTitle = "Start with your property name, like Hilton Downtown Los Angeles. This will make it easier to " +
		"find your address.";
	photoText = "Travelers interact with photos more than any other part of your property listing, and the right " +
		"ones can make a difference. We recommend using as many photos as you can, but 6 unique photos are required to " +
		"get you started. Duplicates will be removed and need to be replaced.";
	locationPicture = "assets/images/location_on.png";
	option: string = "option1";
	acccommodationTypes: string[] = ["Hotel", "Apartment"];

	myLatLng: {lat : number, lng: number} = { lat: 42.546, lng: 21.882 };
	mapOptions: google.maps.MapOptions = {
		center: this.myLatLng,
		zoom: 15,
	};

	spot: { id: number; lat: number; lng: number } = { id: 1, lat: 42.546, lng: 21.882};

	descOfCancPolicy = "A cancellation window is the amount of time before your local cancellation cutoff (18:00) " +
		"on the day of check-in."

	optionsCancPolicy = [
		{ id: '1', label: '24-hour cancellation' },
		{ id: '2', label: '48-hour cancellation' },
		{ id: '3', label: '72-hour cancellation' },
		{ id: '4', label: 'Non-refundable' },
	];

	amenitieWifi = "assets/images/wifi.svg";
	amenitieBreakfast = "assets/images/breakfast.svg";
	amenitieAirCondition = "assets/images/air_condition.svg";
	amenitieParking= "assets/images/parking.svg";
	amenitieKitchen = "assets/images/kitchen.svg";
	amenitiePoolAccess = "assets/images/pool_access.svg";
	amenitieLunch = "assets/images/breakfast.svg";
	amenitieDinner = "assets/images/breakfast.svg";
	amenitieTV = "assets/images/tv.svg";

	toggleColor(button: string, buttonNumber: string) {
		// @ts-ignore
		this.buttonStates[button][buttonNumber] = !this.buttonStates[button][buttonNumber];
		const pairButtonNumber = buttonNumber === 'button1' ? 'button2' : 'button1';
		// @ts-ignore
		this.buttonStates[button][pairButtonNumber] = !this.buttonStates[button][buttonNumber];
	}

	// wifiState = this.buttonStates['button1'].button1;
	selectedPriceDef: string = 'property';
	propertyDescription: string = ''
	selectedReservationDef: string = 'automatic';
	selectedCancPolicy: string = '4';
}
