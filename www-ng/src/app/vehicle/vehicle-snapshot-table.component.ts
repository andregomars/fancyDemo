import { Component, OnInit, Input } from '@angular/core';
import { VehicleSnapshot } from '../models/vehicle-snapshot'

@Component({
  selector: 'app-vehicle-snapshot-table',
  templateUrl: './vehicle-snapshot-table.component.html',
  styleUrls: ['./vehicle-snapshot-table.component.css']
})
export class VehicleSnapshotTableComponent implements OnInit {
  @Input("data")
  dataVehicleSnapshot: VehicleSnapshot

  ngOnInit() {
  }

}
