import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { DataService } from './data.service';
import { VehicleIdentity } from '../models/vehicle-identity';

@Injectable()
export class FleetTrackerService {

  private fname: string;
  private subject: Subject<string> = new Subject<string>();
  private vehicles: Array<any>;  

  constructor(
    private dataService: DataService
  ) { 
  }

  setFleetIDByVehicle(vname: string): void {
    this.vehicles = this.dataService.getAllVehiclesData();
    if (!this.vehicles) return;

    var vehicle = this.vehicles.find(v => v.vname === vname);
    this.fname = vehicle ? vehicle.fname : "";
    this.subject.next(this.fname);
  }

  setFleetIDByFleet(fname: string): void {
    this.vehicles = this.dataService.getAllVehiclesData();
    if (!this.vehicles) return;

    this.fname = fname;
    this.subject.next(fname);
  }

  getFleetID(): Observable<string> {
    return this.subject.asObservable();
  }
}
