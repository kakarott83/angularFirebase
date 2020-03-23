import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { CountryService } from '../shared/country.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {

  constructor(
    public service: CountryService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }
    this.service.countryForm = {
      id: null,
      name: '',
      rate: 0,
      rateHalf: 0
    };
  }

  onSubmit(form: NgForm) {
    console.log('Country', form.value);
    this.service.createOrUpdateCountry(form.value);
    this.resetForm(form);
    this.toast.success('Speichern erfolgreich', 'Land');
  }

}
