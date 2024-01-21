import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateProfileComponent } from './update-profile.component';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('UpdateProfileComponent', () => {
  let component: UpdateProfileComponent;
  let fixture: ComponentFixture<UpdateProfileComponent>;
  let el: HTMLElement;

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

  it('should call onSubmit, but not updateUser', () => {
    spyOn(component, 'updateUser');
    el = fixture.debugElement.query(By.css('#button-register')).nativeElement;
    el.click();
    expect(component.updateUser).toHaveBeenCalledTimes(0);
  });

  it('form should be invalid', () => {
    component.updateProfileForm.get('name')?.setValue('');
    component.updateProfileForm.get('lastname')?.setValue('');
    component.updateProfileForm.get('state')?.setValue('');
    component.updateProfileForm.get('city')?.setValue('');
    component.updateProfileForm.get('postalCode')?.setValue('');
    component.updateProfileForm.get('street')?.setValue('');
    component.updateProfileForm.get('phoneNumber')?.setValue('');
    component.updateProfileForm.get('newPassword')?.setValue('');
    component.updateProfileForm.get('newPasswordConfirmed')?.setValue('');
    component.updateProfileForm.get('oldPassword')?.setValue('');

    expect(component.updateProfileForm.valid).toBeFalsy();
  });

  it('form should be valid', () => {
    component.updateProfileForm.get('name')?.setValue('Dusan');
    component.updateProfileForm.get('lastname')?.setValue('Djordjevic');
    component.updateProfileForm.get('state')?.setValue('Srbija');
    component.updateProfileForm.get('city')?.setValue('Vranje');
    component.updateProfileForm.get('postalCode')?.setValue('17500');
    component.updateProfileForm.get('street')?.setValue('Kosovska BB');
    component.updateProfileForm.get('phoneNumber')?.setValue('0664501312');
    component.updateProfileForm.get('newPassword')?.setValue('');
    component.updateProfileForm.get('newPasswordConfirmed')?.setValue('');
    component.updateProfileForm.get('oldPassword')?.setValue('123');

    expect(component.updateProfileForm.valid).toBeTruthy();
  });

  it('form invalid, password not match', () => {
    component.updateProfileForm.get('name')?.setValue('Dusan');
    component.updateProfileForm.get('lastname')?.setValue('Djordjevic');
    component.updateProfileForm.get('state')?.setValue('Srbija');
    component.updateProfileForm.get('city')?.setValue('Vranje');
    component.updateProfileForm.get('postalCode')?.setValue('17500');
    component.updateProfileForm.get('street')?.setValue('Kosovska BB');
    component.updateProfileForm.get('phoneNumber')?.setValue('0664501312');
    component.updateProfileForm.get('newPassword')?.setValue('1');
    component.updateProfileForm.get('newPasswordConfirmed')?.setValue('123');
    component.updateProfileForm.get('oldPassword')?.setValue('123');

    spyOn(component, 'updateUser');
    el = fixture.debugElement.query(By.css('#button-register')).nativeElement;
    el.click();
    expect(component.updateUser).toHaveBeenCalledTimes(0);
  });

});
