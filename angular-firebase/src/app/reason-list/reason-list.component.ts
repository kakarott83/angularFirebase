import { Component, OnInit } from '@angular/core';
import { ReasonService } from '../shared/reason.service';
import { ToastrService } from 'ngx-toastr';
import { Ireason } from '../interface/ireason';

@Component({
  selector: 'app-reason-list',
  templateUrl: './reason-list.component.html',
  styleUrls: ['./reason-list.component.css']
})
export class ReasonListComponent implements OnInit {

  reasonList: Ireason[];

  constructor(
    public service: ReasonService,
    private toaster: ToastrService) { }

  ngOnInit() {
    this.getTravels();
  }

  getTravels() {
    this.service.getReasonFromDb().subscribe(actionArray => {
      this.reasonList = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data() as Ireason
        };
      });
    });
  }

  onEdit(reason: Ireason) {
    console.log('List', reason);
    this.service.reasonForm = Object.assign({}, reason);
  }

  onDelete(id: string) {
    if (confirm('Bist du sicher?')) {
      this.service.deleteReason(id);
      this.toaster.warning('Grund entfernt', 'Grund');
    }
  }

}
