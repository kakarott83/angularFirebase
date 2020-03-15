import { Component, OnInit } from '@angular/core';
import { TravelService } from '../shared/travel.service';
import { Travel } from '../model/travel';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-travel-list',
  templateUrl: './travel-list.component.html',
  styleUrls: ['./travel-list.component.css']
})
export class TravelListComponent implements OnInit {

  travelList: Travel[];
  constructor(
    public service: TravelService,
    private toaster: ToastrService) { }

  ngOnInit() {
    this.getTravels();
  }

  getTravels() {
    this.service.getTravelsFromDb().subscribe(actionArray => {
      this.travelList = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data() as Travel
        };
      });
    });
  }

  onEdit(travel: Travel) {
    this.service.formData = Object.assign({}, travel);
  }

  onDelete(id: string) {
    if (confirm('Bist du sicher?')) {
      this.service.deleteTravel(id);
      this.toaster.warning('Reise entfernt', 'Reise');
    }
  }

}
