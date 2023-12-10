import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { UserInfo, UserUpdate } from '../model/user.model';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { Address } from 'src/app/models/shared.models';

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
      this.service.getUser().subscribe({
        next:(result: UserInfo) =>{
          this.res = result;
          this.updateProfileForm = new FormGroup({
            name: new FormControl(this.res.name,[Validators.required]),
            lastname: new FormControl(this.res.lastname,[Validators.required]),
            state: new FormControl(this.res.address.state,[Validators.required]),
            city: new FormControl(this.res.address.city,[Validators.required]),
            postalCode: new FormControl(this.res.address.postalCode,[Validators.required]),
            street: new FormControl(this.res.address.street,[Validators.required]),
            phoneNumber: new FormControl(this.res.phoneNumber,[Validators.required]),
            newPassword: new FormControl('',[Validators.required]),
            newPasswordConfirmed: new FormControl('',[Validators.required]),
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
        newPassword: new FormControl('',[Validators.required]),
        newPasswordConfirmed: new FormControl('',[Validators.required]),
        oldPassword: new FormControl('',[Validators.required]),
      })
    
    
    

    updateUser(): void {
        console.log(this.updateProfileForm?.value);
        if(this.updateProfileForm.value.newPassword != "" || (this.updateProfileForm.value.newPassword != this.updateProfileForm.value.newPasswordConfirmed)){
            return;
        }
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
                console.log("Uspesan zahtev");
            }
        })

    }
    deleteUser(): void{
      this.service.deleteUser().subscribe({
        next:(_)=>{
          console.log("Uspesno obrisan user");
          this.sharedService.deleteUserFromLocalStorage();
        }
      })
    }


}
