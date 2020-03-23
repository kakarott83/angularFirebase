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

  getCountryFromDb() {
    return this.fireStore.collection('country').snapshotChanges();
  }

  createOrUpdateCountry(country: Icountry) {
    const id = country.id
    const data = country;
    delete data.id;
    if (id !== null) {
      this.fireStore.doc('country/' + id).update(data);
    } else {
      this.fireStore.collection('country').add(data);
    }

  }

  deleteCountry(id: string) {
    this.fireStore.doc('country/' + id).delete();
  }
}
