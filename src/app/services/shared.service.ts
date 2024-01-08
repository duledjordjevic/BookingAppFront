import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from '../infrastructure/auth/services/auth.service';
import { RouteReuseStrategy, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
    private shouldShowNavbar = new BehaviorSubject<boolean>(true);
    constructor(private authService: AuthService,private router: Router){}

    private sharedDataSubject = new BehaviorSubject<number>(0);
    numberOfNotifications$: Observable<number> = this.sharedDataSubject.asObservable();

    updateSharedData(newNumberOfNotificaitons: number) {
      this.sharedDataSubject.next(newNumberOfNotificaitons);
    }

    toggleNavbarVisibility(shouldShow: boolean): void {
      this.shouldShowNavbar.next(shouldShow);
    }

    getNavbarVisibility(): BehaviorSubject<boolean> {
      return this.shouldShowNavbar;
    }

    deleteUserFromLocalStorage(): void{
      localStorage.removeItem('user');
      this.authService.setUser();
  +    this.router.navigate(['login']);
    }

}