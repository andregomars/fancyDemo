import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { IMyOptions, IMyDateRangeModel } from 'mydaterangepicker';
import * as moment from 'moment';
import { UIChart } from 'primeng/primeng';
import * as Rx from 'rxjs/Rx';

let jsPDF = require("jspdf");
let html2canvas = require("html2canvas");

import { DataService } from '../shared/data.service';
import { VehicleDailyUsage } from '../models/vehicle-daily-usage';
import { VehicleIdentity } from '../models/vehicle-identity';


@Component({
  selector: 'app-analysis-daily',
  templateUrl: './analysis-daily.component.html',
  styleUrls: ['./analysis-daily.component.css']
})
export class AnalysisDailyComponent implements OnInit {

  fleetName: string;
  vehicleName: string;
//   today: Date = new Date(2017, 4, 3);
  today: Date = new Date();
  backDays: number = 13;
  ratioDGE: number = 0.027
  factor: number = 907200;

  //Daily Mileage Chart properties
  optionMileageDateRangePicker: IMyOptions;
  optionMileageChart: any;

  //SOC & Energy Chart properties
  optionSocEnergyDateRangePicker: IMyOptions;
  optionSocEnergyChart: any;

  //SOC, Mileage & Energy Chart properties
  optionSocMileageEnergyDateRangePicker: IMyOptions;
  optionSocMileageEnergyChart: any

  //Emission Reduction Chart properties 
  optionEmissionReductionDateRangePicker: IMyOptions;
  optionEmissionReductionChart: any;

