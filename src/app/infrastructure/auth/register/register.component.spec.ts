import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import {BrowserModule, By} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterModule} from "@angular/router";

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let el: HTMLElement;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterComponent],
		imports: [
			BrowserModule,
			FormsModule,
			ReactiveFormsModule,
			HttpClientTestingModule,
			RouterModule.forRoot([]),
		]
    });
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

	it('should call onSubmit, but not register', () => {
		spyOn(component, 'register');
		el = fixture.debugElement.query(By.css('#button-register')).nativeElement;
		el.click();
		expect(component.register).toHaveBeenCalledTimes(0);
	});

	it('form should be invalid', () => {
		component.form.get('name')?.setValue('');
		component.form.get('lastName')?.setValue('');
		component.form.get('accountType')?.setValue('');
		component.form.get('state')?.setValue('');
		component.form.get('city')?.setValue('');
		component.form.get('postalCode')?.setValue(0);
		component.form.get('street')?.setValue('');
		component.form.get('phoneNumber')?.setValue('');
		component.form.get('password')?.setValue('');
		component.form.get('confirmPassword')?.setValue('');
		component.form.get('email')?.setValue('');

		expect(component.form.valid).toBeFalsy();
	});

	it('form should be valid', () => {
		component.form.get('name')?.setValue('Stefan');
		component.form.get('lastName')?.setValue('Pejinovic');
		component.form.get('accountType')?.setValue('HOST');
		component.form.get('state')?.setValue('Srbija');
		component.form.get('city')?.setValue('Novi Sad');
		component.form.get('postalCode')?.setValue(25000);
		component.form.get('street')?.setValue('Okrugiceva 10');
		component.form.get('phoneNumber')?.setValue('083294237');
		component.form.get('password')?.setValue('123');
		component.form.get('confirmPassword')?.setValue('123');
		component.form.get('email')?.setValue('cao@gmail.com');
		expect(component.form.valid).toBeTruthy();
	});

	it('form invalid, password not match', () => {
		component.form.get('name')?.setValue('Stefan');
		component.form.get('lastName')?.setValue('Pejinovic');
		component.form.get('accountType')?.setValue('HOST');
		component.form.get('state')?.setValue('Srbija');
		component.form.get('city')?.setValue('Novi Sad');
		component.form.get('postalCode')?.setValue(25000);
		component.form.get('street')?.setValue('Okrugiceva 10');
		component.form.get('phoneNumber')?.setValue('083294237');
		component.form.get('password')?.setValue('123');
		component.form.get('confirmPassword')?.setValue('12345');
		component.form.get('email')?.setValue('cao@gmail.com');

		spyOn(component, 'register');
		el = fixture.debugElement.query(By.css('#button-register')).nativeElement;
		el.click();
		expect(component.register).toHaveBeenCalledTimes(0);
	});
});
