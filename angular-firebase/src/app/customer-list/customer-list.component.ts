import { Component, OnInit } from '@angular/core';
import { ICustomer } from '../interface/icustomer';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from '../shared/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  customerList: ICustomer[];

  constructor(
    public service: CustomerService,
    private toaster: ToastrService
  ) { }

  ngOnInit(): void {
    this.getCustomer();
  }

  getCustomer() {
    this.service.getCustomerFromDb().subscribe(actionArray => {
      this.customerList = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data() as ICustomer
        };
      });
    });
  }

  onEdit(customer: ICustomer) {
    console.log('List', customer);
    this.service.customerForm = Object.assign({}, customer);
  }

  onDelete(id: string) {
    if (confirm('Bist du sicher?')) {
      this.service.deleteCustomer(id);
      this.toaster.warning('Kunde entfernt', 'Kunde');
    }
  }

}
