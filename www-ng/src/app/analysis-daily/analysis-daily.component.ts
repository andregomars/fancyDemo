import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { IMyOptions, IMyDateModel } from 'mydatepicker';
import 'rxjs/add/operator/switchMap';
let jsPDF = require("jspdf");
let html2canvas = require("html2canvas");

@Component({
  selector: 'app-analysis-daily',
  templateUrl: './analysis-daily.component.html',
  styleUrls: ['./analysis-daily.component.css']
})
export class AnalysisDailyComponent implements OnInit {

  optionMileageDatePicker: any;
  dataMileageChar: any;
  optionMileageChar: any;

  @ViewChild("charts")
  charts: ElementRef;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

  onDateChanged(event: IMyDateModel) {
      if (event.jsdate) {

      }
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
