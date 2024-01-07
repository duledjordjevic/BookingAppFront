import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule, NgChartsConfiguration } from 'ng2-charts';
import { AnnualAnalyticsComponent } from './annual-analytics/annual-analytics.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../infrastructure/material/material.module';



@NgModule({
  declarations: [
    AnnualAnalyticsComponent,
    AnalyticsComponent
  ],
  imports: [
    CommonModule,
    NgChartsModule,
    FormsModule,
    MaterialModule
  ],
  providers: [
    { provide: NgChartsConfiguration, useValue: { generateColors: true }}
  ],
  exports: [
    AnalyticsComponent,
    AnnualAnalyticsComponent
  ]
})
export class AnalyticsModule { }
