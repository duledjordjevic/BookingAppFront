import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';
import { UserProfile } from './user-profile';
import { environment } from 'src/env/env';

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {

  private _keycloak: Keycloak | undefined;
  private _profile: UserProfile | undefined;
  private ROLES: Array<string> = ["GUEST", "HOST", "ADMIN"];

  get keycloak() {
    if (!this._keycloak){
      this._keycloak = new Keycloak({
        url: 'https://localhost:8443',
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
      this._profile = (await this.keycloak?.loadUserProfile()) as UserProfile;
      this._profile.token = this.keycloak?.token;
      this._profile.tokenParsed = this.keycloak.tokenParsed;
      const roles = this._keycloak?.tokenParsed?.realm_access?.roles!;
      roles.forEach(role => {
        if(this.ROLES.includes(role)){
          this._profile!.role = role;
        }
      })
    }

  }

  login() {
    return this.keycloak?.login();
  }

  logout() {
    return this.keycloak.logout();
  }

  openAccountManagement() {
    return this.keycloak.accountManagement();
  }

  getEmail() {
    return this._profile?.email;
  }

  getRole(){
    return this._profile?.role;
  }

  getUserProfile(){
    return this._profile;
  }

  getUserId(){
    const uuidParts = this.keycloak.tokenParsed?.sub!.split('-')!;
    
    // Extract the first segment of the UUID
    const firstSegment = uuidParts[0];

    // Convert the first segment from hexadecimal to a decimal integer
    const intValue = parseInt(firstSegment, 16);

    return intValue;
  }
}
