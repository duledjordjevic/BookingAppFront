import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportCommentsComponent } from './report-comments.component';

describe('ReportCommentsComponent', () => {
  let component: ReportCommentsComponent;
  let fixture: ComponentFixture<ReportCommentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportCommentsComponent]
    });
    fixture = TestBed.createComponent(ReportCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
