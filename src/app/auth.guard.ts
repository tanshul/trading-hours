import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import { AngularFire, FirebaseAuth } from 'angularfire2';
import { AngularFireModule, AuthMethods, AuthProviders } from 'angularfire2';
import { FormsModule } from '@angular/forms';

import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: FirebaseAuth, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.auth.map((auth) => {
      if (auth == null) {
        this.router.navigate(['/login']);
        return false;
      } else {
        console.log("Logged");
        return true;
      }
    }).first()
  }

}
@Injectable()
export class AuthService {

  public user = {};
  public authenticated: boolean = false;

  constructor(public af: AngularFire, private router: Router) {
    this.af.auth.subscribe(user => {
      if (user) {
        this.user = user.auth.email;
        this.authenticated = true;
        // this.router.navigate(['/list']);
      }
      else {
        // user not logged in
        this.user = {};
        this.authenticated = false;
        this.router.navigate(['/login']);
      }
    });
  }

  public login(form: any) {
    this.af.auth.login({ email: form.email, password: form.password });
  }
  public logout() {
    this.af.auth.logout();
    console.log("Logout");
    return false;
  }
}