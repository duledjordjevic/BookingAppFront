import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
    private shouldShowNavbar = new BehaviorSubject<boolean>(true);

  toggleNavbarVisibility(shouldShow: boolean): void {
    this.shouldShowNavbar.next(shouldShow);
  }

  getNavbarVisibility(): BehaviorSubject<boolean> {
    return this.shouldShowNavbar;
  }
}