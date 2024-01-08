import { Component } from '@angular/core';
import { ChartType } from 'chart.js';
import html2canvas from 'html2canvas';
import * as jspdf from 'jspdf';
import { AnalyticsService } from '../services/analytics.service';
import { AuthService } from 'src/app/infrastructure/auth/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-all-accommodations-analytics',
  templateUrl: './all-accommodations-analytics.component.html',
  styleUrls: ['./all-accommodations-analytics.component.css']
})
export class AllAccommodationsAnalyticsComponent {

  dateWrong: boolean = false;

  chartType: ChartType;
  filterForm: FormGroup = this.fb.group({
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
  });

  constructor(private analyticsService: AnalyticsService, private authService: AuthService,
    private fb: FormBuilder){
    this.chartType = "pie";
  }

  chartEarningsData: Array<any> = [];
  chartReservationsData: Array<any> = [];
  chartLabels: Array<string> = [];
  chartOptions: any = {
    responsive: true
  };
  chartLegend = true;
  
 
  ngOnInit(): void {
    this.getAnalytics(new Date("2023-10-10"), new Date("2024-10-10"));
  }

  getAnalytics(startDate: Date, endDate: Date): void{
    this.analyticsService.getAnalyticsForAll(startDate, endDate, this.authService.getId()).subscribe({
      next: (analytics) => {
        console.log(analytics)
        const earnings: Array<number> = [];
        const reservations: Array<number> = [];
        const labels: Array<string> = [];

        analytics.forEach((analytic) => {
          earnings.push(analytic.totalEarnings!);
          reservations.push(analytic.totalReservations!);
          labels.push(analytic.name!);
        })

        this.chartLabels = labels;
        this.chartEarningsData = [
          {data: earnings,  fill: 'origin'}
        ]
        this.chartReservationsData = [
          {data: reservations,  fill: 'origin'}
        ]
      }
    })
  }

  filter(): void {
    this.dateWrong = false;

    if(this.filterForm.valid){
      const startDate = this.filterForm.get('startDate')?.value;
      const endDate = this.filterForm.get('endDate')?.value;

      if (!(startDate > endDate)){
          this.getAnalytics(startDate, endDate);
      }else{
        this.dateWrong = true;
      }
    }else{
      this.dateWrong = true;
    }

  }
  

  exportToPDF(): void {
    const container = document.querySelector('.main') as HTMLElement;

    if (container instanceof HTMLElement) {
      html2canvas(container).then((canvas) => {
        const pdf = new jspdf.jsPDF();
        pdf.text('Earnings Chart', 10, 10);
        pdf.addImage(this.getBase64Image('earningsAllAcommodation'), 'PNG', 10, 20, 180, 180);
    
        pdf.addPage();

        pdf.text('Reservations Chart', 10, 10);
        pdf.addImage(this.getBase64Image('reservationsAllAcommodation'), 'PNG', 10, 20, 180, 180);
    
        pdf.save('all-accommodations-analytics.pdf');

      });
    }
  }
  private getBase64Image(canvasId: string): string {
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    const imageData = canvas.toDataURL('image/png');
    return imageData.replace(/^data:image\/(png|jpg);base64,/, '');
  }
}
