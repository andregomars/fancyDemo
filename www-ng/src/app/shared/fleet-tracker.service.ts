import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { DataService } from './data.service';
import { VehicleIdentity } from '../models/vehicle-identity';

@Injectable()
export class FleetTrackerService {

  fname: string;
  vehicles: Array<VehicleIdentity>;  
  private subject: Subject<string> = new Subject<string>();

  constructor(
    private dataService: DataService
  ) { 
  }

  setFleetIDByVehicle(vname: string): void {
    // this.vehicles = this.dataService.getAllVehiclesData();
    // if (!this.vehicles) return;

    // var vehicle = this.vehicles.find(v => v.vname === vname);
    // this.fname = vehicle ? vehicle.fname : "";
    // this.subject.next(this.fname);
    this.dataService.getAllVehiclesData$()
      .subscribe((data: Array<VehicleIdentity>) => {
        this.vehicles = data;
        var vehicle = data.find(v => v.vname === vname);
        this.fname = vehicle ? vehicle.fname : "";
        this.subject.next(this.fname);
      });
  }

  setFleetIDByFleet(fname: string): void {
    // this.vehicles = this.dataService.getAllVehiclesData();
    // if (!this.vehicles) return;

    // console.log('fname refreshed: '+fname);
    // this.fname = fname;
    // this.subject.next(fname);
    this.dataService.getAllVehiclesData$()
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
