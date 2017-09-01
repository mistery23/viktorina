import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  currentIssue: any;
  settings: any;
  giveAnswer: boolean;

  constructor(public userService:UserService) { }

  ngOnInit() {
    this.userService.getCurrentIssue().subscribe(issue => {
      this.currentIssue = issue;
    });
    this.userService.getSettings().subscribe(settings => {
      this.settings = settings;
    });
  }

  answer(numberIssue, checkIssue, correctIssue) {
    this.userService.answer(numberIssue, checkIssue, correctIssue);
  }

}
