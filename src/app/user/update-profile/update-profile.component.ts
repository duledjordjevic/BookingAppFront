import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { UserDelete, UserInfo, UserUpdate } from '../model/user.model';
import { FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors, AbstractControl} from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { Address } from 'src/app/models/shared.models';
import { UserBlock } from '../model/user-block';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css'],
})
export class UpdateProfileComponent implements OnInit {
    res: UserInfo | undefined;

    constructor(private service: UserService,
      private sharedService: SharedService) { }

    ngOnInit(): void {
      this.getUserInfo();
    }

    getUserInfo():void {
      this.service.getUser().subscribe({
        next:(result: UserInfo) =>{
          this.res = result;
          console.log(this.res);
          this.updateProfileForm = new FormGroup({
            name: new FormControl(this.res.name,[Validators.required]),
            lastname: new FormControl(this.res.lastname,[Validators.required]),
            state: new FormControl(this.res.address.state,[Validators.required]),
            city: new FormControl(this.res.address.city,[Validators.required]),
            postalCode: new FormControl(this.res.address.postalCode,[Validators.required]),
            street: new FormControl(this.res.address.street,[Validators.required]),
            phoneNumber: new FormControl(this.res.phoneNumber,[Validators.required]),
            newPassword: new FormControl(''),
            newPasswordConfirmed: new FormControl(''),
            oldPassword: new FormControl('',[Validators.required]),
          })
        },
        error:(err : any)=>{
          console.log(err);
        }
      })
    }
    updateProfileForm = new FormGroup({
        name: new FormControl("" || '',[Validators.required]),
        lastname: new FormControl('',[Validators.required]),
        state: new FormControl('',[Validators.required]),
        city: new FormControl('',[Validators.required]),
        postalCode: new FormControl('',[Validators.required]),
        street: new FormControl('',[Validators.required]),
        phoneNumber: new FormControl('',[Validators.required]),
        newPassword: new FormControl(''),
        newPasswordConfirmed: new FormControl(''),
        oldPassword: new FormControl('',[Validators.required]),
      },)

      passwordsMatchValidator: ValidatorFn = (formGroup: AbstractControl): ValidationErrors | null => {
        const newPassword = this.updateProfileForm.get('newPassword')?.value;
        const confirmPassword = this.updateProfileForm.get('newPasswordConfirmed')?.value;
      
        return newPassword === confirmPassword ? null : { passwordsNotMatch: true };
      };
    
    
    passwordRequired: boolean = false;
    allFieldsRequired: boolean = false;
    nameRequired: boolean = false;
    lastNameRequired: boolean = false;
    stateRequired: boolean = false;
    cityRequired: boolean = false;
    postalCodeRequired: boolean = false;
    streetRequired: boolean = false;
    phoneNumberRequired: boolean = false;
    cityAndPostalCodeRequired: boolean = false;
    passwordsMatching: boolean = false;
    updateConfirmation: boolean = false;
    canNotUpdateUser: boolean = false;
    canNotDeleteUser:boolean = false;

    onSubmit(): void {
      this.streetRequired = false;
      this.phoneNumberRequired = false;
      this.postalCodeRequired = false;
      this.cityRequired = false;
      this.stateRequired = false;
      this.lastNameRequired = false;
      this.nameRequired = false;
      this.passwordRequired = false;
      this.allFieldsRequired = false;
      this.cityAndPostalCodeRequired = false;
      this.passwordsMatching = false;
      this.updateConfirmation = false;
      this.canNotUpdateUser = false;
      this.canNotDeleteUser = false;


        if(!this.updateProfileForm.valid){

          if(this.updateProfileForm.value.oldPassword === ""){
            this.passwordRequired = true;
          }
          if(this.updateProfileForm.value.name === ""){
            this.nameRequired = true;
          }
          if(this.updateProfileForm.value.lastname === ""){
            this.lastNameRequired = true;
          }
          if(this.updateProfileForm.value.state === ""){
            this.stateRequired = true;
          }
          if(this.updateProfileForm.value.city === "" || this.updateProfileForm.value.postalCode === null){
            if(this.updateProfileForm.value.city === "" && this.updateProfileForm.value.postalCode === null){
              this.cityAndPostalCodeRequired = true;
            } else if(this.updateProfileForm.value.postalCode === null){
              this.postalCodeRequired = true;
            }else if(this.updateProfileForm.value.city === ""){
              this.cityRequired = true;
            }
          }
          if(this.updateProfileForm.value.street === ""){
            this.streetRequired = true;
          }
          if(this.updateProfileForm.value.phoneNumber === ""){
            this.phoneNumberRequired = true;
          }
          return;
        }
        if(this.updateProfileForm.value.newPassword != "" && (this.updateProfileForm.value.newPassword != this.updateProfileForm.value.newPasswordConfirmed)){
            this.passwordsMatching = true;
            return;
        }
        
        this.updateUser();
    }
    updateUser(): void {
      const address: Address = {
        id: null,
        state: this.updateProfileForm.value.state || "",
        city: this.updateProfileForm.value.city || "",
        postalCode: this.updateProfileForm.value.postalCode || "",
        street: this.updateProfileForm.value.street || ""
      }
      const updatedUser: UserUpdate = {
          id: null,
          name: this.updateProfileForm.value.name || "",
          lastname: this.updateProfileForm.value.lastname || "",
          phoneNumber: this.updateProfileForm.value.phoneNumber || "",
          oldPassword: this.updateProfileForm.value.oldPassword || "",
          newPassword: this.updateProfileForm.value.newPassword || "",
          address: address,
      }
      this.service.updateUser(updatedUser).subscribe({
          next:(_)=>{
            this.updateConfirmation = true;
            console.log("Uspesan zahtev");
          },
          error:(error) =>{
            console.log(error);
            this.canNotUpdateUser = true;
          }
      })
    }

    deleteUser(): void{
      this.passwordRequired = false;
      this.canNotDeleteUser = false;
      this.canNotUpdateUser = false;


      if(this.updateProfileForm.value.oldPassword ==""){
        this.passwordRequired = true;
        return;
      }
      const user: UserDelete = {
        password:this.updateProfileForm.value.oldPassword || ""
      }
      this.service.deleteUser(user).subscribe({
        next:(_)=>{
          console.log("Uspesno obrisan user");
          this.sharedService.deleteUserFromLocalStorage();
        },
        error:(error) =>{
          console.log(error);
          this.canNotDeleteUser = true;
        }
      })
    }


}
