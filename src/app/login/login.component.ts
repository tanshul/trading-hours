import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.guard';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  constructor(private auth: AuthService) { }

  login(form: any) {
    if (!form.email || !form.password) {
      alert("Please Enter Credentials");
      return false;
    }

    this.auth.login(form);

    return false;
  }
}
