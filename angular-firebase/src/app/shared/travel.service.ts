import { Injectable } from '@angular/core';
import { Itravel } from '../interface/itravel';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class TravelService {

  formData: Itravel;
  constructor(private fireStore: AngularFirestore
  ) { }

  getTravelsFromDb() {
    return this.fireStore.collection('travels').snapshotChanges();
  }

  createOrUpdateTravel(travel: Itravel) {
    const data = travel;
    delete data.id;
    if (travel.id !== null) {
      this.fireStore.doc('travels/' + travel.id).update(data);
    } else {
      this.fireStore.collection('travels').add(data);
    }
  }

  deleteTravel(id: string) {
    this.fireStore.doc('travels/' + id).delete();
  }
}
