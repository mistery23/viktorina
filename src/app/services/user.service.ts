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
    this.getHttpQuestionsList().subscribe(response => {
      this.questionsList = response['questions'];
      this.allQuestions.update(this.questionsList);
    });
    this.users = this.db.list('/users') as FirebaseListObservable<User[]>;
    this.currentIssue = this.db.object(`/current-issue`) as FirebaseObjectObservable<any[]>;
    this.settings = this.db.object(`/settings`) as FirebaseObjectObservable<any[]>;
    this.statistics = this.db.object(`/statistics`) as FirebaseObjectObservable<any[]>;
    this.winners = this.db.list(`/winners`, {
      query: {
        orderByChild: 'count'
      }
    });
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

  getHttpQuestionsList() {
    return this.http.get('http://apchome.ru/api/game-millionaire/index');
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
