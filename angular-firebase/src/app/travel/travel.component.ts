import { Component, OnInit, Injectable } from '@angular/core';
import { TravelService } from '../shared/travel.service';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { NgbDate, NgbCalendar, NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { from } from 'rxjs';
import { CustomerService } from '../shared/customer.service';
import { ReasonService } from '../shared/reason.service';
import { ICustomer } from '../interface/icustomer';
import { Ireason } from '../interface/ireason';

import { formatDistance, subDays } from 'date-fns'
import addDays from 'date-fns/addDays'


@Component({
  selector: 'app-travel',
  templateUrl: './travel.component.html',
  styleUrls: ['./travel.component.css']
})
export class TravelComponent implements OnInit {

  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate;
  startDate;
  toDate: NgbDate | null = null;
  endDate: Date
  fromTime: NgbTimeStruct = {hour: 13, minute: 30, second: 0};
  toTime: NgbTimeStruct = {hour: 13, minute: 30, second: 0};
  hourStep = 1;
  minuteStep = 15;
  customerList: ICustomer[];
  reasonList: Ireason[];

  constructor(
    private calendar: NgbCalendar,
    public customerService: CustomerService,
    public reasonService: ReasonService,
    public service: TravelService,
    private fireStore: AngularFirestore,
    private toast: ToastrService) {
      this.fromDate = calendar.getNext(calendar.getToday(), 'd', -2);
      this.startDate = new Date(this.fromDate.year, this.fromDate.month-1, this.fromDate.day);
      this.toDate = calendar.getNext(calendar.getToday(), 'd', 1);
      this.endDate = new Date(this.toDate.year, this.toDate.month-1, this.toDate.day);

  }

  ngOnInit() {
    this.resetForm();
    this.getCustomerList();
    this.getReasonList();
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }
    this.service.formData = {
      id: null,
      fromDate: '',
      toDate: '',
      fromTime: '',
      toTime: '',
      customer: '',
      userId: '',
      reason: '',
      start: '',
      end: ''
    };
  }

  onSubmit(form: NgForm) {
    this.service.createOrUpdateTravel(form.value);
    this.resetForm(form);
    this.toast.success('Speichern erfolgreich', 'Reise');
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
      this.startDate = new Date(this.fromDate.year, this.fromDate.month-1, this.fromDate.day);
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
      this.endDate = new Date(this.toDate.year, this.toDate.month-1, this.toDate.day);
    } else {
      this.toDate = null;
      this.fromDate = date;
      this.startDate = new Date(this.fromDate.year, this.fromDate.month-1, this.fromDate.day);
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }

  getCustomerList() {
    this.customerService.getCustomerFromDb().subscribe(actionArray => {
      this.customerList = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data() as ICustomer
        };
      });
    });
  }

  getReasonList() {
    this.reasonService.getReasonFromDb().subscribe(actionArray => {
      this.reasonList = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data() as Ireason
        }
      })
    })
  }
}
