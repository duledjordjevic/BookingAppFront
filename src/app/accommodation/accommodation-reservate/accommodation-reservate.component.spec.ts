import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccommodationReservateComponent } from './accommodation-reservate.component';
import { BrowserModule, By } from '@angular/platform-browser';
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
  let el: HTMLElement;

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

  it('should call onSubmit, but not reservate',() => {
    spyOn(component, 'calculateReservationPrice');
    el = fixture.debugElement.query(By.css('.reservate button')).nativeElement;
    el.click();
    expect(component.calculateReservationPrice).toHaveBeenCalledTimes(0);
  });

  it('should navigate to login for unregistered user',() => {
    component.user = 'UNREGISTERED';
    spyOn(component, 'setCustomValidators');

    el = fixture.debugElement.query(By.css('.reservate button')).nativeElement;
    el.click();

    expect(component.setCustomValidators).toHaveBeenCalledTimes(0);
  });

  it("form should be invalid", () => {
    spyOn(component, 'getAvailableDates').and.returnValue(undefined);
    const startDate = new Date('2024-01-20');

    for (let i = 0; i < 10; i++) {
      const nextDate = new Date(startDate);
      nextDate.setDate(startDate.getDate() + i);
      component.availableDates.push(nextDate);
    }

    component.reservationForm.get("startDate")?.setValue(new Date());
    component.reservationForm.get("endDate")?.setValue(new Date());

    component.reservationForm.get("numOfGuests")?.setValue(0);

    expect(component.reservationForm.valid).toBeFalsy();
  });

  it("form valid but numOfGuest not selected", () => {
    spyOn(component, 'getAvailableDates').and.returnValue(undefined);
    const startDate = new Date('2024-02-20');

    for (let i = 0; i < 10; i++) {
      const nextDate = new Date(startDate);
      nextDate.setDate(startDate.getDate() + i);
      component.availableDates.push(nextDate);
    }
    component.reservationForm.get("startDate")?.setValue(new Date('2024-02-22'));
    component.reservationForm.get("endDate")?.setValue(new Date('2024-02-25'));
    component.reservationForm.get("numOfGuests")?.setValue(0);

    spyOn(component, 'calculateReservationPrice');

    el = fixture.debugElement.query(By.css('.reservate button')).nativeElement;
    el.click();

    expect(component.calculateReservationPrice).toHaveBeenCalledTimes(0);
  });

  it("form should be valid", () => {
    spyOn(component, 'getAvailableDates').and.returnValue(undefined);
    const startDate = new Date('2024-02-20');

    for (let i = 0; i < 10; i++) {
      const nextDate = new Date(startDate);
      nextDate.setDate(startDate.getDate() + i);
      component.availableDates.push(nextDate);
    }
    component.reservationForm.get("startDate")?.setValue(new Date('2024-02-22'));
    component.reservationForm.get("endDate")?.setValue(new Date('2024-02-25'));

    component.reservationForm.get("numOfGuests")?.setValue(5);


    spyOn(component, 'calculateReservationPrice');

    el = fixture.debugElement.query(By.css('.reservate button')).nativeElement;
    el.click();

    expect(component.reservationForm.valid).toBeTruthy();
    expect(component.calculateReservationPrice).toHaveBeenCalledTimes(1);

  });

});
