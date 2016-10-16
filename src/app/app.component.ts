import { Component } from '@angular/core';
import { AuthService } from './auth.guard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  constructor(private auth: AuthService) { }

  filterterm(term) {
    console.log(term);

  }
}
