import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { IMyOptions, IMyDateRangeModel } from 'mydaterangepicker';
import { DataTableModule, UIChart } from 'primeng/primeng';
import * as Rx from 'rxjs/Rx';
let jsPDF = require("jspdf");
let html2canvas = require("html2canvas");

import { DataService } from '../shared/data.service';
import { UtilityService } from '../shared/utility.service';
import { Vehicle } from '../models/vehicle.model';
import { Fleet } from '../models/fleet.model';

@Component({
  selector: 'app-monthly-report',
  templateUrl: './monthly-report.component.html',
  styleUrls: ['./monthly-report.component.css']
})
export class MonthlyReportComponent implements OnInit {

  fleetID: string;
  dataFleetMonthly: Array<any>;
  dataFleetMonthlyAlert: Array<any>;
  optionFleetMonthlyChart: any;
  dataFleetMonthlyChart: any;
  
  thisYear: number = new Date().getFullYear();
  selectedYear: number;
  selectedMonth: any;
  years: number[];
  months: any[];


  options: any[] = [
    { key: 'socCharged', name: 'SOC Charged' },
    { key: 'socUsed', name: 'SOC Used' },
    { key: 'actualDistance', name: 'Actual Distance' },
    { key: 'socMile', name: 'SOC/Miles' },
    { key: 'mileSoc', name: 'Miles/SOC' }
  ];
  optionSelected: any = this.options[0];

  //child views
  @ViewChild("charts")
  charts: ElementRef;

  @ViewChild("chartFleetMonthly")
  chartFleetMonthly: UIChart;

  constructor(
    private utility: UtilityService,
    private route: ActivatedRoute,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.loadFleet();
    this.initYearsSelection();
    this.initMonthButtons();
    
    this.initFleetMonthlyData();
    this.initMonthlyChartOption();
    this.initMonthlyChartData();
    this.initFleetMonthlyAlertData();
  }

  private initYearsSelection(): void {
    this.years = new Array(5).fill(this.thisYear).map((x, i)=>x-i);
    this.selectedYear = this.thisYear;
  }

  private initMonthButtons(): void {
    this.months = this.utility.getMonthsByYear(this.thisYear);
  }

  onSelect(year: number): void {
    this.months = this.utility.getMonthsByYear(year);
  }

  selectMonth(month: any): void {
    this.selectedMonth = month.value;
    this.initFleetMonthlyData();
    this.initMonthlyChartData();
    this.updateMonthlyChartData();

  }

  /*** Fleet Status Grid ***/
  private initFleetMonthlyData() {
    let vehicles = this.dataService.getVehiclesIdentityByFleet(this.fleetID).map(v => new Vehicle(v.vname));
    this.dataFleetMonthly = this.dataService.getRandomMonthlyDataSetWithVehicles(vehicles);
  }

  /*** Fleet Alert Grid ***/
  private initFleetMonthlyAlertData() {
    this.dataFleetMonthlyAlert = this.dataService.getRandomMonthlyAlertSummaryByFleet(this.fleetID);
  }

  /*** Bar Chart ***/
  selectOption(option: any): void {
    this.optionSelected = option;
    this.updateMonthlyChartData();
  }

  private initMonthlyChartOption(): void {
    this.optionFleetMonthlyChart = {
      responsive: false,
      maintainAspectRatio: true,
      legend: {
        display: false
      }
    };
    this.resetChartDefaultOptions(this.optionFleetMonthlyChart);
  }

  private initMonthlyChartData(): void {
    this.dataFleetMonthlyChart = {
      labels: this.dataFleetMonthly.map(v => v.id),
      datasets: [
        {
          label: this.optionSelected.name,
          data: this.dataFleetMonthly.map(v => v[this.optionSelected.key]),
          backgroundColor: '#4bc0c0',
          borderColor: '#4bc0c0',
          borderWidth: 1
        }
      ]
    };
    this.chartFleetMonthly.refresh();
  }

  private updateMonthlyChartData(): void {
    this.chartFleetMonthly.data.datasets[0].label = this.optionSelected.name;
    this.chartFleetMonthly.data.datasets[0].data =
      this.dataFleetMonthly.map(v => v[this.optionSelected.key]);
    this.chartFleetMonthly.refresh();
  }

  /*** Common Section ***/
  private loadFleet(): void {
    this.route.params
      .switchMap((params: Params) => Rx.Observable.create(ob => ob.next(params["fname"])))
      .subscribe((fname: string) => this.fleetID = fname);
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
