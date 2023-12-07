import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { AddressModel, UserModel } from './model/user.model';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css'],
})
export class UpdateProfileComponent implements OnInit {
    res: UserModel | undefined;
    // updateProfileForm: FormGroup | undefined;

    constructor(private service: UserService) { }

    ngOnInit(): void {
      this.service.getUser().subscribe({
        next:(result: UserModel) =>{
            console.log(result);
          this.res = result;
          this.updateProfileForm = new FormGroup({
            name: new FormControl(this.res.name,[Validators.required]),
            lastname: new FormControl(this.res.lastname,[Validators.required]),
            state: new FormControl(this.res.address.state,[Validators.required]),
            city: new FormControl(this.res.address.city,[Validators.required]),
            postalCode: new FormControl(this.res.address.postalCode,[Validators.required]),
            street: new FormControl(this.res.address.street,[Validators.required]),
            userType: new FormControl(this.res.userType,[Validators.required]),
            email: new FormControl(this.res.email,[Validators.required]),
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
        userType: new FormControl('',[Validators.required]),
        email: new FormControl('',[Validators.required]),
        phoneNumber: new FormControl('',[Validators.required]),
        newPassword: new FormControl('',[Validators.required]),
        newPasswordConfirmed: new FormControl('',[Validators.required]),
        oldPassword: new FormControl('',[Validators.required]),
      })
    
    
    

    updateUser(): void {
        console.log(this.updateProfileForm?.value);
        const address: AddressModel = {
            id: null,
            state: this.updateProfileForm.value.name || "",
            city: this.updateProfileForm.value.city || "",
            postalCode: this.updateProfileForm.value.postalCode || "",
            street: this.updateProfileForm.value.street || ""
        }
        const updatedUser: UserModel = {
            id: null,
            name: this.updateProfileForm.value.name || "",
            lastname: this.updateProfileForm.value.lastname || "",
            email: this.updateProfileForm.value.email || "",
            phoneNumber: this.updateProfileForm.value.phoneNumber || "",
            password: this.res?.password || "",
            address: address,
            userType: "GUEST"
        }
        this.service.updateUser(updatedUser).subscribe({
            next:(_)=>{
                console.log("Uspesan zahtev");
            }
        })

    }
    // name: string = this.res.name
    // lastName: string = "Maric";
    // address: string = "Banovic Strahinje 30";
    // option: string = "option1";
    // email: string = "dusanmaric@gmail.com";
    // phoneNumber: string = "063123123";
    // password: string = "123456789";

}
