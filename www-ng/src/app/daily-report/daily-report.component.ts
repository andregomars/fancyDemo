import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import * as Rx from 'rxjs/Rx';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';

import { UtilityService } from '../shared/utility.service';
import { DataService } from '../shared/data.service';
import { Vehicle } from '../models/vehicle.model';
import { VehicleIdentity } from '../models/vehicle-identity';
import { VehicleDailyFile } from '../models/vehicle-daily-file';
import { FleetTrackerService } from '../shared/fleet-tracker.service';


@Component({
  selector: 'app-daily-report',
  templateUrl: './daily-report.component.html',
  styleUrls: ['./daily-report.component.css']
})
export class DailyReportComponent implements OnInit {

  fleetID: string;
  private vehiclesSelected: Vehicle[] = [];
  thisYear: number = new Date().getFullYear();
  selectedYear: number;
  years: number[];
  months: any[];
  vehicles: Vehicle[] = [];
  monthSelected: Date;
  // vehicleLogs: any[] = [];
  vehicleLogs: VehicleDailyFile[] = new Array<VehicleDailyFile>();
  
  constructor(
    private utility: UtilityService,
    private route: ActivatedRoute,
    private dataService: DataService,
    private fleetTracker: FleetTrackerService
  ) { }

  ngOnInit() {
    this.initYearsSelection();
    this.initMonthButtons();

    this.loadFleet();
  }

  private loadFleet(): void {
    this.route.params
      .switchMap((params: Params) => Rx.Observable.of(params["fname"]))
      .subscribe((fname: string) => { 
        this.fleetID = fname;
        this.fleetTracker.setFleetIDByFleet(fname);

        this.initData();
      });
  }

  private initData() {
    this.dataService.getVehiclesStatusByFleet$(this.fleetID)
      .subscribe((data: Array<VehicleIdentity>) => {
        //init data of vehicle buttons
        this.vehicles = data.map(v => new Vehicle(v.vname));
        this.vehiclesSelected = JSON.parse(JSON.stringify(this.vehicles));
        this.loadVehicleLogs();
      });
  }

  private initYearsSelection(): void {
    //load years from 2017
    var n = this.thisYear - 2016;
    n = n < 1 ? 1 : n;
    this.years = new Array(n).fill(this.thisYear).map((x, i)=>x-i);
    this.selectedYear = this.thisYear;
  }

  private initMonthButtons(): void {
    this.months = this.utility.getMonthsByYear(this.thisYear);
    this.monthSelected = moment().startOf('month').toDate();
  }

  onSelect(year: number): void {
    this.months = this.utility.getMonthsByYear(year);
  }

  private loadVehicleLogs(): void {
   if (this.vehiclesSelected.length === 0 || !this.monthSelected) 
      this.vehicleLogs = [];
    else {
      // this.vehicleLogs = this.dataService.getLogsInMonthOfDateByVehicles(this.vehiclesSelected, this.monthSelected);
      var vnames = this.vehiclesSelected.map(r => r.id).toString();
      var beginDate = moment(this.monthSelected).startOf('month').toDate();
      var endDate = moment(this.monthSelected).endOf('month').startOf('day').toDate();

      this.dataService.getVehicleDailyFileList$(vnames, beginDate, endDate)
        .subscribe((data: VehicleDailyFile[]) => {
          this.vehicleLogs = data;
        });
    }
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

  download($fileId: string): void {
    console.log($fileId);
    this.dataService.getVehicleDailyFileStreamUrl$(+$fileId)
      .subscribe((url: string) => {
        console.log(url);
        window.location.assign(url);
      });
  }
}
