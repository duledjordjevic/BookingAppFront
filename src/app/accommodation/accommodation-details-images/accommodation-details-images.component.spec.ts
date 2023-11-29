import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationDetailsImagesComponent } from './accommodation-details-images.component';

describe('AccommodationDetailsImagesComponent', () => {
  let component: AccommodationDetailsImagesComponent;
  let fixture: ComponentFixture<AccommodationDetailsImagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccommodationDetailsImagesComponent]
    });
    fixture = TestBed.createComponent(AccommodationDetailsImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
