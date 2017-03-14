import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { IMyOptions, IMyDateModel } from 'mydatepicker';
import 'rxjs/add/operator/switchMap';
let jsPDF = require("jspdf");
let html2canvas = require("html2canvas");

import { DataLocalService } from '../shared/data-local.service';


@Component({
  selector: 'app-analysis-daily',
  templateUrl: './analysis-daily.component.html',
  styleUrls: ['./analysis-daily.component.css']
})
export class AnalysisDailyComponent implements OnInit {

  optionMileageDatePicker: any;
  dataMileageChart: any;
  optionMileageChart: any;
  vehicleID: string;

  @ViewChild("charts")
  charts: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataLocalService
  ) { }

  ngOnInit(): void {
      this.loadVehicle();
      this.initMilageDatePicker();
      this.initMileageChart();
  }

  loadVehicle(): void {
    this.route.params
      .switchMap((params: Params) => new Array(params["vid"]))
      .subscribe((vid: string) => this.vehicleID = vid);
  }

  onDateChanged(event: IMyDateModel) {
      if (event.jsdate) {

      }
  }

  initMilageDatePicker(): void {
      this.optionMileageDatePicker = {
            dateFormat: "mm/dd/yyyy",
            width: "200px",
            height: "23px",
            editableDateField: false,
            openSelectorOnInputClick: true,
            selectionTxtFontSize: "12px"
      };
  }

  initMileageChart(): void {
      this.dataMileageChart = this.dataService.getLatest30DaysVehicleDailyMileage();
      this.optionMileageChart = {
          responsive: false,
          //maintainAspectRatio: false,
          scales: {
              xAxes: [{
                  type: 'time',
                  time: {
                      displayFormats: {
                          'day': 'MM/DD'
                      }
                  }
              }]
          }
      };
  }


  exportCharts(): void {
      html2canvas(this.charts.nativeElement, {
          onrendered: function(canvas) {
              const contentDataURL = canvas.toDataURL("image/png");
              let pdf = new jsPDF();
              pdf.addImage(contentDataURL, "PNG", 10, 10);
              pdf.save("Vehicle.DualCharts.pdf");
          }
      })
  }
}
