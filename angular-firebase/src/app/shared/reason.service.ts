import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Ireason } from '../interface/ireason';

@Injectable({
  providedIn: 'root'
})
export class ReasonService {

  reasonForm: Ireason;
  
  constructor(
    private fireStore: AngularFirestore
  ) { }

  getReasonFromDb() {
    return this.fireStore.collection('reason').snapshotChanges();
  }

  createOrUpdateReason(reason: Ireason) {
    const data = reason;
    delete data.id;
    if (reason.id !== null && reason.id !== undefined) {
      this.fireStore.doc('reason/' + reason.id).update(data);
    } else {
      this.fireStore.collection('reason').add(data);
    }

  }

  deleteReason(id: string) {
    this.fireStore.doc('reason/' + id).delete();
  }
  
}
