import { Injectable } from '@angular/core';
import { Travel } from '../interface/travel';

@Injectable({
  providedIn: 'root'
})
export class TravelService {

  formData: Travel;
  constructor() { }
}
