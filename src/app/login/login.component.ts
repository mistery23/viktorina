import {Component} from '@angular/core';
import { UserService } from "../services/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  user: string;

  constructor(public userService:UserService) {}

  login() {
    this.userService.login(this.user);
  }

}
