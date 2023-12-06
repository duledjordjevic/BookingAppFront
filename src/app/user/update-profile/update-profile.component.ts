import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
    constructor(private service: UserService) { }
    ngOnInit(): void {
      this.service.getUsers().subscribe({
        next:(result: any) =>{
          console.log(result);
        },
        error:(err : any)=>{
          console.log(err);
        }
      })
    }
    name: string = "Dusan";
    lastName: string = "Maric";
    address: string = "Banovic Strahinje 30";
    option: string = "option1";
    email: string = "dusanmaric@gmail.com";
    phoneNumber: string = "063123123";
    password: string = "123456789";

}
