import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentHostComponent } from './comment-host.component';

describe('CommentHostComponent', () => {
  let component: CommentHostComponent;
  let fixture: ComponentFixture<CommentHostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommentHostComponent]
    });
    fixture = TestBed.createComponent(CommentHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
