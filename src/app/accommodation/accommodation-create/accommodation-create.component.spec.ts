import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationCreateComponent } from './accommodation-create.component';

describe('AccommodationCreateComponent', () => {
  let component: AccommodationCreateComponent;
  let fixture: ComponentFixture<AccommodationCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccommodationCreateComponent]
    });
    fixture = TestBed.createComponent(AccommodationCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
