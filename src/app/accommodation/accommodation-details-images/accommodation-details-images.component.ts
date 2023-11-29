import { Component } from '@angular/core';

@Component({
  selector: 'app-accommodation-details-images',
  templateUrl: './accommodation-details-images.component.html',
  styleUrls: ['./accommodation-details-images.component.css']
})
export class AccommodationDetailsImagesComponent {

  images: {src : string, name: string}[] = [
    { src: "../../../assets/images/side1.jpg", name: "side1"},
    { src: "../../../assets/images/side2.jpg", name: "side2"},
    { src: "../../../assets/images/side3.jpg", name: "side3"}
  ];
}
