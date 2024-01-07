import { Component, Input} from '@angular/core';
import {  ChartEvent, ChartType } from 'chart.js';
import html2canvas from 'html2canvas';
import * as jspdf from 'jspdf';
import { AnalyticsService } from '../services/analytics.service';
import { AuthService } from 'src/app/infrastructure/auth/services/auth.service';

@Component({
  selector: 'app-annual-analytics',
  templateUrl: './annual-analytics.component.html',
  styleUrls: ['./annual-analytics.component.css']
})
export class AnnualAnalyticsComponent {
  @Input() accommodationId: number = 0;

  years: number[];
  selectedYear: number;

  chartType: ChartType;
  chartTypes: ChartType[] = ["bar", "line", "pie"];

  getYears(): number[] {
    const currentYear = new Date().getFullYear();
    const years: number[] = [];

    for (let year = currentYear; year >= 1900; year--) {
      years.push(year);
    }

    return years;
  }

  constructor(private analyticsService: AnalyticsService, private authService: AuthService){
    this.chartType = "line";
    this.years = this.getYears();
    this.selectedYear = new Date().getFullYear();
  }

  chartEarningsData: Array<any> = [];
  chartReservationsData: Array<any> = [];
  chartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July',  'August', 'September', 'October', 'November', 'December'];
  chartOptions: any = {
    responsive: true
  };
  chartLegend = true;
  
 
  ngOnInit(): void {
    this.getAnnualAnalytics(this.selectedYear);
  }

  getAnnualAnalytics(year: number): void{
    this.analyticsService.getAnnualAnalytics(year, this.accommodationId, this.authService.getId()).subscribe({
      next: (analytics) => {
        this.chartEarningsData = [
          {data: analytics.earningsPerMonth, label: "Earnings", fill: 'origin',}
        ]
        this.chartReservationsData = [
          {data: analytics.reservationsPerMonth, label: "Reservations", fill: 'origin',}
        ]
      }
    })
  }

  
  exportToPDF(): void {
    const container = document.querySelector('.main-container') as HTMLElement;

    if (container instanceof HTMLElement) {
      html2canvas(container).then((canvas) => {
        const pdf = new jspdf.jsPDF();
        pdf.text('Earnings Chart', 10, 10);
        pdf.addImage(this.getBase64Image('earnings'), 'PNG', 10, 20, 180, 100);
    
        pdf.addPage();

        pdf.text('Reservations Chart', 10, 10);
        pdf.addImage(this.getBase64Image('reservations'), 'PNG', 10, 20, 180, 100);
    
        pdf.save('annual_charts.pdf');

      });
    }
  }
  private getBase64Image(canvasId: string): string {
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    const imageData = canvas.toDataURL('image/png');
    return imageData.replace(/^data:image\/(png|jpg);base64,/, '');
  }

}
