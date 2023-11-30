import { Component } from '@angular/core';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent {
    name: string = "Dusan";
    lastName: string = "Maric";
    address: string = "Banovic Strahinje 30";
    option: string = "option1";
    email: string = "dusanmaric@gmail.com";
    phoneNumber: string = "063123123";
    password: string = "123456789";
}
