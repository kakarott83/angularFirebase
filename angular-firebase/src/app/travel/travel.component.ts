import { Component, OnInit } from '@angular/core';
import { TravelService } from '../shared/travel.service';
import { Travel } from '../interface/travel';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-travel',
  templateUrl: './travel.component.html',
  styleUrls: ['./travel.component.css']
})
export class TravelComponent implements OnInit {

  constructor(
    public service: TravelService,
    private fireStore: AngularFirestore,
    private toast: ToastrService) {

  }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }
    this.service.formData = {
      id: null,
      start: '',
      end: '',
      customer: '',
      userId: '',
      reason: ''
    };
  }

  onSubmit(form: NgForm) {
    const data = form.value;
    this.fireStore.collection('travels').add(data);
    console.log('test');
    this.resetForm(form);
    this.toast.success('Speichern erfolgreich', 'Reise');
  }
}
