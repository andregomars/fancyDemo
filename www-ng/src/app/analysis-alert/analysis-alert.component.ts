import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { IMyOptions, IMyDateRangeModel } from 'mydaterangepicker';
import * as moment from 'moment';
import { UIChart } from 'primeng/primeng';
import * as Rx from 'rxjs/Rx';
let jsPDF = require("jspdf");
let html2canvas = require("html2canvas");

import { DataLocalService } from '../shared/data-local.service';

@Component({
  selector: 'app-analysis-alert',
  templateUrl: './analysis-alert.component.html',
  styleUrls: ['./analysis-alert.component.css']
})
export class AnalysisAlertComponent implements OnInit {

  fleetID: string;
  vehicleID: string;
  //Vehicle Alert Proportion Chart properties
  optionVehicleAlertDateRangePicker: IMyOptions;
  dataVehicleAlertChart: any;
  optionVehicleAlertChart: any;

  //Fleet Alert Proportion Chart properties
  optionFleetAlertDateRangePicker: IMyOptions;
  dataFleetAlertChart: any;
  optionFleetAlertChart: any;

  //child views
  @ViewChild("charts")
  charts: ElementRef;
  @ViewChild("chartVehicleAlert")
  chartVehicleAlert: UIChart;
  @ViewChild("chartFleetAlert")
  chartFleetAlert: UIChart;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataLocalService
  ) { }

  ngOnInit() {
    

    // Vehicle Alert
    this.initVehicleAlertDateRangePicker();
    this.initVehicleAlertChartOption();
    this.initVehicleAlertChartData();

    // Fleet Alert
    this.initFleetAlertDateRangePicker();
    this.initFleetAlertChartOption();
    this.initFleetAlertChartData();

    this.loadVehicle();
  }

  /*** Section - Fleet Alert ***/
  private initVehicleAlertDateRangePicker(): void {
    this.optionVehicleAlertDateRangePicker =
      this.getDefaultDateRangePickerOptions();
  }

  onVehicleAlertDateChanged(event: IMyDateRangeModel): void {
    if (event.beginJsDate && event.endJsDate) {
      this.updateVehicleAlertChartData(event.beginJsDate, event.endJsDate);
    }
  }

  private initVehicleAlertChartOption(): void {
    this.optionVehicleAlertChart = {
      responsive: false,
      maintainAspectRatio: true
    };
    this.resetChartDefaultOptions(this.optionVehicleAlertChart);
  }

  private initVehicleAlertChartData(): void {
    let endDate = new Date();
    let beginDate = this.dataService.getDateOfACoupleWeeksAgo(endDate);
    let data = this.dataService.getVehicleAlertStats(beginDate, endDate);
    this.dataVehicleAlertChart = {
      labels: data.labels,
      datasets: [
        {
          data: data.data,
          backgroundColor: [
            "#FF6384",
            "#4BC0C0",
            "#FFCE56",
            "#E7E9ED",
            "#36A2EB",
            "#42F4D4",
            "#89F441",
            "#F4F441"
          ],
        }
      ]
    };
  }

  private updateVehicleAlertChartData(beginDate: Date, endDate: Date): void {
    let data = this.dataService.getVehicleAlertStats(beginDate, endDate);
    this.chartVehicleAlert.data.labels = data.labels;
    this.chartVehicleAlert.data.datasets[0].data = data.data;
    this.chartVehicleAlert.refresh();
  }

  /*** Section - Fleet Alert ***/
  private initFleetAlertDateRangePicker(): void {
    this.optionFleetAlertDateRangePicker =
      this.getDefaultDateRangePickerOptions();
  }

  onFleetAlertDateChanged(event: IMyDateRangeModel): void {
    if (event.beginJsDate && event.endJsDate) {
      this.updateFleetAlertChartData(event.beginJsDate, event.endJsDate);
    }
  }

  private initFleetAlertChartOption(): void {
    this.optionFleetAlertChart = {};
    this.resetChartDefaultOptions(this.optionFleetAlertChart);
  }

  private initFleetAlertChartData(): void {
    let endDate = new Date();
    let beginDate = this.dataService.getDateOfACoupleWeeksAgo(endDate);
    let data = this.dataService.getFleetAlertStats(beginDate, endDate, this.fleetID);
    this.dataFleetAlertChart = {
      labels: data.labels,
      datasets: [
        {
          data: data.data,
          backgroundColor: [
            "#FF6384",
            "#4BC0C0",
            "#FFCE56",
            "#E7E9ED",
            "#36A2EB",
            "#42F4D4",
            "#89F441",
            "#F4F441"
          ],
        }
      ]
    };
  }

  private updateFleetAlertChartData(beginDate: Date, endDate: Date): void {
    let data = this.dataService.getFleetAlertStats(beginDate, endDate, this.fleetID);
    this.chartFleetAlert.data.labels = data.labels;
    this.chartFleetAlert.data.datasets[0].data = data.data;
    this.chartFleetAlert.refresh();
  }

  /*** Common Section ***/
  private loadVehicle(): void {
    this.route.params
      .switchMap((params: Params) => Rx.Observable.of(params["vid"])) 
      .subscribe((vid: string) => {
        this.vehicleID = vid;
        this.dataService.getAllVehiclesData$()
          .map(el => el.find(v => v.vid === vid))
          .map(v => v.fid)
          .subscribe(fid => this.fleetID = fid);
    });
  }

  // private loadVehicle(): void {
  //   this.route.params
  //     .switchMap((params: Params) => Rx.Observable.create(ob => ob.next(params["vid"]))) 
  //     .subscribe((vid: string) => {
  //       this.vehicleID = vid;
  //       this.fleetID = this.dataService.getVehicleIdentity(vid).fid;
  //   });
  // }

  private getDefaultDateRangePickerOptions(): any {
    return {
      dateFormat: "mm/dd/yyyy",
      width: "200px",
      height: "23px",
      selectionTxtFontSize: "12px",
      editableDateRangeField: false,
      alignSelectorRight: true
    };
  }

  private resetChartDefaultOptions(option: any): void {
    option.animation = { 
        duration: 0 
    };
    option.hover = { 
        animationDuration: 0 
    };
    option.responsive = false;
    option.maintainAspectRatio = true;
    option.legend = {
       onClick: (e) => e.stopPropagation()
    };
  }

  exportCharts(): void {
    html2canvas(this.charts.nativeElement, {
      onrendered: function (canvas) {
        const contentDataURL = canvas.toDataURL("image/png");
        let pdf = new jsPDF("landscape");
        pdf.addImage(contentDataURL, "PNG", 10, 10);
        pdf.save("Vehicle.DualCharts.pdf");
      }
    })
  }
}
