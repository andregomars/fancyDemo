import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { IMyOptions, IMyDateRangeModel } from 'mydaterangepicker';
import { DataTableModule, UIChart } from 'primeng/primeng';
import * as Rx from 'rxjs/Rx';
import * as moment from 'moment';
let jsPDF = require("jspdf");
let html2canvas = require("html2canvas");

import { DataService } from '../shared/data.service';
import { VehicleIdentity } from '../models/vehicle-identity';
import { UtilityService } from '../shared/utility.service';
import { Vehicle } from '../models/vehicle.model';
import { Fleet } from '../models/fleet.model';
import { FleetTrackerService } from '../shared/fleet-tracker.service';

@Component({
  selector: 'app-monthly-report',
  templateUrl: './monthly-report.component.html',
  styleUrls: ['./monthly-report.component.css']
})
export class MonthlyReportComponent implements OnInit {

  fleetID: string;
  vehicles: Array<Vehicle>;
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
    private dataService: DataService,
    private fleetTracker: FleetTrackerService
  ) { }

  ngOnInit() {
    this.initYearsSelection();
    this.initMonthButtons();
    this.initMonthlyChartOption();

    this.selectedYear = new Date().getFullYear();
    this.selectedMonth = { 
        name: moment().format('MMM'),
        value: moment().startOf('month').toDate()
      };
    this.loadFleet();
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

  private initData(): void {
    this.dataService.getVehiclesStatusByFleet$(this.fleetID)
      .subscribe((data: Array<VehicleIdentity>) => {
        this.vehicles = data.map(v => new Vehicle(v.vname));

        this.initFleetMonthlyData();
        this.initMonthlyChartData();
        this.initFleetMonthlyAlertData();
      });
  }

  /*** Fleet Status Grid ***/
  private initFleetMonthlyData() {
    // this.dataFleetMonthly = this.dataService.getRandomMonthlyDataSetWithVehicles(this.vehicles);
    var beginDate = moment(this.selectedMonth.value).startOf('month').toDate();
    var endDate = moment(this.selectedMonth.value).endOf('month').toDate();
    
    this.dataService.getVehicleDailyUsageByFleet$(this.fleetID, beginDate, endDate)
      .subscribe(data => this.dataFleetMonthly = data);

  }

  /*** Fleet Alert Grid ***/
  private initFleetMonthlyAlertData() {
    this.dataFleetMonthlyAlert = 
      this.dataService.getRandomMonthlyAlertSummaryByFleet(this.fleetID, this.vehicles);
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
      scales: {
        xAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      },
      legend: {
        display: false
      }
    };
    this.resetChartDefaultOptions(this.optionFleetMonthlyChart);
  }

  private initMonthlyChartData(): void {
    this.chartFleetMonthly.data = {
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
    this.chartFleetMonthly.reinit();
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
      .switchMap((params: Params) => Rx.Observable.of(params["fname"]))
      .subscribe((fname: string) => { 
        this.fleetID = fname;
        this.fleetTracker.setFleetIDByFleet(fname);
        this.initData();
      });
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