  //child views
  @ViewChild("chartsP1")
  chartsP1: ElementRef;
   @ViewChild("chartsP2")
  chartsP2: ElementRef;
  @ViewChild("chartMileage")
  chartMileage: UIChart;
  @ViewChild("chartSocEnergy")
  chartSocEnergy: UIChart;
  @ViewChild("chartSocMileageEnergy")
  chartSocMileageEnergy: UIChart;
  @ViewChild("chartEmissionReduction")
  chartEmissionReduction: UIChart;


  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
  ) { }

  ngOnInit(): void {
    this.initDatePicker();
    this.initChartsOptions();
    this.initChartsData();
  }

  private initDatePicker(): void {
    var optionDateRangePickerDefault = {
      dateFormat: "mm/dd/yyyy",
      width: "200px",
      height: "23px",
      selectionTxtFontSize: "12px",
      editableDateRangeField: false,
      alignSelectorRight: true
    };
    this.optionMileageDateRangePicker = optionDateRangePickerDefault;
    this.optionSocEnergyDateRangePicker = optionDateRangePickerDefault;
    this.optionSocMileageEnergyDateRangePicker = optionDateRangePickerDefault;
    this.optionEmissionReductionDateRangePicker = optionDateRangePickerDefault;
 }

  private initChartsOptions(): void {
    this.initMileageChartOption();
    this.initSocEnergyChartOption();
    this.initSocMileageEnergyChartOption();
    this.initEmissionReductionChartOption();
  }

  private initChartsData(): void {
    this.route.params
      .switchMap((params: Params) => Rx.Observable.of(params["vname"]))
      .subscribe(vname => {
        this.vehicleName = vname;
        this.fleetName = this.dataService.getVehicleIdentity(vname).fname;

        let endDate = moment(this.today).startOf('day').toDate();
        let beginDate = moment(this.today).subtract(this.backDays, 'days').startOf('day').toDate();

        this.loadMileageChartData(beginDate, endDate);
        this.loadSocEnergyChartData(beginDate, endDate);
        this.loadSocMileageEnergyData(beginDate, endDate);
        this.loadEmissionReductionChartData(beginDate, endDate);
      });
  }

  /*** Section - Mileage ***/
  private loadMileageChartData(beginDate: Date, endDate: Date): void {
    this.dataService.getVehicleDailyUsageByDateRange$(this.vehicleName, beginDate, endDate)
      .subscribe(data => {
        if (!data) return;
        this.chartMileage.data = this.buildMileageChartData(data);
        this.chartMileage.reinit();
         // this.chartMileage.data.labels = newData.labels;
          // this.chartMileage.data.datasets[0].data = newData.data; 
          // this.chartMileage.refresh();
       });
  }

  private buildMileageChartData(list: VehicleDailyUsage[]): any {
    var labels = list.map(el => moment(el.date).format('MM/DD'));
    var data = list.map(el => el.mileage).map(x => x.toFixed(2));
    return {
      labels: labels,
      datasets: [
        {
          label: 'Daily Mileage',
          data: data,
          backgroundColor: '#4bc0c0',
          borderColor: '#4bc0c0',
          borderWidth: 1
        }
      ]
    };
  }

  onMileageDateChanged(event: IMyDateRangeModel): void {
    if (event.beginJsDate && event.endJsDate) {
      this.loadMileageChartData(event.beginJsDate, event.endJsDate);
    }
  }

 private initMileageChartOption(): void {
    this.optionMileageChart = {
      responsive: false,
      maintainAspectRatio: true,
      legend: {
        display: false
      },
      scales: {
        yAxes: [{
          ticks: {
            min: 0,
            max: 200
          }
        }]
      }
    };
    this.resetChartDefaultOptions(this.optionMileageChart);
  }

  /*** Section - SOC & Engery ***/
  onSocEnergyDateChanged(event: IMyDateRangeModel): void {
    if (event.beginJsDate && event.endJsDate) {
      this.loadSocEnergyChartData(event.beginJsDate, event.endJsDate);
    }
  }

  private initSocEnergyChartOption(): void {
    this.optionSocEnergyChart = {
      scales: {
        yAxes: [{
          id: 'ySocCharged',
          scaleLabel: {
            display: true,
            labelString: 'SOC Charged',
            fontColor: '#4bc0c0'
          },
          type: 'linear',
          position: 'left',
          ticks: {
            fontColor: '#4bc0c0',
            min: 0,
            max: 200
          }
        }, {
          id: 'ySocUsed',
          scaleLabel: {
            display: true,
            labelString: 'SOC Used',
            fontColor: '#565656'
          },
          type: 'linear',
          position: 'right',
          ticks: {
            fontColor: '#565656',
            min: 0,
            max: 200
          }
        }, {
          id: 'yEnergyCharged',
          scaleLabel: {
            display: true,
            labelString: 'Energy Charged',
            fontColor: '#4286f4'
          },
          type: 'linear',
          position: 'right',
          ticks: {
            fontColor: '#4286f4',
            min: 0,
            max: 600
          }
        }, {
          id: 'yEnergyUsed',
          scaleLabel: {
            display: true,
            labelString: 'Energy Used',
            fontColor: '#f47d41'
          },
          type: 'linear',
          position: 'right',
          ticks: {
            fontColor: '#f47d41',
            min: 0,
            max: 600
          }
        }]
      }
    };
    this.resetChartDefaultOptions(this.optionSocEnergyChart);
  }

  private loadSocEnergyChartData(beginDate: Date, endDate: Date): void {
    this.dataService.getVehicleDailyUsageByDateRange$(this.vehicleName, beginDate, endDate)
      .subscribe(data => {
        if (!data) return;
        this.chartSocEnergy.data = this.buildSocEnergyChartData(data);
        this.chartSocEnergy.reinit();
       });
  }

  private buildSocEnergyChartData(list: VehicleDailyUsage[]): any {
    var labels = list.map(el => moment(el.date).format('MM/DD'));
    var dataSocCharged = list.map(el => el.soccharged);
    var dataSocUsed = list.map(el => el.socused);
    var dataEnergyCharged = list.map(el => el.energycharged).map(x => x.toFixed(2));
    var dataEnergyUsed = list.map(el => el.energyused).map(x => x.toFixed(2));

    return {
      labels: labels,
      datasets: [{
        label: "SOC charged",
        data: dataSocCharged,
        yAxisID: 'ySocCharged',
        fill: true,
        backgroundColor: '#4bc0c0',
        borderColor: '#4bc0c0',
        borderWidth: 1
      }, {
        label: "SOC used",
        data: dataSocUsed, 
        AxisID: 'ySocUsed',
        backgroundColor: '#565656',
        borderColor: '#565656',
        borderWidth: 1
      }, {
        label: "Energy charged",
        data: dataEnergyCharged,
        yAxisID: 'yEnergyCharged',
        backgroundColor: '#4286f4',
        borderColor: '#4286f4',
        borderWidth: 1
      }, {
        label: "Energy used",
        data: dataEnergyUsed,
        yAxisID: 'yEnergyUsed',
        backgroundColor: '#f47d41',
        borderColor: '#f47d41',
        borderWidth: 1
      }]
    };
  }

  /*** Section - Daily SOC, Mileage & Energy ***/
  onSocMileageEnergyDateChanged(event: IMyDateRangeModel): void {
    if (event.beginJsDate && event.endJsDate) {
      this.loadSocMileageEnergyData(event.beginJsDate, event.endJsDate);
    }
  }

  private initSocMileageEnergyChartOption(): void {
    this.optionSocMileageEnergyChart = {
      scales: {
        yAxes: [{
          id: 'ySocMileage',
          scaleLabel: {
            display: true,
            labelString: 'SOC/Mileage',
            fontColor: '#4bc0c0'
          },
          type: 'linear',
          position: 'left',
          ticks: {
            fontColor: '#4bc0c0',
            min: 0,
            max: 10
          }
        }, {
          id: 'yMileageSoc',
          scaleLabel: {
            display: true,
            labelString: 'Mileage/SOC',
            fontColor: '#565656'
          },
          type: 'linear',
          position: 'right',
          ticks: {
            fontColor: '#565656',
            min: 0,
            max: 10
          }
        }, {
          id: 'yMileageEnergy',
          scaleLabel: {
            display: true,
            labelString: 'Mileage/Energy',
            fontColor: '#4286f4'
          },
          type: 'linear',
          position: 'right',
          ticks: {
            fontColor: '#4286f4',
            min: 0,
            max: 10
          }
        }, {
          id: 'yEnergyMileage',
          scaleLabel: {
            display: true,
            labelString: 'Energy/Mileage',
            fontColor: '#f47d41'
          },
          type: 'linear',
          position: 'right',
          ticks: {
            fontColor: '#f47d41',
            min: 0,
            max: 10
          }
        }]
      }
    };
    this.resetChartDefaultOptions(this.optionSocMileageEnergyChart);
  }

  private loadSocMileageEnergyData(beginDate: Date, endDate: Date): void {
    this.dataService.getVehicleDailyUsageByDateRange$(this.vehicleName, beginDate, endDate)
      .subscribe(data => {
        if (!data) return;
        this.chartSocMileageEnergy.data = this.buildSocMileageEnergyChartData(data);
        this.chartSocMileageEnergy.reinit();
       });
  }

  private buildSocMileageEnergyChartData(list: VehicleDailyUsage[]): any {
    var labels = list.map(el => moment(el.date).format('MM/DD'));
    var dataSocMileage = list.map(el => el.mileage != 0? el.socused/el.mileage : 10 ).map(x => x.toFixed(2));
    var dataMileageSoc = list.map(el => el.socused != 0? el.mileage/el.socused : 10 ).map(x => x.toFixed(2));
    var dataMileageEnergy = list.map(el => el.energyused != 0? el.mileage/el.energyused : 10 ).map(x => x.toFixed(2));
    var dataEnergyMileage = list.map(el => el.mileage != 0? el.energyused/el.mileage : 10 ).map(x => x.toFixed(2));

    return {
      labels: labels,
      datasets: [{
        label: "SOC/Mileage",
        data: dataSocMileage, 
        yAxisID: 'ySocMileage',
        fill: true,
        backgroundColor: '#4bc0c0',
        borderColor: '#4bc0c0',
        borderWidth: 1
      }, {
        label: "Mileage/SOC",
        data: dataMileageSoc, 
        yAxisID: 'yMileageSoc',
        backgroundColor: '#565656',
        borderColor: '#565656',
        borderWidth: 1
      }, {
        label: "Mileage/Energy",
        data: dataMileageEnergy, 
        yAxisID: 'yMileageEnergy',
        backgroundColor: '#4286f4',
        borderColor: '#4286f4',
        borderWidth: 1
      }, {
        label: "Energy/Mileage",
        data: dataEnergyMileage, 
        yAxisID: 'yEnergyMileage',
        backgroundColor: '#f47d41',
        borderColor: '#f47d41',
        borderWidth: 1
      }]
    };
  }

