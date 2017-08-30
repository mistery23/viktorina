import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";
import {User} from "../models/User";

@Component({
  selector: 'app-large-screen',
  templateUrl: './large-screen.component.html',
  styleUrls: ['./large-screen.component.scss']
})
export class LargeScreenComponent implements OnInit {

  users: User[];

  constructor(public userService:UserService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

}
