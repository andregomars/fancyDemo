import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { IMyOptions, IMyDateRangeModel } from 'mydaterangepicker';
import { DataTableModule } from 'primeng/primeng';
import * as Rx from 'rxjs/Rx';
let jsPDF = require("jspdf");
let html2canvas = require("html2canvas");

import { DataLocalService } from '../shared/data-local.service';
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

  //child views
  @ViewChild("charts")
  charts: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataLocalService
  ) { }

  ngOnInit() {
    this.loadFleet();
    this.loadFleetMonthlyData();
  }

  private loadFleetMonthlyData() {
    let vehicles = this.dataService.getVehiclesIdentityByFleet(this.fleetID).map(v => new Vehicle(v.vid));
    this.dataFleetMonthly = this.dataService.getRandomMonthlyDataSetWithVehicles(vehicles);
  }

  /*** Common Section ***/
  private loadFleet(): void {
    this.route.params
       .switchMap((params: Params) => Rx.Observable.create(ob=>ob.next(params["fid"])))
       .subscribe((fid: string) => this.fleetID = fid);
  }

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
