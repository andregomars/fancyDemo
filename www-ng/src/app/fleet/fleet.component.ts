import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import * as Rx from 'rxjs/Rx';

import { DataLocalService } from '../shared/data-local.service';
import { FleetTrackerService } from '../shared/fleet-tracker.service';
import { VehicleStatus } from '../models/vehicle-status';

@Component({
  moduleId: module.id,
  templateUrl: 'fleet.component.html'
})
export class FleetComponent implements OnInit {
	viewComponent:string = "table";
  data: any;
  fid: string;

  constructor (
    private route: ActivatedRoute,
    private fleetTracker: FleetTrackerService,
    private dataService: DataLocalService
  ) {}
  
  ngOnInit() {
    this.getFleet();
  }

 getFleet(): void {
    this.route.params
      .switchMap((params: Params) =>  
        { 
          this.fid = params["fid"];
          return this.dataService.getVehiclesStatusByFleet$(this.fid);
        }
      )
      .subscribe((vehcilesStatus: Array<VehicleStatus>) => { 
        this.data = vehcilesStatus;
        this.fleetTracker.setFleetIDByFleet(this.fid);
      });
 }

//  getFleet(): void {
//     this.route.params
//       .switchMap((params: Params) => Rx.Observable.create(ob => 
//         { 
//           this.fid = params["fid"];
//           ob.next(this.dataService.getVehiclesStatusByFleet(this.fid));
//         }
//       ))
//       .subscribe((vehcilesStatus: Array<VehicleStatus>) => { 
//         this.data = vehcilesStatus;
//         this.fleetTracker.setFleetIDByFleet(this.fid);
//       });
//  }

  toggleView(view: string) {
    this.viewComponent = view;
  }

  isShown(view: string) {
    return this.viewComponent === view;
  }
}

