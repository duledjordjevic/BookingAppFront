import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAdminComponent } from './update-admin.component';
import { BrowserModule, By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UpdateAdminComponent', () => {
  let component: UpdateAdminComponent;
  let fixture: ComponentFixture<UpdateAdminComponent>;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateAdminComponent],
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule
      ]
    });
    fixture = TestBed.createComponent(UpdateAdminComponent);
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
    component.updateAdminForm.get('newPassword')?.setValue('');
    component.updateAdminForm.get('newPasswordConfirmed')?.setValue('');
    component.updateAdminForm.get('oldPassword')?.setValue('');
    expect(component.updateAdminForm.valid).toBeFalsy();
  });

  it('form should be valid', () => {
    component.updateAdminForm.get('newPassword')?.setValue('123');
    component.updateAdminForm.get('newPasswordConfirmed')?.setValue('123');
    component.updateAdminForm.get('oldPassword')?.setValue('123');
    expect(component.updateAdminForm.valid).toBeTruthy();
  });

  it('form invalid, password not match', () => {
    component.updateAdminForm.get('newPassword')?.setValue('12345');
    component.updateAdminForm.get('newPasswordConfirmed')?.setValue('123');
    component.updateAdminForm.get('oldPassword')?.setValue('123');
    
    spyOn(component, 'updateUser');
    el = fixture.debugElement.query(By.css('#button-register')).nativeElement;
    el.click();
    expect(component.updateUser).toHaveBeenCalledTimes(0);
  });

});
