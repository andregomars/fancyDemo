import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'
import { ChartModule } from 'primeng/primeng';
import { JustgageModule } from 'angular2-justgage';

import { ProgressBarComponent } from '../shared/progressbar.component';
import { DataLocalService } from '../shared/data-local.service';

@Component({
  moduleId: module.id,
  templateUrl: 'vehicle.component.html'
})
export class VehicleComponent implements OnInit {
 vehicle: any;
 optSoc: any;
 optSpeed: any;
 lineChartData: any;

 constructor(
		private route: ActivatedRoute,
    private dataService: DataLocalService
 ) {
  this.lineChartData = this.getLineChartData();
 }

 ngOnInit(): void {
   var vehicles = this.getData();
   this.vehicle = this.getVehicle(vehicles);
   this.setGaugeOptions(this.vehicle);

   
 }

 getVehicle(vehicles): any {
    if (!vehicles || vehicles.length === 0) return;
    var vid = this.route.snapshot.params["vid"]
    var vFiltered = vehicles.filter( function(item) {
      return item.vid === vid;
    });
    if (vFiltered.length > 0) 
      return vFiltered[0];
    else
      return null;
  }

  setGaugeOptions(vehicle: any): void {
    this.optSoc = {
      id: "gauge-Soc",
      value: vehicle.soc,
      min: 0,
      max: 100,
      title: "SOC",
      symbol: "",
      decimals: 0,
      startAnimationTime: 0,
      refreshAnimationTime: 0,
      pointer: false,
      levelColors: ["#a9d70b", "#a9d70b", "#a9d70b"]
    };
    this.optSpeed = {
      id: "gauge-Speed",
      value: vehicle.speed,
      min: 0,
      max: 140,
      title: "MPH",
      symbol: "",
      decimals: 0,
      startAnimationTime: 0,
      refreshAnimationTime: 0,
      pointer: false,
      levelColors: ["#a9d70b", "#a9d70b", "#a9d70b"]
    };
  }

  getData(): any {
    return this.dataService.getFleet();
  }

  getLineChartData(): any {
    return this.dataService.getLineChart();
  }
}

