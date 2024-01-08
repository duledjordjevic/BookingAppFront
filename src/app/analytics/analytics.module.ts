import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule, NgChartsConfiguration } from 'ng2-charts';
import { AnnualAnalyticsComponent } from './annual-analytics/annual-analytics.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../infrastructure/material/material.module';
import { AllAccommodationsAnalyticsComponent } from './all-accommodations-analytics/all-accommodations-analytics.component';



@NgModule({
  declarations: [
    AnnualAnalyticsComponent,
    AnalyticsComponent,
    AllAccommodationsAnalyticsComponent
  ],
  imports: [
    CommonModule,
    NgChartsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: [
    { provide: NgChartsConfiguration, useValue: { generateColors: true }}
  ],
  exports: [
    AnalyticsComponent,
    AnnualAnalyticsComponent,
    AllAccommodationsAnalyticsComponent
  ]
})
export class AnalyticsModule { }
