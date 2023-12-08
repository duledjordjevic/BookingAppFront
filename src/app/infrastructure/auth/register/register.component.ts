import { Component, inject } from '@angular/core';
import { SharedService } from '../../../services/shared.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Registration, Address } from '../model/registration.model';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule]
})
export class RegisterComponent {
  constructor(private navbarService: SharedService, 
    private authService: AuthService,
    private router: Router) {}

  fb = inject(FormBuilder)
  http = inject(HttpClient)

  form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    lastName: ['', Validators.required],
    city: ['', Validators.required],
    postalCode: [0, Validators.required],
    street: ['', Validators.required],
    state: ['', Validators.required],
    accountType: ['', Validators.required],
    phoneNumber: [0, Validators.required],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
    email: ['', Validators.email],
  });

  

  onSubmit(): void {
    if(this.form.valid){
      if (this.form.value.password === this.form.value.confirmPassword){
        const address: Address = {
          street: this.form.value.street || "",
          city: this.form.value.city || "",
          postalCode: this.form.value.postalCode || 0,
          state: this.form.value.state || ""
        }
        const user: Registration = {
          name: this.form.value.name || "",
          lastname: this.form.value.lastName || "",
          address: address,
          userType: this.form.value.accountType || "",
          email: this.form.value.email || "",
          password: this.form.value.password || "",
          phoneNumber: this.form.value.phoneNumber || 0
        }
        console.log(user);
        this.authService.register(user).subscribe(
          data => this.router.navigate(['login'], {queryParams: { registered: 'true' } }),
          error => console.log('oops', error)
        )
      }
    }

  }


  ngOnInit(): void {
    this.navbarService.toggleNavbarVisibility(false);
  }
}
