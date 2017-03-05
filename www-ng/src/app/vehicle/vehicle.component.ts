import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'
import { DataTableModule, ChartModule } from 'primeng/primeng';
import { JustgageModule } from 'angular2-justgage';

import { ProgressBarComponent } from '../shared/progressbar.component';
import { DataLocalService } from '../shared/data-local.service';
import { YAxis } from '../models/yAxis.model';

@Component({
  moduleId: module.id,
  templateUrl: 'vehicle.component.html'
})
export class VehicleComponent implements OnInit {
 vehicle: any;
 optSoc: any;
 optSpeed: any;
 lineChartData: any;
 optLineChart: any;

 dataLatestAlertList: any;
 dataLatestSnapshotList: any;
 dataVehicleStatus: any;
 
 dataSocRangeChart: any;
 optionSocRangeChart: any;
 dataEstActualDistanceChart: any;
 optionEstActualDistanceChart: any;
 dataChargingRunningStatusChart: any;
 optionChargingRunningStatusChart: any;

 constructor(
		private route: ActivatedRoute,
    private dataService: DataLocalService
 ) {
  
 }

 ngOnInit(): void {
   var vehicles = this.dataService.getFleet();
   this.vehicle = this.getVehicle(vehicles);
   this.setGaugeOptions(this.vehicle);

   this.initLatestAlertAndSnapshotList();
   this.initVehicleStatusTable();

   //initilize dual comparision charts
   this.initSocRangeChart();
   this.initEstActualDistanceChart();
   this.initChargingRunningStatusChart();

   this.lineChartData = this.dataService.getLineChart();
   this.setLineChartOptions();
   
 }

 initLatestAlertAndSnapshotList(): void {
   this.dataLatestAlertList = this.dataService.getLatestAlertsData();
   this.dataLatestSnapshotList = this.dataService.getLatestSnapshotsData();
 }

 initVehicleStatusTable(): void {
   this.dataVehicleStatus = this.dataService.getVehicleStatusData();
 }

 initSocRangeChart(): void {
   this.dataSocRangeChart = this.dataService.getSocRangeChartData();
   let leftY = new YAxis("SOC", "#4bc0c0", 0, 100);
   let rightY = new YAxis("Range", "#565656", 0, 250);
   this.optionSocRangeChart = this.getChartDualOptions(leftY, rightY);
 }

 initEstActualDistanceChart(): void {
   this.dataEstActualDistanceChart = this.dataService.getEstActualDistanceData();
   let leftY = new YAxis("EstimateDistance", "#4bc0c0", 0, 100);
   let rightY = new YAxis("ActualDistance", "#565656", 0, 250);
   this.optionEstActualDistanceChart = this.getChartDualOptions(leftY, rightY);
 }

 initChargingRunningStatusChart(): void {
   this.dataChargingRunningStatusChart = this.dataService.getChargingRunningStatusData();
   let leftY = new YAxis("ChargingStatus", "#4bc0c0", 0, 100);
   let rightY = new YAxis("RunningStatus", "#565656", 0, 250);
   this.optionChargingRunningStatusChart = this.getChartDualOptions(leftY, rightY);
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

  setLineChartOptions(): void {
    this.optLineChart = {
      animation: {
        duration: 0
      },
      hover: {
        animationDuration: 0
      },
      scales: {
        yAxes: [{
          id: 'ySOC',
          scaleLabel: {
           display: true,
           labelString: 'soc',
           fontColor: '#4bc0c0'
          },
          type: 'linear',
          position: 'left',
          ticks: {
            fontColor: '#4bc0c0',
            max: 85,
            min: 0
          }
        }, {
          id: 'yRange',
          scaleLabel: {
           display: true,
           labelString: 'Range',
           fontColor: '#565656'
          },
          type: 'linear',
          position: 'right',
          ticks: {
            fontColor: '#565656',
            max: 100,
            min: 0
          }
        }, {
          id: 'yCurrent',
          scaleLabel: {
           display: true,
           labelString: 'Current',
           fontColor: '#4286f4'
          },
          type: 'linear',
          position: 'right',
          ticks: {
            fontColor: '#4286f4',
            max: 30,
            min: 0
          }
        }, {
          id: 'yTemperature',
          scaleLabel: {
           display: true,
           labelString: 'Temperature',
           fontColor: '#f47d41'
          },
          type: 'linear',
          position: 'right',
          ticks: {
            fontColor: '#f47d41',
            max: 200,
            min: -20
          }
        }]
      }
    };
  }

  getChartDualOptions(leftY: YAxis, rightY: YAxis): any {
    return {
      animation: {
        duration: 0
      },
      hover: {
        animationDuration: 0
      },
      scales: {
        yAxes: [{
          id: 'y'+leftY.label,
          scaleLabel: {
           display: false,
           labelString: leftY.label,
           fontColor: leftY.color
          },
          type: 'linear',
          position: 'left',
          ticks: {
            fontColor: leftY.color,
            max: leftY.max,
            min: leftY.min
          }
        }, {
          id: 'y'+rightY.label,
          scaleLabel: {
           display: false,
           labelString: rightY.label,
           fontColor: rightY.color 
          },
          type: 'linear',
          position: 'right',
          ticks: {
            fontColor: rightY.color,
            max: rightY.max,
            min: rightY.min
          }
        }]
      }
    };
  }

}

