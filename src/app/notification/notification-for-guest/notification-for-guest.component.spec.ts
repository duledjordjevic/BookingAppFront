import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationForGuestComponent } from './notification-for-guest.component';

describe('NotificationForGuestComponent', () => {
  let component: NotificationForGuestComponent;
  let fixture: ComponentFixture<NotificationForGuestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotificationForGuestComponent]
    });
    fixture = TestBed.createComponent(NotificationForGuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
