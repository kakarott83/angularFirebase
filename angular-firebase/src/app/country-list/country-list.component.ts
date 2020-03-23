import { Component, OnInit } from '@angular/core';
import { Icountry } from '../interface/icountry';
import { CountryService } from '../shared/country.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css']
})
export class CountryListComponent implements OnInit {

  countryList: Icountry[];

  constructor(
    public service: CountryService,
    private toaster: ToastrService) { }

  ngOnInit() {
    this.getCountry();
  }

  getCountry() {
    this.service.getCountryFromDb().subscribe(actionArray => {
      this.countryList = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data() as Icountry
        };
      });
    });
  }

  onEdit(country: Icountry) {
    console.log('List', country);
    this.service.countryForm = Object.assign({}, country);
  }

  onDelete(id: string) {
    if (confirm('Bist du sicher?')) {
      this.service.deleteCountry(id);
      this.toaster.warning('Land entfernt', 'Land');
    }
  }

}
