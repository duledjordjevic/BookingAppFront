import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatIconModule} from '@angular/material/icon';
import { FormsModule } from '@angular/forms'
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatSelectModule} from "@angular/material/select";
import {MatRadioModule} from "@angular/material/radio";
import { MatDialogModule } from "@angular/material/dialog";

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
	  MatDatepickerModule,
	  MatNativeDateModule,
	  MatProgressBarModule,
	  MatSelectModule,
	  MatRadioModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
  ],
  exports: [
    MatToolbarModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatLabel,
	  MatDatepickerModule,
	  MatNativeDateModule,
    MatIconModule,
    FormsModule,
	  MatProgressBarModule,
	  MatSelectModule,
	  MatRadioModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
  ]
})
export class MaterialModule { }
