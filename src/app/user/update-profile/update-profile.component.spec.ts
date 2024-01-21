import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateProfileComponent } from './update-profile.component';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('UpdateProfileComponent', () => {
  let component: UpdateProfileComponent;
  let fixture: ComponentFixture<UpdateProfileComponent>;
  let httpController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateProfileComponent],
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule
      ]
    });
    fixture = TestBed.createComponent(UpdateProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('', () => {
    
  })
});
