import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DataService } from '../shared/data.service';
import { VehicleIdentity } from '../models/vehicle-identity';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { FleetIdentity } from '../models/fleet-identity';

@Component({
  selector: 'app-fleet-selection',
  templateUrl: './fleet-selection.component.html',
  styleUrls: ['./fleet-selection.component.css'],
})
export class FleetSelectionComponent implements OnInit {

  fleets: string[];
  fleets$: Observable<Array<FleetIdentity>>;

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.fleets$ = this.dataService.getAllFleetID$();
  }
}
