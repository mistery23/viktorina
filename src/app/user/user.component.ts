import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  user: any;
  currentIssue: any;
  settings: any;
  winner: any;
  questionsList: any;

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
    this.userService.getWinner().subscribe(winner => {
      this.winner = winner;
    });
    this.userService.getAllQuestions().subscribe(questions => {
      this.questionsList = questions;
    });
  }

  answer(numberIssue, checkIssue, answer, correct, name, count) {
    this.userService.answer(numberIssue, checkIssue, answer, correct, name, count);
  }

}
