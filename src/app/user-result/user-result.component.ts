import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";


@Component({
  selector: 'app-user-result',
  templateUrl: './user-result.component.html',
  styleUrls: ['./user-result.component.scss']
})
export class UserResultComponent implements OnInit {

  questionsList: any;
  user: any;

  constructor(public userService:UserService) { }

  ngOnInit() {
    this.userService.getAllQuestions().subscribe(questions => {
      this.questionsList = questions;
    });
    this.userService.getUser().subscribe(user => {
      this.user = user;
    });
  }

}
