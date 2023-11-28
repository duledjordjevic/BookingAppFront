import { Component } from '@angular/core';
import { SharedService } from '../../services/shared.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private navbarService: SharedService) {}

  ngOnInit(): void {
    this.navbarService.toggleNavbarVisibility(false);
  }
}
