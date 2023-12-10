import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { SharedService } from 'src/app/services/shared.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Admin, AdminUpdate } from '../model/admin.model';
import { UserDelete, UserType } from '../model/user.model';

@Component({
  selector: 'app-update-admin',
  templateUrl: './update-admin.component.html',
  styleUrls: ['./update-admin.component.css']
})
export class UpdateAdminComponent {
  constructor(private service: UserService,
    private sharedService: SharedService) { }

    res: Admin | undefined;

    ngOnInit(): void {
      this.service.getAdmin().subscribe({
        next:(result: Admin) =>{
          this.res = result;
          this.updateAdminForm = new FormGroup({
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
    updateAdminForm = new FormGroup({
      newPassword: new FormControl('',[Validators.required]),
      newPasswordConfirmed: new FormControl('',[Validators.required]),
      oldPassword: new FormControl('',[Validators.required]),
    })

    passwordsMatching: boolean = false;
    passwordRequired: boolean = false;
    newPasswordRequired: boolean = false;
    updateConfirmation: boolean = false;

    updateUser(): void {
      this.passwordsMatching= false;
      this.passwordRequired = false;
      this.newPasswordRequired = false;
      this.updateConfirmation = false;

      if(!this.updateAdminForm.valid){
        if(this.updateAdminForm.value.oldPassword ==""){
          this.passwordRequired = true;
        }
  
        if(this.updateAdminForm.value.newPassword == "" ){
          this.newPasswordRequired = true;  
        }
        return;

      }else if(this.updateAdminForm.value.newPassword != this.updateAdminForm.value.newPasswordConfirmed){
        this.passwordsMatching = true;
        return;
      }
     
      const updatedAdmin: AdminUpdate = {
          email:this.res?.email || "", 
          oldPassword: this.updateAdminForm.value.oldPassword || "",
          newPassword: this.updateAdminForm.value.newPassword || "",
      }
      this.service.updateAdmin(updatedAdmin).subscribe({
          next:(_)=>{
              console.log("Uspesan zahtev");
              this.updateConfirmation= true;
          }
      })

  }

  
  deleteUser(): void{
    this.passwordRequired = false;
    if(this.updateAdminForm.value.oldPassword ==""){
      this.passwordRequired = true;
      return;
    }
    const user: UserDelete = {
      password:this.updateAdminForm.value.oldPassword || ""
    }
    this.service.deleteUser(user).subscribe({
      next:(_)=>{
        console.log("Uspesno obrisan user");
        this.sharedService.deleteUserFromLocalStorage();
      }
    })
  }
}
