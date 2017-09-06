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
    // start /////////////////////////////////////////////////////////////////////////////////////
    // this.userService.getHttpQuestionsList().subscribe(response => {
    //   this.questionsList = response['questions'];
    // });
    this.questionsList = [ {
      "answers" : [ {
        "answer" : "answer 1"
      }, {
        "answer" : "answer 2"
      }, {
        "answer" : "answer 3"
      }, {
        "answer" : "answer 4"
      } ],
      "correct" : 2,
      "id" : 1,
      "number" : 1,
      "question" : "Test question 1",
      "time" : 25
    }, {
      "answers" : [ {
        "answer" : "answer 2"
      }, {
        "answer" : "answer 1"
      }, {
        "answer" : "answer 3"
      }, {
        "answer" : "answer 4"
      } ],
      "correct" : 1,
      "id" : 2,
      "number" : 2,
      "question" : "Test question 2",
      "time" : 100
    }, {
      "answers" : [ {
        "answer" : "Первый"
      }, {
        "answer" : "правильный"
      }, {
        "answer" : "третий"
      }, {
        "answer" : "четвертый"
      } ],
      "correct" : 1,
      "id" : 3,
      "number" : 3,
      "question" : "Третий вопрос",
      "time" : 100
    }, {
      "answers" : [ {
        "answer" : "тест1 правильный"
      }, {
        "answer" : "тест2"
      }, {
        "answer" : "тест3"
      }, {
        "answer" : "тест4"
      } ],
      "correct" : 0,
      "id" : 4,
      "number" : 4,
      "question" : "Четвертый вопрос",
      "time" : 100
    }, {
      "answers" : [ {
        "answer" : "1111111"
      }, {
        "answer" : "222222222"
      }, {
        "answer" : "333333333"
      }, {
        "answer" : "4444444444"
      } ],
      "correct" : 0,
      "id" : 5,
      "number" : 5,
      "question" : "пятый вопрос",
      "time" : 100
    }, {
      "answers" : [ {
        "answer" : "шестой вопрос 1"
      }, {
        "answer" : "шестой вопрос 2"
      }, {
        "answer" : "шестой вопрос 3"
      }, {
        "answer" : "шестой вопрос 4"
      } ],
      "correct" : 3,
      "id" : 6,
      "number" : 6,
      "question" : "шестой вопрос",
      "time" : 100
    }, {
      "answers" : [ {
        "answer" : "патичвап каывап"
      }, {
        "answer" : "вы вап ыкерывар ук к"
      }, {
        "answer" : "ык евке кер ввкр ке"
      }, {
        "answer" : "ыке рпыкер ыкер кер "
      } ],
      "correct" : 0,
      "id" : 7,
      "number" : 7,
      "question" : "седьмой вопрос ",
      "time" : 100
    }, {
      "answers" : [ {
        "answer" : "71"
      }, {
        "answer" : "72"
      }, {
        "answer" : "73"
      }, {
        "answer" : "74"
      } ],
      "correct" : 0,
      "id" : 8,
      "number" : 8,
      "question" : "Восьмой вопрос, екрвы кыервп птвапр ыпервап ыв",
      "time" : 100
    }, {
      "answers" : [ {
        "answer" : " керр уено "
      }, {
        "answer" : "не оне еуно оен "
      }, {
        "answer" : "уен оо уено кен оеноуено уео"
      }, {
        "answer" : "кенреог уенценол нуеногц кношл уего он г"
      } ],
      "correct" : 1,
      "id" : 9,
      "number" : 9,
      "question" : "предпоследний вопрос ",
      "time" : 100
    }, {
      "answers" : [ {
        "answer" : "неправильный1"
      }, {
        "answer" : "неправильный2"
      }, {
        "answer" : "правильный"
      }, {
        "answer" : "неправильный4"
      } ],
      "correct" : 2,
      "id" : 10,
      "number" : 10,
      "question" : "последний вопрос, наконец то!",
      "time" : 100
    } ];
    // and ////////////////////////////
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
