import { Injectable } from '@angular/core';
import { Travel } from '../model/travel';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class TravelService {

  formData: Travel;
  constructor(private fireStore: AngularFirestore
  ) { }

  getTravelsFromDb() {
    return this.fireStore.collection('travels').snapshotChanges();
  }
}
