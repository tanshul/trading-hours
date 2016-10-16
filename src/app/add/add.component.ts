import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  date: any;
  cities: Array<string>;
  companies: FirebaseListObservable<any>;
  categories: Array<string>;

  constructor(public af: AngularFire, private router: Router) {
    this.cities = ["Ba", "Labasa", "Lautoka", "Levuka", "Nadi", "Nausori", "Rakiraki", "Savusavu", "Sigatoka", "Suva", "Taveuni"];
    this.categories = ["Authorities", "Associations", "Business", "Education", "Finance", "Government", "Legal", "Media", "Non Profit", "Public Service", "Restaurants and Bars", "Retail", "Other"];
    this.companies = af.database.list('/companies');
    this.af = af;
  }

  add(form: any) {
    this.date = Date.now();
    var companyobj = {
      name: form.name,
      category: form.category,
      city: form.city,
      dateadded: this.date
    };

    var categoryobj = {
      category: form.category,
      tags: form.tags ? form.tags : ''
    };

    var hoursobj = {
      mondayopen: form.mondayopen,
      mondayclose: form.mondayclose,
      tuesdayopen: form.tuesdayopen,
      tuesdayclose: form.tuesdayclose,
      wednesdayopen: form.wednesdayopen,
      wednesdayclose: form.wednesdayclose,
      thursdayopen: form.thursdayopen,
      thursdayclose: form.thursdayclose,
      fridayopen: form.fridayopen,
      fridayclose: form.fridayclose,
      saturdayopen: form.saturdayopen,
      saturdayclose: form.saturdayclose,
      sundayopen: form.sundayopen,
      sundayclose: form.sundayclose
    };

    var detailsobj = {
      name: form.name,
      address: form.address,
      category: form.category,
      tags: form.tags ? form.tags : '',
      city: form.city,
      phone: form.phone,
      altphone: form.altphone ? form.altphone : '',
      email: form.email,
      website: form.website ? form.website : '',
      public: form.public ? form.public : '',
      latitude: form.latitude ? form.latitude : '',
      longitude: form.longitude ? form.longitude : '',
      dateadded: this.date
    }

    var mapobj = {
      address: form.address,
      latitude: form.latitude ? form.latitude : '',
      longitude: form.longitude ? form.longitude : ''
    }

    var socialobj = {
      facebook: form.facebook ? form.facebook : '',
      twiiter: form.twiiter ? form.twiiter : '',
      instagram: form.instagram ? form.instagram : '',
      linkedin: form.linkedin ? form.linkedin : '',
      email: form.email ? form.email : '',
      website: form.website ? form.website : ''
    }

    console.log(form);


    this.companies.push(companyobj).then((promise) => {
      const key = promise.key;
      const category = this.af.database.object('/category/' + key);
      const details = this.af.database.object('/details/' + key);
      const hours = this.af.database.object('/hours/' + key);
      const map = this.af.database.object('/map/' + key);
      const social = this.af.database.object('/social/' + key);

      category.set(categoryobj);
      details.set(detailsobj);
      hours.set(hoursobj);
      map.set(mapobj);
      social.set(socialobj);

      alert("Added Successfully!!");
      this.router.navigate(['/list']);

    });

    return false;
  }

}
