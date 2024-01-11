import { Component, EventEmitter, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReportUserService } from '../services/report-user.service';
import { UserReport } from '../model/user-report';
import { Reservation } from '../model/reservation.model';

@Component({
  selector: 'app-report-popup',
  templateUrl: './report-popup.component.html',
  styleUrls: ['./report-popup.component.css']
})
export class ReportPopupComponent {
  firstname: string = "";
  lastName: string = "";
  userId : number = 0;
  reservationId: number = 0;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<ReportPopupComponent>,
        private reportService: ReportUserService) {
    this.firstname = data.name;
    this.lastName = data.lastName;
    this.userId = data.userId;
    this.reservationId = data.reservationId;

  }
  reportReason: string = "";

  closeDialog(): void {
    this.dialogRef.close();
  }
  reportUser(): void{
    const userReport: UserReport = {
      reason:this.reportReason,
      userId:this.userId,
      reservationId: this.reservationId
    }
    this.reportService.addReport(userReport).subscribe({
      next:(_) => {
      }
    })
    this.dialogRef.close();
  }
}
