import { Component } from '@angular/core';
import { SharedService } from '../../services/shared.service';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {
  constructor(private navbarService: SharedService) {}

  ngOnInit(): void {
    this.navbarService.toggleNavbarVisibility(false);
  }
}
