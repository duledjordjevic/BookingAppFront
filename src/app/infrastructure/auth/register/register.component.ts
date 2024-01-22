import { Component, inject } from '@angular/core';
import { SharedService } from '../../../services/shared.service';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Registration, Address } from '../model/registration.model';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
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
    phoneNumber: ["", Validators.required],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
    email: ['', Validators.email],
  });

  trimValues() {
    const name = this.form.value.name;
    const lastName = this.form.value.lastName;
    const city = this.form.value.city;
    const street = this.form.value.street;
    const state = this.form.value.state;
    const phoneNumber = this.form.value.phoneNumber;
    const email = this.form.value.email;
    const password = this.form.value.password;
    const confirmPassword = this.form.value.confirmPassword;

    this.form.patchValue({
      name: name?.trim(),
      lastName: lastName?.trim(),
      city: city?.trim(),
      street: street?.trim(),
      state: state?.trim(),
      phoneNumber: phoneNumber?.trim(),
      email: email?.trim(),
      password: password?.trim(),
      confirmPassword: confirmPassword?.trim()
    });
  }

  fieldsRequired: boolean = false;
  userExist: boolean = false;
  passwordNotMatch: boolean = false;
  emailWrong: boolean = false;

  onSubmit(): void {
    this.trimValues()
    this.fieldsRequired = false;
    this.userExist = false;
    this.passwordNotMatch = false;
    this.emailWrong = false;

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
          phoneNumber: this.form.value.phoneNumber || ""
        }
        this.register(user);
      }else{
        this.passwordNotMatch = true;
      }
    }else if(this.form.value.name === "" || this.form.value.lastName === "" || this.form.value.city === "" || this.form.value.street === ""
          || this.form.value.state === "" || this.form.value.accountType === "" || this.form.value.phoneNumber === "" || this.form.value.accountType === ""
          || this.form.value.email === "" || this.form.value.password === "" || this.form.value.confirmPassword === ""){
            this.fieldsRequired = true;
    }else{
      this.emailWrong = true;
    }

  }

  register(user: Registration){
	  this.authService.register(user).subscribe(
		  data => this.router.navigate(['login'], {queryParams: { registered: 'true' } }),
		  error => this.userExist = true
	  )
  }

  ngOnInit(): void {
    this.navbarService.toggleNavbarVisibility(false);
  }
}
