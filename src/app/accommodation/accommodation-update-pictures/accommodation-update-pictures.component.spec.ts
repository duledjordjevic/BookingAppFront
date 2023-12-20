import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationUpdatePicturesComponent } from './accommodation-update-pictures.component';

describe('AccommodationUpdatePicturesComponent', () => {
  let component: AccommodationUpdatePicturesComponent;
  let fixture: ComponentFixture<AccommodationUpdatePicturesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccommodationUpdatePicturesComponent]
    });
    fixture = TestBed.createComponent(AccommodationUpdatePicturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
