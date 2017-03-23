import { Component, OnInit } from '@angular/core';

import { UtilityService } from '../shared/utility.service';
import { DataLocalService } from '../shared/data-local.service';

@Component({
  selector: 'app-daily-report',
  templateUrl: './daily-report.component.html',
  styleUrls: ['./daily-report.component.css']
})
export class DailyReportComponent implements OnInit {

  private months: any[];
  private vehicles: string[];
  private vehiclesSelected: string[] = [];
  
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
    this.vehicles = ["AZ01", "AZ02"];
  }

  private selectVehicle(vehicle: any): void {
    let vIndex = this.vehiclesSelected.findIndex(v => v === vehicle);
    if(vIndex < 0) {
      this.vehiclesSelected.push(vehicle);
    }
    else {
      this.vehiclesSelected.splice(vIndex, 1);
    }

    console.log(this.vehiclesSelected);
  }

  private selectMonth(month: any): void {
    console.log(month);
  }

}
