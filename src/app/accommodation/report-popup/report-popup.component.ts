import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-report-popup',
  templateUrl: './report-popup.component.html',
  styleUrls: ['./report-popup.component.css']
})
export class ReportPopupComponent {
  firstname: string = "";
  lastName: string = "";
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<ReportPopupComponent>) {
    this.firstname = data.name;
    this.lastName = data.lastName;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
