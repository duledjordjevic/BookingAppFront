import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationPictureUploadComponent } from './accommodation-picture-upload.component';

describe('AccommodationPictureUploadComponent', () => {
  let component: AccommodationPictureUploadComponent;
  let fixture: ComponentFixture<AccommodationPictureUploadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccommodationPictureUploadComponent]
    });
    fixture = TestBed.createComponent(AccommodationPictureUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
