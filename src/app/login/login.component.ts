import {Component, OnInit} from '@angular/core';
import { UserService } from "../services/user.service";
import * as firebase from 'firebase/app';
import {AngularFireDatabase} from "angularfire2/database";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit  {

  user: string;

  constructor(public userService:UserService, public db:AngularFireDatabase) {}

  ngOnInit() {
    // firebase.auth().onAuthStateChanged(user => {
    //   if (user) {
    //     let uid = user.uid;
    //     let item = this.db.object(`/users/${uid}`, { preserveSnapshot: true });
    //     item.subscribe(snapshot => {
    //       if( snapshot.val().firstName) {
    //         console.log( snapshot.val().firstName);
    //         this.user = snapshot.val().firstName;
    //       }
    //     });
    //   }
    // });
  }

  login() {
    this.userService.login(this.user);
  }

}
