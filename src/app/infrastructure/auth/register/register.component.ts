import { Component, inject } from '@angular/core';
import { SharedService } from '../../../services/shared.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserInterface } from '../model/user.interface';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule]
})
export class RegisterComponent {
  constructor(private navbarService: SharedService) {}

  fb = inject(FormBuilder)
  http = inject(HttpClient)

  form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    lastName: ['', Validators.required],
    address: ['', Validators.required],
    accountType: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
    email: ['', Validators.email],
  });

  onSubmit(): void {
    // if(this.form.valid){
      this.http.post<{user: UserInterface}>('http://localhost:8080/api/register',{
        user: this.form.getRawValue(),
      }).subscribe(response => {
          console.log('response', response);
      })
    // }
    
  }


  ngOnInit(): void {
    this.navbarService.toggleNavbarVisibility(false);
  }
}
