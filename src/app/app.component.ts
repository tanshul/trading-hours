import { Component } from '@angular/core';
import { AuthService } from './auth.guard';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  companies: string;

  constructor(private auth: AuthService) { }

}
