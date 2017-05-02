import { Component, OnInit, Input } from '@angular/core';
import { VehicleStatus } from '../models/vehicle-status';

@Component({
  selector: 'app-vehicle-map',
  templateUrl: './vehicle-map.component.html',
  styleUrls: ['./vehicle-map.component.css']
})
export class VehicleMapComponent implements OnInit {
  @Input("items")
  statusList: Array<VehicleStatus>;

  ngOnInit() {
  }

}
