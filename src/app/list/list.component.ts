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
    this.af = af;
  }

  update(key: string) {
    console.log(key);
  }

  delete(key: string) {
    this.companies.remove(key);
  }

  search(term) {
    if (term && term !== '') {
      this.companies = this.af.database.list('/companies', { query: { orderByChild: 'name', equalTo: term } });
    } else {
      this.companies = this.af.database.list('/companies', { query: { orderByChild: 'dateadded', limitToLast: 10 } });
    }
    return false;
  }
  checksearch(term) {
    if (term === '') {
      //reset to default if no params in search
      this.companies = this.af.database.list('/companies', { query: { orderByChild: 'dateadded', limitToLast: 10 } });
    }
  }

}
