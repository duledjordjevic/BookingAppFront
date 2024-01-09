import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-report-popup',
  templateUrl: './report-popup.component.html',
  styleUrls: ['./report-popup.component.css']
})
export class ReportPopupComponent {
  constructor(private dialogRef: MatDialogRef<ReportPopupComponent>){}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
