import { Injectable } from '@angular/core';
import { ICustomer } from '../interface/icustomer';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  customerForm: ICustomer;

  constructor(
    private fireStore: AngularFirestore
  ) { }

  getCustomerFromDb() {
    return this.fireStore.collection('customer').snapshotChanges();
  }

  createOrUpdateCustomer(customer: ICustomer) {
    const id = customer.id;
    const data = customer;
    delete data.id;
    if (id !== null) {
      this.fireStore.doc('customer/' + id).update(data);
    } else {
      this.fireStore.collection('customer').add(data);
    }

  }

  deleteCustomer(id: string) {
    this.fireStore.doc('customer/' + id).delete();
  }
}
