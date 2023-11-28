import { Component } from '@angular/core';
import { SharedService } from '../../services/shared.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private navbarService: SharedService) {}

  ngOnInit(): void {
    this.navbarService.toggleNavbarVisibility(true);
  }
}
