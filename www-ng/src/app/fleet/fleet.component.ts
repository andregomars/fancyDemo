import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import * as Rx from 'rxjs/Rx';

import { DataService } from '../shared/data.service';
import { FleetTrackerService } from '../shared/fleet-tracker.service';
import { VehicleStatus } from '../models/vehicle-status';

@Component({
  moduleId: module.id,
  templateUrl: 'fleet.component.html'
})
export class FleetComponent implements OnInit {
  // layout of "table" or "cards" by default
	viewComponent:string = "table";
  data: Array<VehicleStatus>;
  fname: string;

  constructor (
    private route: ActivatedRoute,
    private fleetTracker: FleetTrackerService,
    private dataService: DataService
  ) {}
  
  ngOnInit() {
    this.getFleet();
  }

 getFleet(): void {
    this.route.params
      .switchMap((params: Params) =>  
        { 
          this.fname = params["fname"];
          return this.dataService.getVehiclesStatusByFleet$(this.fname);
        }
      )
      .subscribe((vehcilesStatus: Array<VehicleStatus>) => { 
        this.data = vehcilesStatus;
        this.fleetTracker.setFleetIDByFleet(this.fname);
      });
 }

  // toggleView(view: string) {
  //   console.log('toggled view is: '+view);
  //   this.viewComponent = view;
  // }

  toggleView() {
    this.viewComponent = this.viewComponent === 'table' ? 'cards' : 'table';
  }

  isShown(view: string) {
    return this.viewComponent === view;
  }
}

