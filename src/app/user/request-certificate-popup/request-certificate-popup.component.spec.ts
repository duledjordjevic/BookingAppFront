import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestCertificatePopupComponent } from './request-certificate-popup.component';

describe('RequestCertificatePopupComponent', () => {
  let component: RequestCertificatePopupComponent;
  let fixture: ComponentFixture<RequestCertificatePopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequestCertificatePopupComponent]
    });
    fixture = TestBed.createComponent(RequestCertificatePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
