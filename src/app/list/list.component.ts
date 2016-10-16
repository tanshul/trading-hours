import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent {

  companies: FirebaseListObservable<any>;

  constructor(public af: AngularFire) {
    this.companies = af.database.list('/companies', { query: { orderByChild: 'dateadded', limitToLast: 10 } });
  }

  update(key: string) {
    console.log(key);
  }

  delete(key: string) {
    this.companies.remove(key);
  }

}
