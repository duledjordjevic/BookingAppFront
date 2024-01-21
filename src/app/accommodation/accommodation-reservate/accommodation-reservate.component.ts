import { Component, Input, inject } from '@angular/core';
import { ReservationService } from '../services/reservation.service';
import { Reservation } from '../model/reservation.model';
import { AuthService } from 'src/app/infrastructure/auth/services/auth.service';
import { AbstractControl, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { ReservationMethod } from '../model/reservation-method.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AccommodationDetails } from '../model/accommodation.model';
import { DialogService } from 'src/app/shared/services/dialog.service';

@Component({
  selector: 'app-accommodation-reservate',
  templateUrl: './accommodation-reservate.component.html',
  styleUrls: ['./accommodation-reservate.component.css']
})
export class AccommodationReservateComponent {
  @Input() accommodationDetails: AccommodationDetails | undefined;

  constructor(private reservationService: ReservationService,
    private authService: AuthService,
    private dialogService: DialogService,private router: Router){
    this.reservationForm.get('numOfGuests')?.setValue(0);

  }

  fieldsNotValid: boolean = false;
	notAvailable : boolean = false;
	createdReservation: boolean = false;
	serverError: boolean = false;
	reservationMessage: string = "";
	reservationPrice: number = 0;
  numberOfGuests: number[] = [];

  // accommodationDetails: AccommodationDetails |undefined;

  ngOnInit(){
    if(this.accommodationDetails){
      this.getAvailableDates(this.accommodationDetails?.id!);
      for(let i  = this.accommodationDetails?.minGuest!; i <= this.accommodationDetails?.maxGuest!; i++){
        this.numberOfGuests.push(i);
      }
    }
    
  }



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
	fb = inject(FormBuilder)


  reservationForm = this.fb.nonNullable.group({
		startDate: [new Date(), Validators.required],
		endDate: [new Date(), Validators.required],
		numOfGuests: [0, Validators.required]
	});


  setCustomValidators() {
		this.reservationForm.setValidators(this.dateValidator.bind(this))
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

    onSubmit(){
      if(this.user == "UNREGISTERED"){
        this.router.navigate(["login"]);
        return;
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
    user: string = "";

  
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
