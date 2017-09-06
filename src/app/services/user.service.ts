import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/map';
import {User} from "../models/User";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class UserService {

  questionsList:{};
  users: FirebaseListObservable<User[]>;
  user: FirebaseObjectObservable<any>;
  currentIssue: FirebaseObjectObservable<any>;
  settings: FirebaseObjectObservable<any>;
  statistics: FirebaseObjectObservable<any>;
  allQuestions: FirebaseObjectObservable<any>;
  winners: FirebaseListObservable<any>;
  winner: FirebaseObjectObservable<any>;
  uid: string;

  constructor(public db:AngularFireDatabase, private router: Router, private http: HttpClient) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.uid = user.uid;
        this.user = this.db.object(`/users/${user.uid}`);
        this.winner = this.db.object(`/winners/${this.uid}`);
      }
    });
    this.allQuestions = this.db.object(`/questions`) as FirebaseObjectObservable<any[]>;




    // start//////////////////////////////////////////////////////////////////////////////////////////////////
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
    this.allQuestions.update(this.questionsList);
    //   this.allQuestions.update(this.questionsList);
    // this.getHttpQuestionsList().subscribe(response => {
    //   this.questionsList = response['questions'];
    //   this.allQuestions.update(this.questionsList);
    // });
    //and///////////////////////////////////////////////////////////////////////////////////////////////////////



    this.users = this.db.list('/users') as FirebaseListObservable<User[]>;
    this.currentIssue = this.db.object(`/current-issue`) as FirebaseObjectObservable<any[]>;
    this.settings = this.db.object(`/settings`) as FirebaseObjectObservable<any[]>;
    this.statistics = this.db.object(`/statistics`) as FirebaseObjectObservable<any[]>;
    this.winners = this.db.list(`/winners`, {
      query: {
        orderByChild: 'count'
      }
    }).map((array) => array.reverse()) as FirebaseListObservable<any[]>;
  }

  answer(numberIssue, checkIssue, answer, correct, name, count) {
    this.setStatistics(checkIssue, answer);
    const curentQuestion = this.db.object(`/users/${this.uid}/questions/${numberIssue - 1}`);
    curentQuestion.update({answer: answer, checkIssue: checkIssue});
    if(checkIssue == correct) {
      this.setWinner(name, count);
    }
  }

  getWinner() {
    return this.winner;
  }

  getWinners() {
    return this.winners;
  }

  getAllQuestions() {
    return this.allQuestions;
  }

  // getHttpQuestionsList() {
  //   return this.http.get('http://apchome.ru/api/game-millionaire/index');
  // }

  getStatistics() {
    return this.statistics;
  }

  getSettings() {
    return this.settings;
  }

  getUser() {
    return this.user;
  }

  getUsers() {
    return this.users;
  }

  getCurrentIssue() {
    return this.currentIssue;
  }

  nextQuestion(countIssue) {
    this.currentIssue.set(countIssue);
    this.statistics.update({answers: {
      0: {
        "issue" : false,
        "text" : {
          "checkIssue" : false,
          "text" : false
        }
      },
      1:{
        "issue" : false,
        "text" : {
          "checkIssue" : false,
          "text" : false
        }
      },
      2:{
        "issue" : false,
        "text" : {
          "checkIssue" : false,
          "text" : false
        }
      },
      3:{
        "issue" : false,
        "text" : {
          "checkIssue" : false,
          "text" : false
        }
      }},
      countIssue: {}
    });
    this.statistics.update({question: countIssue.question, number: countIssue.number, correct: countIssue.correct});
    this.settings.update({largeScreen: 'question'});
  }

  clearRoom() {
    this.winners.remove();
    this.currentIssue.remove();
    this.users.remove();
    this.statistics.update({answers: {
      0: {
        "issue" : false,
        "text" : {
          "checkIssue" : false,
          "text" : false
        }
      },
      1:{
        "issue" : false,
        "text" : {
          "checkIssue" : false,
          "text" : false
        }
      },
      2:{
        "issue" : false,
        "text" : {
          "checkIssue" : false,
          "text" : false
        }
      },
      3:{
        "issue" : false,
        "text" : {
          "checkIssue" : false,
          "text" : false
        }
      }},
      countIssue: {}
    });
    this.settings.update({largeScreen: 'claer', clearRoom: false, userResult: false});
  }

  finishGame() {
    this.settings.update({clearRoom: true, largeScreen: 'winners', finish: false, userResult: true});
    this.currentIssue.remove();
  }

  lastQuestion() {
    this.settings.update({finish: true});
  }

  startGame(countIssue) {
    this.currentIssue.set(countIssue);
    this.statistics.update({question: countIssue.question, number: countIssue.number, correct: countIssue.correct});
    this.settings.update({largeScreen: 'question'});
  }

  timeOver() {
    this.settings.update({largeScreen: 'statistics'});
  }

  login(usenName:string) {
    firebase.auth().signInAnonymously();
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        let uid = user.uid;
        const setName = this.db.object(`/users/${uid}`);
        setName.set({ firstName: usenName});
        this.router.navigate(['/user']);
      }
    });
  }

  setStatistics(checkIssue, answer) {
    let setStatisticsText = this.db.object(`/statistics/answers/${checkIssue}/text`) as FirebaseObjectObservable<any[]>;
    let setStatisticsIssue = this.db.list(`/statistics/answers/${checkIssue}/issue`) as FirebaseListObservable<any[]>;
    let setStatisticsCountIssue = this.db.list(`/statistics/countIssue`) as FirebaseListObservable<any[]>;

    setStatisticsText.set({text: answer, checkIssue: checkIssue});
    setStatisticsIssue.push({issue: this.uid});
    setStatisticsCountIssue.push({issue: this.uid});
  }

  setWinner(userName, count) {
    if(count) {
      this.winner.update({
        userName: userName,
        count: count + 1
      })
    } else {
      this.winner.update({
        userName: userName,
        count: 1
      })
    }
  }

}
