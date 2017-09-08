import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";
import {AngularFireDatabase, FirebaseObjectObservable} from "angularfire2/database";
import {Router} from "@angular/router";

@Component({
  selector: 'app-large-screen',
  templateUrl: './large-screen.component.html',
  styleUrls: ['./large-screen.component.scss']
})
export class LargeScreenComponent implements OnInit {

  users: any;
  settings: any;
  currentIssue: any;
  statistics: any;
  goToWinners: FirebaseObjectObservable<any>;

  constructor(public userService:UserService, public db:AngularFireDatabase, private router: Router) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
    this.userService.getSettings().subscribe(settings => {
      this.settings = settings;
    });
    this.userService.getCurrentIssue().subscribe(issue => {
      this.currentIssue = issue;
    });
    this.userService.getStatistics().subscribe(statistics => {
      this.statistics = statistics;
    });
    this.goToWinners = this.db.object(`/settings`, { preserveSnapshot: true });
    this.goToWinners.subscribe(snapshots => {
      if(snapshots.val().largeScreen == 'winners') {
        this.router.navigate(['/winners']);
      }
    });
  }
}
