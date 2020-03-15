import { Injectable } from '@angular/core';
import { Icountry } from '../interface/icountry';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  countryForm: Icountry;
  
  constructor(
    private fireStore: AngularFirestore
  ) { }

  getReasonFromDb() {
    return this.fireStore.collection('country').snapshotChanges();
  }

  createOrUpdateCountry(country: Icountry) {
    const data = country;
    delete data.id;
    if (country.id !== null && country.id !== undefined) {
      this.fireStore.doc('country/' + country.id).update(data);
    } else {
      this.fireStore.collection('country').add(data);
    }

  }

  deleteCountry(id: string) {
    this.fireStore.doc('country/' + id).delete();
  }
}
