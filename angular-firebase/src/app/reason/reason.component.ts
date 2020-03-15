import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ReasonService } from '../shared/reason.service';
import { ToastrService } from 'ngx-toastr';
import { Ireason } from '../interface/ireason';

@Component({
  selector: 'app-reason',
  templateUrl: './reason.component.html',
  styleUrls: ['./reason.component.css']
})
export class ReasonComponent implements OnInit {

  constructor(
    private service: ReasonService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }
    this.service.reasonForm = {
      id: null,
      reason: ''
    };
  }

  onSubmit(form: NgForm) {
    this.service.createOrUpdateReason(form.value);
    this.resetForm(form);
    this.toast.success('Speichern erfolgreich', 'Reise');
  }

}
