import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  currentIssue: any;
  settings: any;
  questionsList: {};

  constructor(public userService:UserService) { }

  ngOnInit() {
    this.userService.getCurrentIssue().subscribe(issue => {
      this.currentIssue = issue;
    });
    this.userService.getSettings().subscribe(settings => {
      this.settings = settings;
    });
    this.questionsList = this.userService.getQuestionsList();
  }

  nextQuestion(i) {
    if(i <  Object.keys(this.questionsList).length) {
        this.userService.nextQuestion(this.questionsList[i]);
    } else {
        alert('Ето был последний вопрос');
    }
  }

  startGame() {
    this.userService.startGame(this.questionsList[0]);
  }

  clearRoom() {
    this.userService.clearRoom();
  }

  timeOver() {
    this.userService.timeOver();
  }
}
