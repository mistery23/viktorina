import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/map';
import {User} from "../models/User";
import {Router} from "@angular/router";

@Injectable()
export class UserService {

  questionsList:{};
  users: FirebaseListObservable<User[]>;
  user: FirebaseObjectObservable<any>;
  currentIssue: FirebaseObjectObservable<any>;
  settings: FirebaseObjectObservable<any>;
  statistics: FirebaseObjectObservable<any>;
  uid: string;

  constructor(public db:AngularFireDatabase, private router: Router) {
    this.questionsList = {
      0: {
        number: 1,
        correct: 1,
        question: 'Что такое резервная емкость АКБ?',
        answers: {
          0: {
            answer: 'ответ1'
          },
          1: {
            answer: 'Правильный ответ'
          },
          2: {
            answer: 'ответ3'
          },
          3: {
            answer: 'ответ4'
          }
        }
      },
      1: {
        number:2,
        correct: 2,
        question : 'Что такое резервная емкость АКБ?2',
        answers: {
          0: {
            answer: 'ответ1'
          },
          1: {
            answer: 'ответ2'
          },
          2: {
            answer: 'Правильный ответ'
          },
          3: {
            answer: 'ответ4'
          }
        }
      },
      2: {
        number:3,
        correct: 0,
        question : 'Что такое резервная емкость АКБ?3',
        answers: {
          0: {
            answer: 'Правильный ответ'
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
        number:4,
        correct: 3,
        question : 'Что такое резервная емкость АКБ?4',
        answers: {
          0: {
            answer: 'ответ1'
          },
          1: {
            answer: 'ответ2'
          },
          2: {
            answer: 'ответ3'
          },
          3: {
            answer: 'Правильный ответ'
          }
        }
      },
      4: {
        number: 5,
        correct: 1,
        question: 'Что такое резервная емкость АКБ?5',
        answers: {
          0: {
            answer: 'ответ1'
          },
          1: {
            answer: 'Правильный ответ'
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
    this.users = this.db.list('/users') as FirebaseListObservable<User[]>;
    this.currentIssue = this.db.object(`/current-issue`) as FirebaseObjectObservable<any[]>;
    this.settings = this.db.object(`/settings`) as FirebaseObjectObservable<any[]>;
    this.statistics = this.db.object(`/statistics`) as FirebaseObjectObservable<any[]>;
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.uid = user.uid;
        this.user = this.db.object(`/users/${user.uid}`);
      }
    });
  }

  answer(numberIssue, checkIssue, answer) {
    this.setStatistics(checkIssue, answer);

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        let uid = user.uid;
        const curentQuestion = this.db.object(`/users/${uid}/questions/${numberIssue - 1}`);
        curentQuestion.update({answer: answer, checkIssue: checkIssue});
      }
    });
  }

  getQuestionsList() {
    return this.questionsList;
  }

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
    this.statistics.remove();
    this.statistics.update({question: countIssue.question, number: countIssue.number, correct: countIssue.correct});
    this.settings.update({largeScreen: 'question'});
  }

  clearRoom() {
    this.currentIssue.remove();
    this.statistics.remove();
    this.users.remove();
    this.settings.update({largeScreen: ''});
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
    setStatisticsIssue.push({issue:1});
    setStatisticsCountIssue.push({issue:1});
  }

}
