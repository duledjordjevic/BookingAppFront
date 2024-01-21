import { TestBed } from '@angular/core/testing';

import { ReservationService } from './reservation.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from 'src/app/infrastructure/auth/services/auth.service';

import { DatePipe} from '@angular/common';
import { mockReservation } from '../mocks/reservation.service.mock';
import { ReservationMethod } from '../model/reservation-method.model';
import { environment } from 'src/env/env';


describe('ReservationService', () => {
  let service: ReservationService;
  let authService: AuthService;
  let url = environment.apiHost;
  let httpController: HttpTestingController;
  

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [
            HttpClientTestingModule
        ],
        providers:[
            ReservationService,
            DatePipe
          ]
    });
    service = TestBed.inject(ReservationService);
    httpController = TestBed.inject(HttpTestingController);
    authService = TestBed.inject(AuthService);
  });

  afterEach(() => {
    httpController.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call reservate and return reservation method from the API', () => {
    const reservationMethodRet: ReservationMethod = ReservationMethod.AUTOMATIC;
    const url = environment.apiHost + 'reservations';

    service.reservate(mockReservation).subscribe((data) => {
        expect(data).toEqual(reservationMethodRet);
      });
    
    const req = httpController.expectOne({
        method: 'POST',
        url: url,
    }); 

    req.flush(reservationMethodRet);

  });

  
});
