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

  createOrUpdateTravel(travel: Travel) {
    const data = travel;
    delete data.id;
    if (travel.id === null) {
      this.fireStore.collection('travels').add(data);
    } else {
      this.fireStore.doc('travels/' + travel.id).update(data);
    }
  }

  deleteTravel(id: string) {
    this.fireStore.doc('travels/' + id).delete();
  }
}
