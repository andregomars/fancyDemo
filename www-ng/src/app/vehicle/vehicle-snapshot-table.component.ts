import { Component, OnInit, Input } from '@angular/core';
import { VehicleStatus } from '../models/vehicle-status'

@Component({
  selector: 'app-vehicle-snapshot-table',
  templateUrl: './vehicle-snapshot-table.component.html',
  styleUrls: ['./vehicle-snapshot-table.component.css']
})
export class VehicleSnapshotTableComponent implements OnInit {
  @Input("data")
  dataVehicleStatus: VehicleStatus

  ngOnInit() {
  }

}
