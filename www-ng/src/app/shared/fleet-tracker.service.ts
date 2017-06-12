import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { CookieService } from 'ngx-cookie';

import { DataService } from './data.service';
import { VehicleIdentity } from '../models/vehicle-identity';

@Injectable()
export class FleetTrackerService {

  fname: string;
  vehicles: Array<VehicleIdentity>;  
  private subject: Subject<string> = new Subject<string>();

  constructor(
    private cookie: CookieService,
    private dataService: DataService
  ) { 
  }

  setFleetIDByVehicle(vname: string): void {
    var userLoginName = this.cookie.get('ioc_loggedin');
    // this.dataService.getAllVehiclesData$()
    this.dataService.getVehicleIdentitiesByLoginName$(userLoginName)
      .subscribe((data: Array<VehicleIdentity>) => {
        this.vehicles = data;
        var vehicle = data.find(v => v.vname === vname);
        this.fname = vehicle ? vehicle.fname : "";
        this.subject.next(this.fname);
      });
  }

  setFleetIDByFleet(fname: string): void {
    var userLoginName = this.cookie.get('ioc_loggedin');
    // this.dataService.getAllVehiclesData$()
    this.dataService.getVehicleIdentitiesByLoginName$(userLoginName)
      .subscribe((data: Array<VehicleIdentity>) => {
        this.vehicles = data;
        this.fname = fname;
        this.subject.next(fname);
      });
  }

  getFleetID(): Observable<string> {
    return this.subject.asObservable();
  }
}
