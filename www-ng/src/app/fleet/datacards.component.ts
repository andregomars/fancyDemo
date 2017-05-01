import { Component, Input } from '@angular/core';
import { VehicleStatus } from '../models/vehicle-status';

@Component({
  selector: 'datacards',
  moduleId: module.id,
  templateUrl: 'datacards.component.html',
  styleUrls: ['datacards.component.css']
})
export class DataCardsComponent {
    @Input() 
    items: Array<VehicleStatus>;

}

