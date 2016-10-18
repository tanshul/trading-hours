import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent {

  companies: FirebaseListObservable<any>;
  category: FirebaseListObservable<any>;
  details: FirebaseListObservable<any>;
  hours: FirebaseListObservable<any>;
  map: FirebaseListObservable<any>;
  social: FirebaseListObservable<any>;

  constructor(public af: AngularFire) {
    this.companies = af.database.list('/companies',
      { query: { limitToLast: 20 } }).map((arr) => { return arr.reverse() }) as FirebaseListObservable<any[]>;
    this.category = af.database.list('/category');
    this.details = af.database.list('/details');
    this.hours = af.database.list('/hours');
    this.map = af.database.list('/map');
    this.social = af.database.list('/social');
    this.af = af;

  }

  delete(key: string) {
    var confirm = window.confirm("Are you 100% sure you want to delete this?");
    if (confirm === true) {
      this.companies.remove(key);
      this.category.remove(key);
      this.details.remove(key);
      this.hours.remove(key);
      this.map.remove(key);
      this.social.remove(key);
    } else {
      return false;
    }
  }

  search(term) {
    if (term && term !== '') {
      this.companies = this.af.database.list('/companies').map((arr) => { return arr.filter(item => item.name.toLowerCase().indexOf(term.toLowerCase()) > -1); }) as FirebaseListObservable<any[]>;
    } else {
      this.companies = this.af.database.list('/companies', { query: { orderByChild: 'dateadded', limitToLast: 10 } });
    }
    return false;
  }
  checksearch(term) {
    if (term === '') {
      //reset to default if no params in search
      this.companies = this.af.database.list('/companies', { query: { limitToLast: 20 } });
    }
  }

}
