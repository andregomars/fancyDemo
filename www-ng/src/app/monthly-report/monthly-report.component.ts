import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { UIChart } from 'primeng/primeng';
import * as Rx from 'rxjs/Rx';
import * as moment from 'moment';
const jsPDF = require('jspdf');
const html2canvas = require('html2canvas');

import { DataService } from '../shared/data.service';
import { VehicleIdentity } from '../models/vehicle-identity';
import { UtilityService } from '../shared/utility.service';
import { Vehicle } from '../models/vehicle.model';
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
    { key: 'soccharged', name: 'SOC Charged' },
    { key: 'socused', name: 'SOC Used' },
    { key: 'mileage', name: 'Actual Distance' },
    { key: 'soc_mile', name: 'SOC/Miles' },
    { key: 'mile_soc', name: 'Miles/SOC' },
    { key: 'energycharged', name: 'kWh Charged' },
    { key: 'energyused', name: 'kWh Used' },
    { key: 'energy_mile', name: 'kWh/Miles' },
    { key: 'mile_energy', name: 'Miles/kWh' }
  ];

  optionsInMetric: any[] = [
    { key: 'soccharged', name: 'SOC Charged' },
    { key: 'socused', name: 'SOC Used' },
    { key: 'mileage', name: 'Actual Distance' },
    { key: 'soc_mile', name: 'SOC/km' },
    { key: 'mile_soc', name: 'km/SOC' },
    { key: 'energycharged', name: 'kWh Charged' },
    { key: 'energyused', name: 'kWh Used' },
    { key: 'energy_mile', name: 'kWh/km' },
    { key: 'mile_energy', name: 'km/kWh' }
  ];

  optionSelected: any = this.options[0];

  // child views
  @ViewChild('charts')
  charts: ElementRef;

  // @ViewChild("tableFleetMonthly")
  // tableFleetMonthly: DataTableModule;
  @ViewChild('chartFleetMonthly')
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
    // load years from 2017
    let n = this.thisYear - 2016;
    n = n < 1 ? 1 : n;
    this.years = new Array(n).fill(this.thisYear).map((x, i) => x - i);
    this.selectedYear = this.thisYear;
  }

  private initMonthButtons(): void {
    this.months = this.utility.getMonthsByYear(this.thisYear);
  }

  onSelect(year: number): void {
    this.months = this.utility.getMonthsByYear(year);
  }

  selectMonth(month: any): void {
    this.selectedMonth = month;

    this.loadData();
    this.updateMonthlyChartData();
  }

  private initData(): void {
    this.dataService.getVehiclesStatusByFleet$(this.fleetID)
      .subscribe((data: Array<VehicleIdentity>) => {
        this.vehicles = data.map(v => new Vehicle(v.vname));

        this.loadData();
        if (this.fleetID.toUpperCase() === 'AVTA') {
          this.initFleetMonthlyAlertData();
        }

        if (this.fleetID.toUpperCase() === 'STAT') {
          this.options = this.optionsInMetric;
        }
      });
  }

  private loadData() {
    const beginDate = moment(this.selectedMonth.value).startOf('month').toDate();
    const endDate = moment(this.selectedMonth.value).endOf('month').toDate();

    this.dataService.getVehicleDailyUsageDaysSummaryByFleet$(this.fleetID, beginDate, endDate)
      .subscribe(data => {
        // monthly table data
        this.dataFleetMonthly = data;
        // monthly chart data
        this.loadMonthlyChartData();
      });

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

  private loadMonthlyChartData(): void {
    let labels = [];
    let data = [];
    if (this.dataFleetMonthly && this.dataFleetMonthly[0]) {
      labels = this.dataFleetMonthly.map(v => v.vname);
      data = this.dataFleetMonthly.map(v => v[this.optionSelected.key]);
    }
    this.chartFleetMonthly.data = {
      labels: labels,
      datasets: [
        {
          label: this.optionSelected.name,
          data: data,
          backgroundColor: '#4bc0c0',
          borderColor: '#4bc0c0',
          borderWidth: 1
        }
      ]
    };
    this.chartFleetMonthly.reinit();
  }

  private updateMonthlyChartData(): void {
   if (this.dataFleetMonthly && this.dataFleetMonthly[0]) {
      this.chartFleetMonthly.data.datasets[0].data =
        this.dataFleetMonthly.map(v => v[this.optionSelected.key]);
   }
    this.chartFleetMonthly.data.datasets[0].label = this.optionSelected.name;
    this.chartFleetMonthly.refresh();
  }

  /*** Common Section ***/
  private loadFleet(): void {
    this.route.params
      .switchMap((params: Params) => Rx.Observable.of(params['fname']))
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
        const contentDataURL = canvas.toDataURL('image/png');
        const pdf = new jsPDF('landscape');
        pdf.addImage(contentDataURL, 'PNG', 10, 10);
        pdf.save('Vehicle.DualCharts.pdf');
      }
    })
  }
}
