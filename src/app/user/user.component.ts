import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";
import {FirebaseObjectObservable} from "angularfire2/database";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  user: any;
  currentIssue: any;
  settings: any;

  constructor(public userService:UserService) { }

  ngOnInit() {
    this.userService.getCurrentIssue().subscribe(issue => {
      this.currentIssue = issue;
    });
    this.userService.getSettings().subscribe(settings => {
      this.settings = settings;
    });
    this.userService.getUser().subscribe(user => {
      this.user = user;
    });
  }

  answer(numberIssue, checkIssue, answer) {
    this.userService.answer(numberIssue, checkIssue, answer);
  }

}
