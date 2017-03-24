import { Component, OnInit } from '@angular/core';

import { UtilityService } from '../shared/utility.service';
import { DataLocalService } from '../shared/data-local.service';
import { Vehicle } from '../models/vehicle.model';

@Component({
  selector: 'app-daily-report',
  templateUrl: './daily-report.component.html',
  styleUrls: ['./daily-report.component.css']
})
export class DailyReportComponent implements OnInit {

  private months: any[];
  private vehicles: Vehicle[] = [];
  private vehiclesSelected: Vehicle[] = [];
  private monthSelected: Date;
  private vehicleLogs: any[] = [];
  
  constructor(
    private utility: UtilityService,
    private dataService: DataLocalService
  ) { }

  ngOnInit() {
    this.initVehicleButtons();
    this.initMonthButtons();
  }

  private initMonthButtons(): void {
    this.months = this.utility.getLatestMonths(12);
  }

  private initVehicleButtons(): void {
    // this.vehicles = this.dataService.getAllFleetsWithVehicles()[0].vehicles.map<string>(v => v.id);
    // this.vehicles = [new Vehicle("AZ01"), new Vehicle("AZ02")];
    this.vehicles.push(new Vehicle("AZ01"));
    this.vehicles.push(new Vehicle("AZ02"));
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
