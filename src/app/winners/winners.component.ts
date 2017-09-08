import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";
import {AngularFireDatabase, FirebaseObjectObservable} from "angularfire2/database";
import {Router} from "@angular/router";

@Component({
  selector: 'app-winners',
  templateUrl: './winners.component.html',
  styleUrls: ['./winners.component.scss']
})
export class WinnersComponent implements OnInit {

  winners: any;
  goToLargeScreen: FirebaseObjectObservable<any>;

  constructor(public userService:UserService, public db:AngularFireDatabase, private router: Router) { }

  ngOnInit() {
    this.userService.getWinners().subscribe(winners => {
      this.winners = winners;
    });
    this.goToLargeScreen = this.db.object(`/settings`, { preserveSnapshot: true });
    this.goToLargeScreen.subscribe(snapshots => {
      if(snapshots.val().largeScreen != 'winners') {
        this.router.navigate(['/large-screen']);
      }
    });
  }

}
