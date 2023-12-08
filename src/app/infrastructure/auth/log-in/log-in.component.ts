import { Component, inject } from '@angular/core';
import { SharedService } from '../../../services/shared.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Login } from '../model/login.model';
import {AuthService} from "../services/auth.service";
import { AuthResponse } from '../model/auth-response.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class LogInComponent {
  constructor(private authService: AuthService,
    private navbarService: SharedService,
    private router: Router,
    private route: ActivatedRoute) {}

  fb = inject(FormBuilder)
  http = inject(HttpClient)

  form = this.fb.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });


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
  
  hide =false;
  infoMessage = '';
  ngOnInit(): void {
    this.navbarService.toggleNavbarVisibility(false);
    this.route.queryParams
    .subscribe(params => {
      if(params['registered'] !== undefined && params['registered'] === 'true') {
          this.infoMessage = 'Registration Successful! Confirm account on your mail!';
      }
    });
  }

  onSubmit(): void {

    if(this.form.valid) {
      const login: Login = {
        email: this.form.value.email || "",
        password: this.form.value.password || ""
      }
      this.authService.login(login).subscribe({
        next: (response: AuthResponse) => {
          localStorage.setItem('user', response.jwt);
          this.authService.setUser()
          this.router.navigate(['home'])
        }
      })
    }
  }
}
