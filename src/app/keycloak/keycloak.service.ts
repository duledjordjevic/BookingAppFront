import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';
import { UserProfile } from './user-profile';

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {

  private _keycloak: Keycloak | undefined;
  private _profile: UserProfile | undefined;


  get keycloak() {
    if (!this._keycloak){
      this._keycloak = new Keycloak({
        url: 'http://localhost:9090',
        realm: 'booking',
        clientId: 'booking'
      });
    }
    return this._keycloak;
  }

  get profile(): UserProfile | undefined {
    return this._profile;
  }

  constructor() { }


  async init(){
    console.log("Authentucation start...")
    const authenticated = await this.keycloak?.init({
      onLoad: 'login-required'
    });

    if (authenticated){
      console.log("User is authenticated")
      this._profile = (await this.keycloak?.loadUserProfile) as UserProfile;
      this._profile.token = this.keycloak?.token;
      // this._profile.token = this.keycloak?.tokenParsed;
    }

  }

  login() {
    return this.keycloak?.login();
  }

  logout() {
    return this.keycloak.logout({redirectUri : 'https://localhost:4200/home'});
  }
}
