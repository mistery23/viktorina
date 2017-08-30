import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import {User} from "../models/User";
import {Router} from "@angular/router";

@Injectable()
export class UserService {

  currentIssue: FirebaseObjectObservable<any>;
  users: FirebaseListObservable<any[]>;
  user: FirebaseObjectObservable<any>;

  constructor(public db:AngularFireDatabase, private router: Router) {
    this.users = this.db.list('/users') as FirebaseListObservable<User[]>;
    this.currentIssue = this.db.object(`/users/CurrentIssue`) as FirebaseObjectObservable<any[]>;
  }

  getUsers() {
    return this.users;
  }

  getCurrentIssue() {
    return this.currentIssue;
  }

  login(usenName:string) {
    firebase.auth().signInAnonymously();
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        let uid = user.uid;

        const setName = this.db.object(`/users/${uid}`);
        setName.set({ firstName: usenName});

        this.router.navigate(['/user']);
      } else {
        alert('Ошибка авторизации!');
      }
    });
  }

  setCurrentIssue(countIssue) {
    let currentIssue = this.db.object(`/users/CurrentIssue`);
    currentIssue.set(countIssue);
  }

}
