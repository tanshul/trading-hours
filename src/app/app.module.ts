import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule, AuthMethods,AuthProviders } from 'angularfire2';

import { routing, appRoutingProviders } from './app.routing';
import { AuthGuard,AuthService }  from './auth.guard';

import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { ReversePipe } from './reverse.pipe';
import { EditComponent } from './edit/edit.component';
 

// Must export the config
export const firebaseConfig = {
  apiKey: "AIzaSyDyd24b85fYbaFV5MBf192aiE1FB_vRDns",
  authDomain: "fiji-trading-hours.firebaseapp.com",
  databaseURL: "https://fiji-trading-hours.firebaseio.com",
  storageBucket: "fiji-trading-hours.appspot.com",
  messagingSenderId: "128162571528"
}

const myFirebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
}
 

@NgModule({
  declarations: [
    AppComponent,LoginComponent, NotFoundComponent, ListComponent, AddComponent, ReversePipe, EditComponent
   ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig,myFirebaseAuthConfig)
  ],
  providers: [appRoutingProviders,AuthGuard,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
