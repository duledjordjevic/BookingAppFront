import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccommodationReservateComponent } from './accommodation-reservate.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';
import { ActivatedRoute, RouterModule, convertToParamMap } from '@angular/router';
import { MaterialModule } from 'src/app/infrastructure/material/material.module';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSliderModule } from '@angular/material/slider';
import { AnalyticsModule } from 'src/app/analytics/analytics.module';
import { CommentsModule } from 'src/app/comments/comments.module';
import { AccommodationModule } from '../accommodation.module';
import { AccommodationService } from '../services/accommodation.service';
import { ReservationService } from '../services/reservation.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AccommodationReservateComponent', () => {
  let component: AccommodationReservateComponent;
  let fixture: ComponentFixture<AccommodationReservateComponent>;

  let mockAccommodationService:jasmine.SpyObj<AccommodationService>;
  let mockReservationService:jasmine.SpyObj<ReservationService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AccommodationReservateComponent
      ],
      
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
        CommonModule,
		    NgOptimizedImage,
        GoogleMapsModule,
        RouterModule,
        MaterialModule,
        NgxDropzoneModule,
        ReactiveFormsModule,
        MatCheckboxModule,
        MatSliderModule,
        AnalyticsModule,
        CommentsModule,
        AccommodationModule
    ],
        providers:[
            
              { provide: AccommodationService, useValue: mockAccommodationService },
              { provide: ReservationService, useValue: mockReservationService },
        ]
    });
    fixture = TestBed.createComponent(AccommodationReservateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
