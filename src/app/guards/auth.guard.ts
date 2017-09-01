import {Injectable} from "@angular/core";
import {CanActivate, Router} from "@angular/router";
import 'rxjs/add/operator/map';
import {AngularFireAuth} from "angularfire2/auth";
import {Observable} from "rxjs/Observable";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: AngularFireAuth, private router: Router) { }

  canActivate(): Observable<boolean> {
    return this.auth.authState.map(auth => {
      if(!auth) {
        this.router.navigate(['/login']);
        return false;
      } else {
        return true;
      }
    })
  }
}
