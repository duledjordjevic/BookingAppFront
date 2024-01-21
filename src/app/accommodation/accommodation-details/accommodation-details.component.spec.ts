// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { BrowserModule, By } from '@angular/platform-browser';
// import { AccommodationDetailsComponent } from './accommodation-details.component';
// import { GoogleMapsModule } from '@angular/google-maps';
// import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
// import { CommonModule, NgOptimizedImage } from '@angular/common';
// import { ActivatedRoute, Router, RouterModule, convertToParamMap } from '@angular/router';
// import { MaterialModule } from 'src/app/infrastructure/material/material.module';
// import { NgxDropzoneModule } from 'ngx-dropzone';
// import { ReactiveFormsModule } from '@angular/forms';
// import { MatCheckboxModule } from '@angular/material/checkbox';
// import { MatSliderModule } from '@angular/material/slider';
// import { AnalyticsModule } from 'src/app/analytics/analytics.module';
// import { CommentsModule } from 'src/app/comments/comments.module';
// import { AccommodationService } from '../services/accommodation.service';
// import { MapService } from 'src/app/layout/map/map.service';
// import { ReservationService } from '../services/reservation.service';
// import { AuthService } from 'src/app/infrastructure/auth/services/auth.service';
// import { DialogService } from 'src/app/shared/services/dialog.service';
// import { MatDialog } from '@angular/material/dialog';
// import { ChangeDetectorRef, DebugElement } from '@angular/core';
// import { of } from 'rxjs';
// import { AccommodationModule } from '../accommodation.module';


// describe('AccommodationDetailsComponent', () => {
//   let component: AccommodationDetailsComponent;
//   let fixture: ComponentFixture<AccommodationDetailsComponent>;
//   let httpController: HttpTestingController;

// //   let mockActivatedRoute = {
// //     params: of({ accommodationId: '123' })
// //   };

// //   let de: DebugElement;
// //   let el: HTMLElement;
// //   let mockAuthService:jasmine.SpyObj<AuthService>;
//   let mockAccommodationService:jasmine.SpyObj<AccommodationService>;
// //   let mockMapService:jasmine.SpyObj<MapService>;
//   let mockReservationService:jasmine.SpyObj<ReservationService>;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [
//         AccommodationDetailsComponent
//     ],
//       imports: [
//         BrowserModule,
//         HttpClientTestingModule,
//         CommonModule,
// 		NgOptimizedImage,
// 		GoogleMapsModule,
// 		RouterModule,
// 		MaterialModule,
// 		NgxDropzoneModule,
// 		ReactiveFormsModule,
// 		MatCheckboxModule,
// 		MatSliderModule,
// 		AnalyticsModule,
// 		CommentsModule,
//         AccommodationModule
//     ],
//         providers:[
            
//             {
//                 provide: ActivatedRoute,
//                 useValue: {
//                   snapshot: {
//                     paramMap: convertToParamMap({ id: 'your-id-value' }),
//                   },
//                 },
//               },
//             //   { provide: AuthService, useValue: mockAuthService },
//               { provide: AccommodationService, useValue: mockAccommodationService },
//             //   { provide: MapService, useValue: mockMapService },
//               { provide: ReservationService, useValue: mockReservationService },
//             //   { provide: ActivatedRoute, useValue: mockActivatedRoute }

//         ]
//     });
//     fixture = TestBed.createComponent(AccommodationDetailsComponent);
//     component = fixture.componentInstance;
//     // fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });



// });
