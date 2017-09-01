import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/map';
import {User} from "../models/User";
import {Router} from "@angular/router";

@Injectable()
export class UserService {

  users: FirebaseListObservable<User[]>;
  currentIssue: FirebaseObjectObservable<any>;
  settings: FirebaseObjectObservable<any>;
  statistics: FirebaseObjectObservable<any>;
  uid: string;

  constructor(public db:AngularFireDatabase, private router: Router) {
    this.users = this.db.list('/users') as FirebaseListObservable<User[]>;
    this.currentIssue = this.db.object(`/current-issue`) as FirebaseObjectObservable<any[]>;
    this.settings = this.db.object(`/settings`) as FirebaseObjectObservable<any[]>;
    this.statistics = this.db.object(`/statistics`) as FirebaseObjectObservable<any[]>;
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.uid = user.uid;
      }
    });
  }

  answer(numberIssue, checkIssue, correctIssue) {
    let setStatisticsText = this.db.object(`/statistics/answers/${checkIssue}/text`) as FirebaseObjectObservable<any[]>;
    let setStatisticsIssue = this.db.list(`/statistics/answers/${checkIssue}/issue`) as FirebaseListObservable<any[]>;
    let setStatisticsCountIssue = this.db.list(`/statistics/countIssue`) as FirebaseListObservable<any[]>;

    setStatisticsText.set({text: checkIssue});
    setStatisticsIssue.push({issue:1});
    setStatisticsCountIssue.push({issue:1});
  }

  getStatistics() {
    return this.statistics;
  }

  getSettings() {
    return this.settings;
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

}
