import { Component, OnInit, ElementRef, ViewChild } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'
import { DataTableModule, ChartModule, UIChart } from 'primeng/primeng';
import { IMyOptions, IMyDateModel } from 'mydatepicker';
import * as Rx from 'rxjs/Rx';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';
let jsPDF = require("jspdf");
let html2canvas = require("html2canvas");

import { DataService } from '../shared/data.service';
import { VehicleIdentity } from '../models/vehicle-identity';
import { YAxis } from '../models/yAxis.model';
import { FleetTrackerService } from '../shared/fleet-tracker.service';
import { VehicleStatus } from '../models/vehicle-status'
import { VehicleSnapshot } from '../models/vehicle-snapshot'
import { VehicleAlert } from '../models/vehicle-alert'

@Component({
  moduleId: module.id,
  templateUrl: 'vehicle.component.html',
  styleUrls: [ 'vehicle.component.css' ]
})
export class VehicleComponent implements OnInit {
 
 vehicle: VehicleStatus = this.getDefaultVehicleStatus();  
 vehicleSnapshots: Array<VehicleSnapshot>;
 vehicleSnapshotsWholeDay: Array<VehicleSnapshot>;
 vehicleSnapshotsWholeDay$: Observable<Array<VehicleSnapshot>>;
 vehicleName: string;
//selectedDate: Date = moment().startOf('day').toDate(); 
 selectedDate: Date = new Date(2017,4,3);  //test only

 recentStatusList: Array<VehicleStatus>;
 recentAlertList: Array<VehicleAlert>;
 optionGaugeSOC: any;
 optionGaugeSpeed: any;

//  dataLatestAlertList: any;
//  dataLatestSnapshotList: any;
 dataVehicleStatus: any;
 
 optionDatePicker: IMyOptions;

 optionSocRangeChart: any;
 optionEstActualDistanceChart: any;
 optionChargingRunningStatusChart: any;
 optionComplexChart: any;

 @ViewChild("divDualCharts")
 divDualCharts: ElementRef;
 
 @ViewChild("datePicker")
 datePicker: UIChart;

 @ViewChild("chartSocRange")
 chartSocRange: UIChart
 @ViewChild("chartEstActualDistance")
 chartEstActualDistance: UIChart;
 @ViewChild("chartChargingRunningStatus")
 chartChargingRunningStatus: UIChart;

 @ViewChild("chartComplex")
 chartComplex: UIChart;


 constructor(
		private route: ActivatedRoute,
    private dataService: DataService,
    private fleetTracker: FleetTrackerService
 ) { }

 ngOnInit(): void {
   this.getVehicleStatus();
  //  this.getRecentVehicleStatusList();
   this.getVehicleSnapshot();
  //  this.getVehicleSnapshotWholeDay();
   this.getRecentVehicleAlertList();
  
   this.setGaugeOptions();
  //  this.initLatestAlertAndSnapshotList();
  //  this.initVehicleStatusTable();

   this.initDatePicker();

   //initialize dual charts
   this.initSocRangeChart();
   this.initEstActualDistanceChart();
   this.initChargingRunningStatusChart();
   this.initDualChartsData();
   
   //initialize complext chart
   this.initComplexChart();


 }

 initDualChartsData(): void {
   this.route.params
      .switchMap((params: Params) => Rx.Observable.of(params["vname"]))
      .subscribe(vname => {
        this.vehicleName = vname;
        this.loadDualChartsData();
      });
 }

 initComplexChartData(): void {
   this.route.params
      .switchMap((params: Params) => Rx.Observable.of(params["vname"]))
      .subscribe(vname => {
        this.vehicleName = vname;
        this.loadComplexChartData();
      });
 }

 getVehicleStatus(): void {
    this.route.params
      .switchMap((params: Params) => 
        this.dataService.getVehicleStatus$(params["vname"]))
      .subscribe((vStatus: VehicleStatus) => {  
        this.vehicle = vStatus ? vStatus : this.getDefaultVehicleStatus();
        this.vehicleName = vStatus ? vStatus.vname : null;
        this.fleetTracker.setFleetIDByVehicle(this.vehicle.vname);
        this.loadComplexChartData();
      });
 }

 getVehicleSnapshot(): void {
    this.route.params
      .switchMap((params: Params) => 
        this.dataService.getVehicleSnapshot$(params["vname"]))
      .subscribe((vSnapshots: Array<VehicleSnapshot>) => { 
        this.vehicleSnapshots = vSnapshots;
      });
 }

//  getRecentVehicleStatusList(): void {
//    this.route.params
//     .switchMap((params: Params) =>
//       this.dataService.getRecentVehicleStatusList$(params["vname"]))
//     .subscribe((vStatusList: Array<VehicleStatus>) => {
//       this.recentStatusList = vStatusList;
//     });
//  }

