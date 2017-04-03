import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import * as Rx from 'rxjs/Rx';

import { UtilityService } from '../shared/utility.service';
import { DataLocalService } from '../shared/data-local.service';
import { Vehicle } from '../models/vehicle.model';


@Component({
  selector: 'app-daily-report',
  templateUrl: './daily-report.component.html',
  styleUrls: ['./daily-report.component.css']
})
export class DailyReportComponent implements OnInit {

  fleetID: string;
  private vehiclesSelected: Vehicle[] = [];
  months: any[];
  vehicles: Vehicle[] = [];
  monthSelected: Date;
  vehicleLogs: any[] = [];
  
  constructor(
    private utility: UtilityService,
    private route: ActivatedRoute,
    private dataService: DataLocalService
  ) { }

  ngOnInit() {
    this.loadFleet();
    this.initVehicleButtons();
    this.initMonthButtons();
  }

  private loadFleet(): void {
    this.route.params
       .switchMap((params: Params) => Rx.Observable.create(ob=>ob.next(params["fid"])))
       .subscribe((fid: string) => this.fleetID = fid);
  }

  private initMonthButtons(): void {
    this.months = this.utility.getLatestMonths(12);
  }

  private initVehicleButtons(): void {
    let vehicles = this.dataService.getVehiclesIdentityByFleet(this.fleetID);
    this.vehicles = vehicles.map(v => new Vehicle(v.vid));
  }

  private loadVehicleLogs(): void {
    if (this.vehiclesSelected.length === 0 || !this.monthSelected) 
      this.vehicleLogs = [];
    else
      this.vehicleLogs = this.dataService.getLogsInMonthOfDateByVehicles(this.vehiclesSelected, this.monthSelected);
  }

  private selectVehicle(vehicle: Vehicle): void {
    let vIndex = this.vehiclesSelected.findIndex(v => v.id === vehicle.id);
    if(vIndex < 0) {
      this.vehiclesSelected.push(vehicle);
    }
    else {
      this.vehiclesSelected.splice(vIndex, 1);
    }
    this.loadVehicleLogs();
  }

  private selectMonth(month: any): void {
    this.monthSelected = month.value;
    this.loadVehicleLogs();
  }
}
