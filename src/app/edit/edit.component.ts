import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id: string;
  date: any;
  paramsSub: string;
  cities: Array<string>;
  categories: Array<string>;
  openhours: Array<string>;
  closehours: Array<string>;

  companies: FirebaseObjectObservable<any>;
  cate: FirebaseObjectObservable<any>;
  details: FirebaseObjectObservable<any>;
  hours: FirebaseObjectObservable<any>;
  map: FirebaseObjectObservable<any>;
  social: FirebaseObjectObservable<any>;

  constructor(public af: AngularFire, private router: Router, private route: ActivatedRoute) {
    this.cities = ["Ba", "Labasa", "Lautoka", "Levuka", "Nadi", "Nausori", "Rakiraki", "Savusavu", "Sigatoka", "Suva", "Taveuni"];
    this.categories = ["Authorities", "Associations", "Business", "Education", "Finance", "Government", "Legal", "Media", "Non Profit", "Public Service", "Restaurants and Bars", "Retail", "Other"];
    this.openhours = ["closed", "07:00 AM", "07:30 AM", "08:00 AM", "08:30 AM", "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM", "6:00 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM", "10:00 PM", "10:30 PM", "11:00 PM", "11:30 PM", "12:00 AM", "12:30 AM", "1:00 AM", "1:30 AM", "2:00 AM", "2:30 AM", "3:00 AM", "3:30 AM", "4:00 AM", "4:30 AM", "5:00 AM", "5:30 AM", "6:00 AM", "6:30 AM"];
    this.closehours = ["closed", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM", "6:00 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM", "10:00 PM", "10:30 PM", "11:00 PM", "11:30 PM", "12:00 AM", "12:30 AM", "1:00 AM", "1:30 AM", "2:00 AM", "2:30 AM", "3:00 AM", "3:30 AM", "4:00 AM", "4:30 AM", "5:00 AM", "5:30 AM", "6:00 AM", "6:30 AM", "07:00 AM", "07:30 AM", "08:00 AM", "08:30 AM", "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM",];
  }

  ngOnInit() {
    const key = this.route.snapshot.params['id'];
    this.companies = this.af.database.object('/companies/' + key);
    this.cate = this.af.database.object('/category/' + key);
    this.details = this.af.database.object('/details/' + key);
    this.hours = this.af.database.object('/hours/' + key);
    this.map = this.af.database.object('/map/' + key);
    this.social = this.af.database.object('/social/' + key);
  }

  updateField(newdata, name, object) {
    this.date = Date.now();
    if (object === 'companies' && name) {
      if (name === 'name') {
        this.companies.update({ name: newdata, dateupdated: this.date });
        this.details.update({ name: newdata });
      } else if (name === 'city') {
        this.companies.update({ city: newdata, dateupdated: this.date });
        this.details.update({ city: newdata });
      } else if (name === 'category') {
        this.companies.update({ category: newdata, dateupdated: this.date });
        this.cate.update({ category: newdata });
        this.details.update({ category: newdata, dateupdated: this.date });
      }
    }

    if (object === 'details') {
      if (name === 'address') {
        this.details.update({ address: newdata, dateupdated: this.date });
        this.map.update({ address: newdata, dateupdated: this.date });
      }
      else if (name === 'phone') {
        this.details.update({ phone: newdata, dateupdated: this.date });
      }
      else if (name === 'altphone') {
        this.details.update({ altphone: newdata, dateupdated: this.date });
      }
      else if (name === 'email') {
        this.details.update({ email: newdata, dateupdated: this.date });
        this.social.update({ email: newdata });
      }
      else if (name === 'website') {
        this.details.update({ website: newdata, dateupdated: this.date });
        this.social.update({ website: newdata });
      }
      else if (name === 'tags') {
        this.details.update({ tags: newdata, dateupdated: this.date });
        this.cate.update({ tags: newdata });
      }
      else if (name === 'public') {
        this.details.update({ public: newdata, dateupdated: this.date });
      }
    }

    if (object === 'map') {
      if (name === 'latitude') {
        this.map.update({ latitude: newdata });
        this.details.update({ latitude: newdata, dateupdated: this.date });

      } else if (name === 'longitude') {
        this.map.update({ longitude: newdata });
        this.details.update({ longitude: newdata, dateupdated: this.date });

      }
    }

    if (object === 'social') {
      if (name === 'facebook') {
        this.social.update({ facebook: newdata });
      } else if (name === 'twitter') {
        this.social.update({ twitter: newdata });
      }
      else if (name === 'instagram') {
        this.social.update({ instagram: newdata });
      }
      else if (name === 'linkedin') {
        this.social.update({ linkedin: newdata });
      }
    }

    if (object === 'hours') {
      if (name === 'sundayclose') {
        this.hours.update({ sundayclose: newdata });
      } else if (name === 'sundayopen') {
        this.hours.update({ sundayopen: newdata });
      } else if (name === 'saturdayopen') {
        this.hours.update({ saturdayopen: newdata });
      } else if (name === 'saturdayclose') {
        this.hours.update({ saturdayclose: newdata });
      } else if (name === 'fridayclose') {
        this.hours.update({ fridayclose: newdata });
      } else if (name === 'fridayopen') {
        this.hours.update({ fridayopen: newdata });
      } else if (name === 'thursdayclose') {
        this.hours.update({ thursdayclose: newdata });
      } else if (name === 'thursdayopen') {
        this.hours.update({ thursdayopen: newdata });
      } else if (name === 'wednesdayclose') {
        this.hours.update({ wednesdayclose: newdata });
      } else if (name === 'wednesdayopen') {
        this.hours.update({ wednesdayopen: newdata });
      } else if (name === 'tuesdayclose') {
        this.hours.update({ tuesdayclose: newdata });
      } else if (name === 'tuesdayopen') {
        this.hours.update({ tuesdayopen: newdata });
      } else if (name === 'mondayclose') {
        this.hours.update({ mondayclose: newdata });
      } else if (name === 'mondayopen') {
        this.hours.update({ mondayopen: newdata });
      }

    }
  }

}
