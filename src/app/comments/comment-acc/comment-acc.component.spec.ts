import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentAccComponent } from './comment-acc.component';

describe('CommentAccComponent', () => {
  let component: CommentAccComponent;
  let fixture: ComponentFixture<CommentAccComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommentAccComponent]
    });
    fixture = TestBed.createComponent(CommentAccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
