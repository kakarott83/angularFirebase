import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../shared/customer.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { CountryService } from '../shared/country.service';
import { Icountry } from '../interface/icountry';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  countrySelect: string [];
  countryList: Icountry[];


  constructor(
    public service: CustomerService,
    public countryService: CountryService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.resetForm();
    this.getCountryList();
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }
    this.service.customerForm = {
      id: null,
      name: '',
      city: '',
      country: ''
    };
  }

  onSubmit(form: NgForm) {
    console.log('Customer', form.value.id);
    this.service.createOrUpdateCustomer(form.value);
    this.resetForm(form);
    this.toast.success('Speichern erfolgreich', 'Land');
  }

  getCountryList() {
    this.countryService.getCountryFromDb().subscribe(actionArray => {
      this.countryList = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data() as Icountry
        };
      });
    });
  }

}
