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

  getCardBgImgClass(vtype: string, color: string): string {
    if (vtype == null || vtype.length === 0 )
      vtype = "bus";
    return `bg-${vtype.toLowerCase()}-${color}`;
  }

}

