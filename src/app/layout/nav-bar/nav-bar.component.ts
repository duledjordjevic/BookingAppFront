import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/infrastructure/auth/services/auth.service';
import { KeycloakService } from 'src/app/keycloak/keycloak.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit{

  role: string = '';
  constructor(private authService: AuthService,
     private router: Router, 
     private keycloakService: KeycloakService) {
  }

  ngOnInit(): void {
    if (!this.keycloakService.keycloak.isTokenExpired()){
      this.role = "ADMIN";
    }
    // this.authService.userState.subscribe((result) => {
    //   this.role = result;
    // })
  }

  async logOut() {
    this.keycloakService.logout();
    // this.authService.logout().subscribe({
    //   next: (_) => {
    //     localStorage.removeItem('user');
    //     this.authService.setUser();
    //     this.router.navigate(['login']);
    //   },
    //   error: (error) => {
    //     localStorage.removeItem('user');
    //     this.authService.setUser();
    //     this.router.navigate(['login']);
    //   }
    // })
  }
}