 getRecentVehicleAlertList(): void {
   this.route.params
    .switchMap((params: Params) =>
      this.dataService.getRecentVehicleAlertList$(params["vname"]))
    .subscribe((vAlertList: Array<VehicleAlert>) => {
      this.recentAlertList = vAlertList;
    });
 }


 getDefaultVehicleStatus(): VehicleStatus {
  return new VehicleStatus(0, '', 0, '', 34.134330, 117.928273, 0, 0, 0, 0, 
      0, 0, -40, -40, 0, 0, new Date());
 }

 initDatePicker(): void {
    this.optionDatePicker = {
            dateFormat: "mm/dd/yyyy",
            width: "200px",
            height: "23px",
            editableDateField: false,
            openSelectorOnInputClick: true,
            selectionTxtFontSize: "12px"
    }
 } 

//  initLatestAlertAndSnapshotList(): void {
//    this.dataLatestAlertList = this.dataService.getLatestAlertsData();
//  }

//  initVehicleStatusTable(): void {
//    this.dataVehicleStatus = this.dataService.getVehicleStatusData();
//  }

 initSocRangeChart(): void {
   let leftY = new YAxis("SOC", "#4bc0c0", 0, 100);
   let rightY = new YAxis("kWh", "#565656", 0, 600);
   this.optionSocRangeChart = this.getChartOptions(leftY, rightY);
 }

 initEstActualDistanceChart(): void {
   let leftY = new YAxis("Range", "#4bc0c0", 0, 300);
   let rightY = new YAxis("ActualDistance", "#565656", 0, 250);
   this.optionEstActualDistanceChart = this.getChartOptions(leftY, rightY);
 }

 initChargingRunningStatusChart(): void {
   let leftY = new YAxis("ChargingStatus", "#4bc0c0", 0, 1);
   let rightY = new YAxis("RunningStatus", "#565656", 0, 800);
   this.optionChargingRunningStatusChart = this.getChartOptions(leftY, rightY);
 }

  setGaugeOptions(): void {
    this.optionGaugeSOC = {
      id: "gauge-Soc",
      value: 0, 
      title: "SOC(%)",
      symbol: "",
      decimals: 0,
      startAnimationTime: 0,
      refreshAnimationTime: 0,
      pointer: false,
      levelColors: ["#a9d70b", "#a9d70b", "#a9d70b"]
    };
    this.optionGaugeSpeed = {
      id: "gauge-Speed",
      value: 0, 
      title: "Speed(mph)",
      symbol: "",
      decimals: 0,
      startAnimationTime: 0,
      refreshAnimationTime: 0,
      pointer: false,
      levelColors: ["#a9d70b", "#a9d70b", "#a9d70b"]
    };
  }

  initComplexChart(): void {
    this.optionComplexChart = {
      animation: {
        duration: 0
      },
      hover: {
        animationDuration: 0
      },
      scales: {
        yAxes: [{
          id: 'yEnergy',
          scaleLabel: {
           display: true,
           labelString: 'Energy',
           fontColor: '#4bc0c0'
          },
          type: 'linear',
          position: 'left',
          ticks: {
            fontColor: '#4bc0c0',
            max: 600,
            min: 0
          }
        }, {
          id: 'yVoltage',
          scaleLabel: {
           display: true,
           labelString: 'Voltage',
           fontColor: '#565656'
          },
          type: 'linear',
          position: 'right',
          ticks: {
            fontColor: '#565656',
            max: 800,
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
            max: 400,
            min: -400
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
            max: 220,
            min: 0
          }
        }]
      }
    };
  }

  onDateChanged(event: IMyDateModel) {
      if (event.jsdate) {
        this.selectedDate = event.jsdate; 
        this.loadDualChartsData();
     }
  }

  loadDualChartsData(): void {
    this.dataService.getVehicleWholeDaySnapshot$(this.vehicleName, this.selectedDate)
      .subscribe(data => {
          if(!data) { console.log('no response data'); return; }
          this.chartSocRange.data = this.getChartDataSOCEnergy(data);
          this.chartEstActualDistance.data = this.getChartDataEstActualDistance(data);
          this.chartChargingRunningStatus.data = this.getChargingRunningStatusData(data);

          this.chartSocRange.reinit();
          this.chartEstActualDistance.reinit();
          this.chartChargingRunningStatus.reinit();
    });
  }

