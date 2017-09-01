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

  questionsList = {
    1: {
      number: 1,
      correct: 1,
      question: 'Что такое резервная емкость АКБ?',
      answers: {
        0: {
          answer: 'ответ1!'
        },
        1: {
          answer: 'ответ2'
        },
        2: {
          answer: 'ответ3'
        },
        3: {
          answer: 'ответ4'
        }
      }
    },
    2: {
      number:2,
      correct: 1,
      question : 'Что такое резервная емкость АКБ?2',
      answers: {
        0: {
          answer: 'ответ1!'
        },
        1: {
          answer: 'ответ2'
        },
        2: {
          answer: 'ответ3'
        },
        3: {
          answer: 'ответ4'
        }
      }
    },
    3: {
      number:3,
      correct: 1,
      question : 'Что такое резервная емкость АКБ?3',
      answers: {
        0: {
          answer: 'ответ1!'
        },
        1: {
          answer: 'ответ2'
        },
        2: {
          answer: 'ответ3'
        },
        3: {
          answer: 'ответ4'
        }
      }
    },
    4: {
      number:4,
      correct: 1,
      question : 'Что такое резервная емкость АКБ?4',
      answers: {
        0: {
          answer: 'ответ1!'
        },
        1: {
          answer: 'ответ2'
        },
        2: {
          answer: 'ответ3'
        },
        3: {
          answer: 'ответ4'
        }
      }
    },
    5: {
      number: 5,
      correct: 1,
      question: 'Что такое резервная емкость АКБ?5',
      answers: {
        0: {
          answer: 'ответ1!'
        },
        1: {
          answer: 'ответ2'
        },
        2: {
          answer: 'ответ3'
        },
        3: {
          answer: 'ответ4'
        }
      }
    }
  };

  constructor(public userService:UserService) { }

  ngOnInit() {
    this.userService.getCurrentIssue().subscribe(issue => {
      this.currentIssue = issue;
    });
    this.userService.getSettings().subscribe(settings => {
      this.settings = settings;
    });
  }

  nextQuestion(i) {
    if(i <=  Object.keys(this.questionsList).length) {
        this.userService.nextQuestion(this.questionsList[i]);
    } else {
        alert('Ето был последний вопрос');
    }
  }

  startGame() {
    this.userService.startGame(this.questionsList[1]);
  }

  clearRoom() {
    this.userService.clearRoom();
  }

  timeOver() {
    this.userService.timeOver();
  }
}
