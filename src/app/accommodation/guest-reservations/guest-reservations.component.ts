import { ChangeDetectorRef, Component, NgZone, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Reservation, ReservationFilter, ReservationStatus } from 'src/app/accommodation/model/reservation.model';
import { ReservationService } from '../services/reservation.service';
import { SelectionModel } from '@angular/cdk/collections';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/infrastructure/auth/services/auth.service';
import { CancellationPolicy } from '../model/cancellation-policy.model';
import { CreateNotification, NotificationType } from 'src/app/notification/model/notification-host';
import { NotificationForHostService } from 'src/app/notification/services/notification-for-host.service';
import { elementAt } from 'rxjs';

@Component({
  selector: 'app-guest-reservations',
  templateUrl: './guest-reservations.component.html',
  styleUrls: ['./guest-reservations.component.css']
})
export class GuestReservationsComponent {
  constructor(private reservationService: ReservationService, 
    private fb: FormBuilder, private authService: AuthService, 
    private cdr:ChangeDetectorRef, private zone: NgZone,private notificationService: NotificationForHostService) {}

  reservations: Reservation[] = [];
  dataSource!: MatTableDataSource<Reservation>;
  displayedColumns: string[] = ['select','accommodation','cancellationPolicy', 'startDate', 'endDate', 'numberOfGuests', 'status', 'price'];

  @ViewChild(MatPaginator) paginator!: MatPaginator; 
  @ViewChild(MatSort) sort!: MatSort;
  
  isCancelBtnDisabled: boolean = true;
  isDeleteBtnDisabled: boolean = true;

  selection = new SelectionModel<Reservation>(true, []);

  masterToggle() {
    this.zone.run(() => {
      this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
      
      this.updateCancelBtnDisabled();
      this.updateDeleteBtnDisabled();
      this.cdr.detectChanges(); 
    });
   
  }
  
  selectionToggle(row: Reservation) {
    this.zone.run(() => {
      this.selection.toggle(row);
      this.updateDeleteBtnDisabled();
      this.updateCancelBtnDisabled();
      this.cdr.detectChanges(); 
    });
  }
  
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }


  updateCancelBtnDisabled() {
    this.isCancelBtnDisabled = !(this.selection.selected.length === 1 && this.selection.selected[0].status === ReservationStatus.ACCEPTED && this.selection.selected[0].accommodation?.cancellationPolicy !== CancellationPolicy.NON_REFUNDABLE);
  }

  updateDeleteBtnDisabled() {
    this.isDeleteBtnDisabled = this.selection.isEmpty() || !this.selection.selected.every(row => row.status === ReservationStatus.PENDING);
  }

  cantCancelReservation:boolean = false;

  onCancel():void {
    this.cantCancelReservation = false;

    this.reservationService.cancelAcceptedReservation(this.selection.selected[0].id!).subscribe({
      next: () => {
        console.log("Successful ")
        this.refreshTable();
        // const notification: CreateNotification = {
        //   type: NotificationType.CANCELLED_RESERVATION,
        //   description: this.authService.getEmail() + " cancelled a reservation for accommodation " + this.accommodationDetails?.title,
        //   hostId: this.accommodationDetails?.hostId,
        // }
        // this.notificationService.createNotification(notification).subscribe({
        //   next:(_) => {
        //     console.log("Uspesno kreirana notifikacija");
        //   }
      },
      error: (error) =>{
        if(error.status === 405){
              this.cantCancelReservation = true;
        }
      }
  })
    
  }
  onDelete():void {
    this.selection.selected.forEach(reservation => {
      this.reservationService.deletePendingReservation(reservation).subscribe({
        next: (data: boolean) => {
          if(data){
            console.log("Successful");
          }else{
            console.log("Already deleted")
          }
          this.refreshTable();
        }
      })
    })
    
  }

  refreshTable():void {
    this.getGuestReservations({id : this.authService.getId()});
    this.searchForm.reset();
  }

  

  searchForm: FormGroup = this.fb.group({
    search: [''],
    startDate: [''],
    endDate: [''],
    status: ['']
  });
  
  ngOnInit(): void {
    this.getGuestReservations({id : this.authService.getId()});
  }

  getGuestReservations(filter: ReservationFilter):void {
    this.reservationService.getGuestReservations(filter).subscribe({
      next: (data: Reservation[]) => {
        this.reservations = data;
        this.dataSource = new MatTableDataSource<Reservation>(this.reservations);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: () => {console.log("Error!")}
    })
  }

  getStatusStyles(status: ReservationStatus): any {
    let backgroundColor: string = '';

    if (status === ReservationStatus.ACCEPTED) {
      backgroundColor = '#D4F8D3';
    } else if (status === ReservationStatus.CANCELLED) {
      backgroundColor = '#FF4158';         
    } else if(status === ReservationStatus.PENDING) {
      backgroundColor = '#F8F4D3';
    }else if(status === ReservationStatus.EXPIRED) {
      backgroundColor = '#D0CFC6';
    }else if(ReservationStatus.DECLINED) {
      backgroundColor = '#CA0A0A';
    }
  
    return {
      'background-color': backgroundColor,
      'color': '#575C61',
      'padding': '2px 8px 2px 8px',
      'border-radius': '8px',
      'opacity': '80%',
      'width': 'max-content'
    };
  }

 
  dateWrong:boolean = false;

  search(): void{
    this.dateWrong = false;

    const filter: ReservationFilter = {
      id: this.authService.getId()
    };

    const startDateValue = this.searchForm.get('startDate')?.value;
    const endDateValue = this.searchForm.get('endDate')?.value;
    const search = this.searchForm.get('search')?.value;
    const status = this.searchForm.get('status')?.value;

    if (startDateValue !== null && startDateValue !== '') {
      if(endDateValue !== null && endDateValue !== ''){
        if (!(startDateValue > endDateValue)){
          filter.startDate = startDateValue;
          filter.endDate = endDateValue;
        }else{
          this.dateWrong = true;
          return;
        }
      }
    }
    if(status !== '' && status !== 'ALL'){
      filter.status = status;
    }
    if(search !== ''){
      filter.title = search;
    }

    this.getGuestReservations(filter);
  }
}