/*
	Item #1: Total Diesel Gallon Equivalent (DGE) Saved = [Total Electric Fleet Energy Consumed (kWh)] x .027
	Item #2: NOx (tons) = [DGE] x 3.44 x [1/907,200]
	Item #3: ROG (tons) = [DGE] x .18 x [1/907,200]
	Item #4: PM2.5 (tons) = [DGE] x .136 x [1/907,200]
	Item #5: PM10 (tons) = [DGE] x .15 x [1/907,200]
*/

  /*** Section: Emission Reduction ***/
 onEmissionReductionDateChanged(event: IMyDateRangeModel): void {
    if (event.beginJsDate && event.endJsDate) {
      this.loadEmissionReductionChartData(event.beginJsDate, event.endJsDate);
    }
  }

  private initEmissionReductionChartOption(): void {
    this.optionEmissionReductionChart = {
     scales: {
        yAxes: [{
          id: 'yDGE',
          scaleLabel: {
            display: true,
            labelString: 'DGE',
            fontColor: '#4bc0c0'
          },
          type: 'linear',
          position: 'left',
          ticks: {
            fontColor: '#4bc0c0',
            min: 0,
            max: 2
          }
        }, {
          id: 'yNOx',
          scaleLabel: {
            display: true,
            labelString: 'NOx x 1E-6',
            fontColor: '#565656'
          },
          type: 'linear',
          position: 'right',
          ticks: {
            fontColor: '#565656',
            min: 0,
            max: 2
          }
        }, {
          id: 'yROG',
          scaleLabel: {
            display: true,
            labelString: 'ROG x 1E-6',
            fontColor: '#4286f4'
          },
          type: 'linear',
          position: 'right',
          ticks: {
            fontColor: '#4286f4',
            min: 0,
            max: 1
          }
        }, {
          id: 'yPM25',
          scaleLabel: {
            display: true,
            labelString: 'PM2.5 x 1E-6',
            fontColor: '#f47d41'
          },
          type: 'linear',
          position: 'right',
          ticks: {
            fontColor: '#f47d41',
            min: 0,
            max: 1
          }
        }, {
          id: 'yPM10',
          scaleLabel: {
            display: true,
            labelString: 'PM10 x 1E-6',
            fontColor: '#FFCE56'
          },
          type: 'linear',
          position: 'right',
          ticks: {
            fontColor: '#FFCE56',
            min: 0,
            max: 1
          }
        }]
      }
    };
    this.resetChartDefaultOptions(this.optionEmissionReductionChart);
  }

  private loadEmissionReductionChartData(beginDate: Date, endDate: Date): void {
    this.dataService.getVehicleDailyUsageByDateRange$(this.vehicleName, beginDate, endDate)
      .subscribe(data => {
        if (!data) return;
        this.chartEmissionReduction.data = this.buildEmissionReductionChartData(data);
        this.chartEmissionReduction.reinit();
       });
  }

  private buildEmissionReductionChartData(list: VehicleDailyUsage[]): any {
    var labels = list.map(el => moment(el.date).format('MM/DD'));
    var dataDGE = list.map(el => el.energyused * this.ratioDGE).map(x => x.toFixed(4));
    var dataNOx = list.map(el => el.energyused * this.ratioDGE * 3.44 / this.factor * 1000000).map(x => x.toFixed(4));
    var dataROG = list.map(el => el.energyused * this.ratioDGE * 0.18 / this.factor * 1000000).map(x => x.toFixed(4));
    var dataPM25 = list.map(el => el.energyused * this.ratioDGE * 0.136 / this.factor * 1000000).map(x => x.toFixed(4));
    var dataPM10 = list.map(el => el.energyused * this.ratioDGE * 0.15 / this.factor * 1000000).map(x => x.toFixed(4));

    return {
      labels: labels,
      datasets: [{
        label: "DGE",
        data: dataDGE,
        yAxisID: 'yDGE',
        fill: true,
        backgroundColor: '#4bc0c0',
        borderColor: '#4bc0c0',
        borderWidth: 1
      }, {
        label: "NOx",
        data: dataNOx, 
        yAxisID: 'yNOx',
        backgroundColor: '#565656',
        borderColor: '#565656',
        borderWidth: 1
      }, {
        label: "ROG",
        data: dataROG,
        yAxisID: 'yROG',
        backgroundColor: '#4286f4',
        borderColor: '#4286f4',
        borderWidth: 1
      }, {
        label: "PM2.5",
        data: dataPM25,
        yAxisID: 'yPM25',
        backgroundColor: '#f47d41',
        borderColor: '#f47d41',
        borderWidth: 1
      }, {
        label: "PM10",
        data: dataPM10,
        yAxisID: 'yPM10',
        backgroundColor: '#FFCE51',
        borderColor: '#FFCE51',
        borderWidth: 1
      }]
    };
  }

  /*** Common Section ***/


  private resetChartDefaultOptions(option: any): void {
    option.animation = {
      duration: 0
    };
    option.hover = {
      animationDuration: 0
    };
    option.responsive = false;
    option.maintainAspectRatio = true;
    // option.scales.xAxes = [{
    //   ticks: {
    //     callback: function (value, index, values) {
    //       return moment(value).format('MM/DD');
    //     }
    //   }
    // }];
  }

  exportCharts(): void {
    //print page by page
    html2canvas(this.chartsP1.nativeElement, {
      onrendered: function (canvas) {
        const contentDataURL = canvas.toDataURL("image/png");
        let pdf = new jsPDF("landscape");
        pdf.addImage(contentDataURL, "PNG", 10, 10);
        pdf.save("DailyAnalysis.P1.pdf");
      },
    });
    html2canvas(this.chartsP2.nativeElement, {
      onrendered: function (canvas) {
        const contentDataURL = canvas.toDataURL("image/png");
        let pdf = new jsPDF("landscape");
        pdf.addImage(contentDataURL, "PNG", 10, 10);
        pdf.save("DailyAnalysis.P2.pdf");
      },
    });
  }
}
