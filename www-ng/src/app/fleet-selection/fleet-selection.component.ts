import { Component, OnInit } from '@angular/core';
import { DataLocalService } from '../shared/data-local.service';
import { VehicleIdentity } from '../models/vehicle-identity';

@Component({
  selector: 'app-fleet-selection',
  templateUrl: './fleet-selection.component.html',
  styleUrls: ['./fleet-selection.component.css']
})
export class FleetSelectionComponent implements OnInit {

  fleets: string[];

  constructor(
    private dataService: DataLocalService
  ) { }

  ngOnInit() {
    this.fleets = 
      this.dataService.getAllVehiclesData().map(
        el => el.fid).filter((el, i, arr) => arr.indexOf(el) === i);
  }
}
