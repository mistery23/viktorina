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
    this.userService.getHttpQuestionsList().subscribe(response => {
      this.questionsList = response['questions'];
      this.userService.allQuestionsUpdate(response['questions']);
    });
  }

  nextQuestion(i) {
    if(i <  Object.keys(this.questionsList).length) {
      this.userService.nextQuestion(this.questionsList[i]);
    }
  }

  startGame() {
    this.userService.startGame(this.questionsList[0]);
  }

  finishGame() {
    this.userService.finishGame();
  }

  clearRoom() {
    this.userService.clearRoom();
  }

  timeOver(i) {
    if( i == Object.keys(this.questionsList).length) {
      this.userService.lastQuestion();
    }
    this.userService.timeOver();
  }
}
