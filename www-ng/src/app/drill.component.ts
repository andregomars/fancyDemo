import { Component, OnInit, ElementRef, AfterViewInit, Renderer, ViewChild } from '@angular/core';
import { DataTableModule, ChartModule } from 'primeng/primeng';
import {IMyOptions, IMyDateModel} from 'mydatepicker';
let jsPDF = require("jspdf")
let html2canvas = require("html2canvas");

import { DataCardsComponent } from "./fleet/datacards.component";


@Component({
  moduleId: module.id,
  templateUrl: "drill.component.html"
})
export class DrillComponent implements OnInit, AfterViewInit {

    @ViewChild("txtName")
    el: ElementRef;

    @ViewChild("export")
    elExport: ElementRef;

    data: any;
    dataChart: any;
    optionDatePicker: IMyOptions;

    constructor(private renderer: Renderer) {
    }

    ngOnInit(): void {
        this.optionDatePicker = {
            dateFormat: "mm/dd/yyyy",
            width: "250px",
            editableDateField: false,
            openSelectorOnInputClick: true
        };

        this.data = [{
            vid: "vid01",
            soc: "80",
            status: "On"
        }, {
            vid: "vid02",
            soc: "20",
            status: "Off"
        }, {
            vid: "vid03",
            soc: "50",
            status: "On"
        }];

        this.dataChart = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'My First dataset',
                    backgroundColor: '#42A5F5',
                    borderColor: '#1E88E5',
                    data: [65, 59, 80, 81, 56, 55, 40]
                },
                {
                    label: 'My Second dataset',
                    backgroundColor: '#9CCC65',
                    borderColor: '#7CB342',
                    data: [28, 48, 40, 19, 86, 27, 90]
                }
            ]
        }
    }

    ngAfterViewInit(): void {
        this.renderer.invokeElementMethod(this.el.nativeElement, "focus");
    }

    onDateChanged(event: IMyDateModel) {
        if (event.jsdate) 
            console.log("date is: " + event.jsdate.toString());
    }

    exportPDF(): void {
        html2canvas(this.elExport.nativeElement, {
            onrendered: function(canvas) {
                const contentDataURL = canvas.toDataURL("image/png");
                let pdf = new jsPDF();
                pdf.addImage(contentDataURL, "PNG", 10, 10);
                pdf.save("export.pdf");
            }
        })
    }

}