  loadComplexChartData(): void {
    this.dataService.getVehicleWholeDaySnapshot$(this.vehicleName, this.selectedDate)
      .subscribe(data => {
         if(!data) { console.log('no response data'); return; }
         this.chartComplex.data = this.getChartDataComplex(data);
         this.chartComplex.reinit();
      });
  }

  getChartDataComplex(list: VehicleSnapshot[]): any {
    var filtered_A = list.filter(e => e.code === '1J');
    var filtered_B = list.filter(e => e.code === '1F');
    var filtered_C = list.filter(e => e.code === '2F');
    var filtered_D = list.filter(e => e.code === '2G');

    var labels = filtered_A.map(el => moment(el.time).format('hh:mm'));
    var data_A = filtered_A.map(el => el.value);
    var data_B = filtered_B.map(el => el.value);
    var data_C = filtered_C.map(el => el.value);
    var data_D = filtered_D.map(el => el.value);

    return {
        labels: labels,
        datasets: [
            {
                label: 'Energy',
                data: data_A,
                yAxisID: 'yEnergy',
                fill: false,
                borderColor: '#4bc0c0'
            }, {
                label: 'Voltage',
                data: data_B,
                yAxisID: 'yVoltage',
                fill: false,
                borderColor: '#565656'
            }, {
                label: 'Current',
                data: data_C,
                yAxisID: 'yCurrent',
                fill: false,
                borderColor: '#4286f4'
            }, {
                label: 'Temperature',
                data: data_D,
                yAxisID: 'yTemperature',
                fill: false,
                borderColor: '#f47d41'
            }
        ]
    }
  }

  getChartDataSOCEnergy(list: VehicleSnapshot[]): any {
    var filtered_A = list.filter(e => e.code === '1E');
    var filtered_B = list.filter(e => e.code === '1J');

    var labels = filtered_A.map(el => moment(el.time).format('hh:mm'));
    var data_A = filtered_A.map(el => el.value);
    var data_B = filtered_B.map(el => el.value);

    return {
      labels: labels,
      datasets: [
        {
          type: 'line',
          label: 'SOC',
          data: data_A,
          yAxisID: 'ySOC',
          fill: false,
          borderColor: '#4bc0c0'
        }, {
          type: 'line',
          label: 'kWh',
          data: data_B,
          yAxisID: 'ykWh',
          fill: false,
          borderColor: '#565656',
          borderWidth: 1
        }
      ]
    }
  }
  
  getChartDataEstActualDistance(list: VehicleSnapshot[]): any {
    var filtered_A = list.filter(e => e.code === '2H'); 
    var filtered_B = list.filter(e => e.code === '1H');

    var labels = filtered_A.map(el => moment(el.time).format('hh:mm'));
    var data_A = filtered_A.map(el => el.value);
    var data_B = filtered_B.map(el => el.value);

    return {
      labels: labels,
      datasets: [
        {
          type: 'line',
          label: 'Range',
          data: data_A,
          yAxisID: 'yRange',
          fill: false,
          borderColor: '#4bc0c0'
        }, {
          type: 'line',
          label: 'Actual Distance',
          data: data_B,
          yAxisID: 'yActualDistance',
          fill: false,
          borderColor: '#565656',
          borderWidth: 1
        }
      ]
    }
  }

  getChargingRunningStatusData(list: VehicleSnapshot[]): any {
    var filtered_A = list.filter(e => e.code === '1I'); 
    var filtered_B = list.filter(e => e.code === '1K');

    var labels = filtered_A.map(el => moment(el.time).format('hh:mm'));
    var data_A = filtered_A.map(el => el.value);
    var data_B = filtered_B.map(el => el.value);

    return {
      labels: labels,
      datasets: [
        {
          type: 'line',
          label: 'Charging Status',
          data: data_A,
          yAxisID: 'yChargingStatus',
          fill: false,
          borderColor: '#4bc0c0'
        }, {
          type: 'line',
          label: 'High Voltage Status',
          data: data_B,
          yAxisID: 'yRunningStatus',
          fill: false,
          borderColor: '#565656',
          borderWidth: 1
        }
      ]
    }
  }

  getChartOptions(leftY: YAxis, rightY: YAxis): any {
    return {
      animation: {
        duration: 0
      },
      hover: {
        animationDuration: 0
      },
      scales: {
        yAxes: [{
          id: 'y' + leftY.label,
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
          id: 'y' + rightY.label,
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
  
  exportDualCharts(): void {
        html2canvas(this.divDualCharts.nativeElement, {
            onrendered: function(canvas) {
                const contentDataURL = canvas.toDataURL("image/png");
                let pdf = new jsPDF();
                pdf.addImage(contentDataURL, "PNG", 10, 10);
                pdf.save("Vehicle.DualCharts.pdf");
            }
        })
    }

    

}

 