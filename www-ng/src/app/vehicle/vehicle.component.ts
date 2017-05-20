import { Component, OnInit, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core'
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
  styleUrls: [ 'vehicle.component.css' ],
  // encapsulation: ViewEncapsulation.Native
})
export class VehicleComponent implements OnInit {
 
 vehicleName: string;
 lastVehicleStatus: VehicleStatus = this.getDefaultVehicleStatus(); 
 recentStatusList: Array<VehicleStatus>;
 recentAlertList: Array<VehicleAlert>;
 lastVehicleSnapshot: Array<VehicleSnapshot>;
 optionGaugeSOC: any;
 optionGaugeSpeed: any;

 
 optionDatePicker: IMyOptions;
//selectedDate: Date = moment().startOf('day').toDate(); 
 selectedDate: Date = new Date(2017,4,3);  //test only


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
   this.setGaugeOptions();
   this.setDatePicker();
   this.setDualChartsOptions();
   this.setComplexChartOptions();
   this.initData();
 }

 initData(): void {
    this.route.params
      .switchMap((params: Params) => Rx.Observable.of(params["vname"]))
      .subscribe(vname => {
        this.vehicleName = vname;
        this.fleetTracker.setFleetIDByVehicle(vname);
        
        this.loadLastVehicleStatus();
        this.loadRecentVehicleSnapshots();
        this.loadRecentVehicleAlerts();
        this.loadLastVehicleSnapshot();
        this.loadDualChartsData();
        this.loadComplexChartData();
      });
 }

 loadLastVehicleStatus(): void {
   this.dataService.getVehicleStatus$(this.vehicleName)
    .subscribe((data: VehicleStatus) => {
      this.lastVehicleStatus = data ? data : this.getDefaultVehicleStatus();
    });
 }

 loadLastVehicleSnapshot(): void {
   this.dataService.getVehicleSnapshot$(this.vehicleName)
    .subscribe((data: Array<VehicleSnapshot>) => {
      this.lastVehicleSnapshot = data;
    });
 }

 loadRecentVehicleSnapshots(): void {
   this.dataService.getRecentVehicleStatusList$(this.vehicleName)
    .subscribe((data: Array<VehicleStatus>) => {
      this.recentStatusList = data;
    });
 }

 loadRecentVehicleAlerts(): void {
   this.dataService.getRecentVehicleAlertList$(this.vehicleName)
    .subscribe((data: Array<VehicleAlert>) => {
      this.recentAlertList = data;
    });
 }
 
  loadDualChartsData(): void {
    this.dataService.getVehicleWholeDaySnapshot$(this.vehicleName, this.selectedDate)
      .subscribe(data => {
          if(!data) return; 
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
         if(!data) return; 
         this.chartComplex.data = this.getChartDataComplex(data);
         this.chartComplex.reinit();
      });
  }

 getDefaultVehicleStatus(): VehicleStatus {
  return new VehicleStatus(0, '', 0, '', 34.134330, 117.928273, 0, 0, 0, 0, 0, 0, 0, 
      0, 0, -40, -40, 0, 0, new Date());
 }

 setDatePicker(): void {
    this.optionDatePicker = {
            dateFormat: "mm/dd/yyyy",
            width: "200px",
            height: "23px",
            editableDateField: false,
            openSelectorOnInputClick: true,
            selectionTxtFontSize: "12px"
    }
 } 

setDualChartsOptions(): void {
   var leftY = new YAxis("SOC", "#4286f4", 0, 200);
   var rightY = new YAxis("kWh", "#565656", 0, 600);
   this.optionSocRangeChart = this.getChartOptions(leftY, rightY);

   leftY = new YAxis("Range", "#4286f4", 0, 300);
   rightY = new YAxis("ActualDistance", "#565656", 0, 250);
   this.optionEstActualDistanceChart = this.getChartOptions(leftY, rightY);

   leftY = new YAxis("ChargingStatus", "#4286f4", 0, 1);
   rightY = new YAxis("RunningStatus", "#565656", 0, 800);
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
      gaugeWidthScale: 1.5,
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
      gaugeWidthScale: 1.5,
      levelColors: ["#a9d70b", "#a9d70b", "#a9d70b"]
    };
  }

  setComplexChartOptions(): void {
    this.optionComplexChart = {
      animation: {
        duration: 0
      },
      hover: {
        animationDuration: 0
      },
      scales: {
        xAxes: [{
            ticks: {
                autoSkip: true,
                maxTicksLimit: 24
            }
        }],
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
                pointRadius: 2, 
                borderColor: '#4bc0c0'
            }, {
                label: 'Voltage',
                data: data_B,
                yAxisID: 'yVoltage',
                fill: false,
                pointRadius: 2, 
                borderColor: '#565656'
            }, {
                label: 'Current',
                data: data_C,
                yAxisID: 'yCurrent',
                fill: false,
                pointRadius: 2, 
                borderColor: '#4286f4'
            }, {
                label: 'Temperature',
                data: data_D,
                yAxisID: 'yTemperature',
                fill: false,
                pointRadius: 2, 
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
          label: 'SOC',
          data: data_A,
          yAxisID: 'ySOC',
          fill: false,
          pointRadius: 1, 
          borderColor: '#4286f4'
        }, {
          label: 'kWh',
          data: data_B,
          yAxisID: 'ykWh',
          fill: false,
          pointRadius: 1, 
          borderColor: '#565656',
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
          pointRadius: 1, 
          borderColor: '#4286f4'
        }, {
          type: 'line',
          label: 'Actual Distance',
          data: data_B,
          yAxisID: 'yActualDistance',
          fill: false,
          pointRadius: 1, 
          borderColor: '#565656',
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
          pointRadius: 1, 
          borderColor: '#4286f4'
        }, {
          type: 'line',
          label: 'High Voltage Status',
          data: data_B,
          yAxisID: 'yRunningStatus',
          fill: false,
          pointRadius: 1, 
          borderColor: '#565656',
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
        xAxes: [{
            ticks: {
                autoSkip: true,
                // autoSkipPadding: 4,
                maxTicksLimit: 24
            }
        }],
        yAxes: [{
          id: 'y' + leftY.label,
          scaleLabel: {
            display: true,
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
            display: true,
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

 