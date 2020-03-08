import { Component, OnInit } from '@angular/core';
import { TravelService } from '../shared/travel.service';
import { Travel } from '../model/travel';
import { AngularFirestore } from '@angular/fire/firestore';
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
    private fireStore: AngularFirestore,
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
      this.fireStore.doc('travels/' + id).delete();
      this.toaster.warning('Reise entfernt', 'Reise');
    }
  }

}
