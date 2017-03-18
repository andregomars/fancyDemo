import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { IMyOptions, IMyDateRangeModel } from 'mydaterangepicker';
import * as moment from 'moment';
import { UIChart } from 'primeng/primeng';

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

    vehicleID: string;

    //Daily Mileage Chart
    optionMileageDateRangePicker: IMyOptions;
    dataMileageChart: any;
    optionMileageChart: any;
    
    //SOC & Energy Chart
    optionSocEnergyDateRangePicker: IMyOptions;
    dataSocEnergyChart: any;
    optionSocEnergyChart: any;


    @ViewChild("charts")
    charts: ElementRef;
    @ViewChild("chartMileage")
    chartMileage: UIChart;
    @ViewChild("chartSocEnergy")
    chartSocEnergy: UIChart;


    constructor(
        private route: ActivatedRoute,
        private dataService: DataLocalService
    ) { }

    ngOnInit(): void {
        this.loadVehicle();
        
        this.initMilageDateRangePicker();
        this.initMileageChart();

        this.initSocEnergyDateRangePicker();
        this.initSocEnergyChartOption();
        this.initSocEnergyChartData();
    }

    private loadVehicle(): void {
        this.route.params
            .switchMap((params: Params) => new Array(params["vid"]))
            .subscribe((vid: string) => this.vehicleID = vid);
    }

    private onMileageDateChanged(event: IMyDateRangeModel): void {
        if (event.beginJsDate && event.endJsDate) {
            let dataChanged = this.dataService.getVehicleDailyMileage(event.beginJsDate, event.endJsDate);
            this.chartMileage.data.labels = dataChanged.labels;
            this.chartMileage.data.datasets[0].data = dataChanged.data;
            this.chartMileage.refresh();
        }
    }

    private onSocEnergyDateChanged(event: IMyDateRangeModel): void {
        if (event.beginJsDate && event.endJsDate) {
            this.updateSocEnergyChartData(event.beginJsDate, event.endJsDate);
        }
    }

    private initMilageDateRangePicker(): void {
        this.optionMileageDateRangePicker = this.getDefaultDateRangePickerOptions();
    }

    private initSocEnergyDateRangePicker(): void {
        this.optionSocEnergyDateRangePicker = this.getDefaultDateRangePickerOptions();
    }

    private getDefaultDateRangePickerOptions(): any {
        return {
            dateFormat: "mm/dd/yyyy",
            width: "200px",
            height: "23px",
            selectionTxtFontSize: "12px",
            editableDateRangeField: false
        };
    }

    private initMileageChart(): void {
        this.dataMileageChart = this.dataService.getBackwardDaysVehicleDailyMileage(14);
        this.optionMileageChart = {
            responsive: false,
            maintainAspectRatio: true,
            legend: {
                display: false
            },
            scales: {
                xAxes: [{
                    ticks: {
                        callback: function(value, index, values) {
                        return moment(value).format('MM/DD');
                        }
                    }
                    }],
                yAxes: [{
                    ticks: {
                        min: 0,
                        max: 100
                    }
                }]
            }
        };
        this.resetChartDefaultOptions(this.optionMileageChart);
    }

    private initSocEnergyChartData(): void {
        let endDate = new Date();
        let beginDate = this.dataService.getDateOfACoupleWeeksAgo(endDate);
        let data = this.dataService.getVehicleDailySocEnergy(beginDate, endDate);
        this.dataSocEnergyChart = {
            labels: data.labels, 
            datasets: [{
                label: "SOC charged",
                data: data.dataSocCharged,
                yAxisID: 'ySocCharged',
                fill: true,
                borderColor: '#4bc0c0',
                borderWidth: 1
            }, {
                label: "SOC used",
                data: data.dataSocUsed,
                yAxisID: 'ySocUsed',
                borderColor: '#565656',
                borderWidth: 1
            }, {
                label: "Energy charged",
                data: data.dataEnergyCharged,
                yAxisID: 'yEnergyCharged',
                borderColor: '#4286f4',
                borderWidth: 1
            }, {
                label: "Energy used",
                data: data.dataEnergyUsed,
                yAxisID: 'yEnergyUsed',
                borderColor: '#f47d41',
                borderWidth: 1
            }]
        }
    }

    private updateSocEnergyChartData(beginDate: Date, endDate: Date): void {
        let data = this.dataService.getVehicleDailySocEnergy(beginDate, endDate);
        this.chartSocEnergy.data.labels = data.labels;
        this.chartSocEnergy.data.datasets[0].data = data.dataSocCharged;
        this.chartSocEnergy.data.datasets[1].data = data.dataSocUsed;
        this.chartSocEnergy.data.datasets[2].data = data.dataEnergyCharged;
        this.chartSocEnergy.data.datasets[3].data = data.dataEnergyUsed;
        this.chartSocEnergy.refresh();
    }

    private initSocEnergyChartOption(): void {
        this.optionSocEnergyChart = {
            legend: {
                onClick: (e) => e.stopPropagation()
            },
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
                        max: 100
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
                        max: 100
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
                        max: 2500
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
                        max: 2500
                    }
               }]
            }
        };
        this.resetChartDefaultOptions(this.optionSocEnergyChart);
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
        option.scales.xAxes = [{
            ticks: {
                callback: function(value, index, values) {
                return moment(value).format('MM/DD');
                }
            }
        }];
    }


    private exportCharts(): void {
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
