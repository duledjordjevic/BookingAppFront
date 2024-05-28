import { Injectable, OnInit, inject } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import { AuthResponse } from '../model/auth-response.model';
import {JwtHelperService} from "@auth0/angular-jwt";
import {environment} from '../../../../env/env'
import { Registration } from '../model/registration.model';
import { User } from '../model/user.model';
import { KeycloakService } from 'src/app/keycloak/keycloak.service';


@Injectable({
    providedIn: 'root'
})

export class AuthService implements OnInit{

    private headers = new HttpHeaders({
      'Content-Type': 'application/json',
      skip: 'true',
    });
  
    user$ = new BehaviorSubject("");
    userState = this.user$.asObservable();
  
    constructor(private keycloakService: KeycloakService) {
    }

    ngOnInit(): void {
      if(!this.keycloakService.keycloak.isTokenExpired()){
        this.user$.next(this.keycloakService.getRole()!);
      }
      
    }
  
    http = inject(HttpClient);
    login(auth: any): Observable<AuthResponse> {
      return this.http.post<AuthResponse>(environment.apiHost + 'auth/login', auth, {
        headers: this.headers,
      });
    }
  
    logout(): Observable<string> {
      return this.http.get(environment.apiHost + 'auth/logout', {
        responseType: 'text',
      });
    }

    getRole(): any {
      if (this.isLoggedIn()) {
        return this.keycloakService.getRole();
      }
      return null;
    }
    getId(): number{
      if (this.isLoggedIn()) {
        return this.keycloakService.getUserId();
      }
      return 0;
    }

    getHostId(userId: number): Observable<number> {
      return this.http.get<number>(environment.apiHost + 'users/host/' + userId);
    }

    getEmail(): string{
      if (this.isLoggedIn()) {
        return this.keycloakService.getEmail()!;
      }
      return "";
    }

    isLoggedIn(): boolean {
      return !this.keycloakService.keycloak.isTokenExpired();
    }

    setUser(): void {
      this.user$.next(this.getRole());
    }

    register(user: Registration): Observable<User> {
      return this.http.post<User>(environment.apiHost + 'register', user, {
        headers: this.headers,
      });
    }

    isUserRegistred(email: string): Observable<User> {
      const url = environment.apiHost + "register/" + email ;
      return this.http.get<User>(url);
    }

  }