
// import { Component } from '@angular/core';
import {CommentModel} from "./model/comment.model";
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {GoogleMap} from '@angular/google-maps'


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

	amenitieWifi = "assets/images/wifi.svg";
	amenitieBreakfast = "assets/images/breakfast.svg";
	amenitieAirCondition = "assets/images/air_condition.svg";
	amenitieParking= "assets/images/parking.svg";

	title = "Suncev Breg";
	starFill = "assets/images/star-fill.svg"
	star = "assets/images/star.svg"
	review: number = 4.6;
	reviewNumbers: number = 200;
	address = "Liman 4, Novi Sad, Srbija";
	descText = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. " +
		"Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a " +
		"galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, " +
		"but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s " +
		"with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing " +
		"software like Aldus PageMaker including versions of Lorem Ipsum. It is a long established fact that a reader " +
		"will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum " +
		"is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', " +
		"making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as " +
		"their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. " +
		"Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).";

	commentsAboutAcc: CommentModel[] = [];

	myLatLng: {lat : number, lng: number} = { lat: 42.546, lng: 21.882 };
	mapOptions: google.maps.MapOptions = {
		center: this.myLatLng,
		zoom: 15,
	};

	spot: { id: number; lat: number; lng: number } = { id: 1, lat: 42.546, lng: 21.882};



	allCommentsVisible = false; // Da li su svi komentari vidljivi
	comments: any[] = []; // Niz svih komentara
	displayedComments: any[] = []; // Niz komentara koji trenutno treba da se prikažu

	// Inicijalizacija komentara (možete dobiti ove podatke sa servera ili ih hardkodirati)
	constructor() {
		this.comments = [
			{review: "5/5 Excellent", name: "Mark Zuckenberg", date: "Oct 10, 2023",
				description:  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. " +
					"Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took " +
					"a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, " +
					"but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the " +
					"1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop " +
					"publishing software like Aldus PageMaker including versions of Lorem Ipsum."},
			{review: "5/5 Excellent", name: "Mark Zuckenberg", date: "Oct 10, 2023",
				description:  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. " +
					"Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took " +
					"a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, " +
					"but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the " +
					"1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop " +
					"publishing software like Aldus PageMaker including versions of Lorem Ipsum."},
			{review: "5/5 Excellent", name: "Mark Zuckenberg", date: "Oct 10, 2023",
				description:  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. " +
					"Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took " +
					"a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, " +
					"but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the " +
					"1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop " +
					"publishing software like Aldus PageMaker including versions of Lorem Ipsum."},
			{review: "5/5 Excellent", name: "Mark Zuckenberg", date: "Oct 10, 2023",
				description:  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. " +
					"Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took " +
					"a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, " +
					"but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the " +
					"1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop " +
					"publishing software like Aldus PageMaker including versions of Lorem Ipsum."},
			{review: "5/5 Excellent", name: "Mark Zuckenberg", date: "Oct 10, 2023",
				description:  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. " +
					"Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took " +
					"a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, " +
					"but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the " +
					"1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop " +
					"publishing software like Aldus PageMaker including versions of Lorem Ipsum."}
		];
		this.updateDisplayedComments();
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

}


