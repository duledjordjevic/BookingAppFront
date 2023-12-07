import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { UserModel } from './model/user.model';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
  res: UserModel | undefined;

    constructor(private service: UserService) { }

    ngOnInit(): void {
      this.service.getUsers().subscribe({
        next:(result: UserModel) =>{
          this.res = result;
        },
        error:(err : any)=>{
          console.log(err);
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
