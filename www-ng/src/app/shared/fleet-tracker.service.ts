import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { DataLocalService } from './data-local.service';
import { VehicleIdentity } from '../models/vehicle-identity';

@Injectable()
export class FleetTrackerService {

  private fid: string;
  private subject: Subject<string> = new Subject<string>();
  private vehicles: Array<any>;  

  constructor(
    private dataService: DataLocalService
  ) { 
    // this.vehicles = this.dataService.getAllVehiclesData();
  }

  setFleetIDByVehicle(vid: string): void {
    if (!this.vehicles) this.vehicles = this.dataService.getAllVehiclesData();

    this.fid = this.vehicles.find(v => v.vid === vid).fid;
    this.subject.next(this.fid);
  }

  setFleetIDByFleet(fid: string): void {
    if (!this.vehicles) this.vehicles = this.dataService.getAllVehiclesData();
    
    this.fid = fid;
    this.subject.next(fid);
  }

  getFleetID(): Observable<string> {
    return this.subject.asObservable();
  }
}
