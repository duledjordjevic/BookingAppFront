import { Component } from '@angular/core';
import { SharedService } from '../../services/shared.service';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {
  password: string = '';
  showPassword: boolean = false;
  toggleIconClass: string = 'fa-eye';

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    this.toggleIconClass = this.showPassword ? 'fa-eye' : 'fa-eye-slash';
  }

  getPasswordFieldType() {
    return this.showPassword ? 'text' : 'password';
  }
  constructor(private navbarService: SharedService) {}
  hide =false;
  ngOnInit(): void {
    this.navbarService.toggleNavbarVisibility(false);
  }
}
