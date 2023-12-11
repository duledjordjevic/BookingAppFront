import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-accommodation-details-images',
  templateUrl: './accommodation-details-images.component.html',
  styleUrls: ['./accommodation-details-images.component.css']
})
export class AccommodationDetailsImagesComponent {
  images: string[] = [];
  
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        console.log(params); 
        this.images = params['img'];
      }
    );
  }
}
