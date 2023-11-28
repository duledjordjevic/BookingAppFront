import { Component } from '@angular/core';
import { SharedService } from './services/shared.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-booking-application';
  showNavBar = true;
  private subscription: Subscription;

  constructor(private navbarService: SharedService) {
    this.subscription = this.navbarService.getNavbarVisibility().subscribe((shouldShow) => {
      this.showNavBar = shouldShow;
    });
  }
}
