import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  countIssue:number = 0;
  currentIssue: any;

  questionsList = {
    1: {
      number: 1 ,
      question: 'Что такое резервная емкость АКБ?',
      answers: {
        0: {
          answer: 'Вгадай1!',
          correct: 1
        },
        1: {
          answer: 'Вгадай2',
          correct: 0
        },
        2: {
          answer: 'Вгадай3',
          correct: 0
        },
        3: {
          answer: 'Вгадай4',
          correct: 0
        }
      }
    },
    2: {
      number:2,
      question : 'Что такое резервная емкость АКБ?2',
      answers : {
        0 : {
          answer: 'Вгадай',
          correct : 0
        },
        1 : {
          answer: 'Вгадай!',
          correct : 1
        },
        2 : {
          answer: 'Вгадай',
          correct : 0
        },
        3 : {
          answer: 'Вгадай',
          correct : 0
        }
      }
    }
  };

  constructor(public userService:UserService) { }

  ngOnInit() {
    this.userService.getCurrentIssue().subscribe(issue => {
      this.currentIssue = issue;
      // console.log(issue);
    });
  }
  nextQuestion() {
    this.userService.nextQuestion(this.questionsList[this.countIssue]);
  }

  startGame() {
    this.userService.startGame(this.questionsList[1]);
  }

  clearRoom() {
    this.userService.clearRoom();
  }
}
