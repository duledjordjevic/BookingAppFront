import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Registration } from 'src/app/infrastructure/auth/model/registration.model';
import { AuthService } from 'src/app/infrastructure/auth/services/auth.service';
import { KeycloakService } from 'src/app/keycloak/keycloak.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit{

  role: string | undefined = '';
  constructor(
     private keycloakService: KeycloakService,
    private authService: AuthService) {
  }

  ngOnInit() {
    if (!this.keycloakService.keycloak.isTokenExpired()) {
      this.role = this.keycloakService.getRole();
      const email = this.keycloakService.getEmail()!;
      this.authService.isUserRegistred(email).subscribe({
        next: (user) => {
          // console.log(user)
        },
        error: () => {
          const registration: Registration = {
            id: this.keycloakService.getUserId(),
            name: this.keycloakService.getUserProfile()?.firstName!,
            lastname: this.keycloakService.getUserProfile()?.lastName!,
            address: {
              street: '',
              city: '',
              postalCode: 0,
              state: ''
            },
            userType: this.role!,
            email: this.keycloakService.getEmail()!,
            password: '',
            phoneNumber: ''
          }
          this.authService.register(registration).subscribe({
            next: (user) => {
              // console.log(user)
            },
            error: () => {
              // console.log("error")
            }
          })
        }
      })
    }
  }

  async logOut() {
    this.keycloakService.logout();
  }

  async openProfile(){
    this.keycloakService.openAccountManagement();
  }


}
