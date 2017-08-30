import { Component, OnInit } from '@angular/core';
import {User} from "../../models/User";
import * as firebase from 'firebase/app';
import {AngularFireDatabase, FirebaseObjectObservable} from "angularfire2/database";

@Component({
  selector: 'app-header-user',
  templateUrl: './header-user.component.html',
  styleUrls: ['./header-user.component.scss']
})
export class HeaderUserComponent implements OnInit {

  showProfile: true;

  user: FirebaseObjectObservable<User>;

  constructor(public db:AngularFireDatabase) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        let uid = user.uid;
        let item = this.db.object(`/users/${uid}`, { preserveSnapshot: true });
        item.subscribe(snapshot => {
          this.user = snapshot.val();
        });
      } else {
        console.log('error');
      }
    });
  }

}
