import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { IMyOptions, IMyDateRangeModel } from 'mydaterangepicker';
import * as moment from 'moment';
import { UIChart } from 'primeng/primeng';
import * as Rx from 'rxjs/Rx';

let jsPDF = require("jspdf");
let html2canvas = require("html2canvas");

import { DataService } from '../shared/data.service';


@Component({
    selector: 'app-analysis-daily',
    templateUrl: './analysis-daily.component.html',
    styleUrls: ['./analysis-daily.component.css']
})
export class AnalysisDailyComponent implements OnInit {

    fleetID: string;
    vehicleID: string;

    //Daily Mileage Chart properties
    optionMileageDateRangePicker: IMyOptions;
    dataMileageChart: any;
    optionMileageChart: any;
    
    //SOC & Energy Chart properties
    optionSocEnergyDateRangePicker: IMyOptions;
    dataSocEnergyChart: any;
    optionSocEnergyChart: any;

    //SOC, Mileage & Energy Chart properties
    optionSocMileageEnergyDateRangePicker: IMyOptions;
    dataSocMileageEnergyChart: any;
    optionSocMileageEnergyChart: any

    //child views
    @ViewChild("charts")
    charts: ElementRef;
    @ViewChild("chartMileage")
    chartMileage: UIChart;
    @ViewChild("chartSocEnergy")
    chartSocEnergy: UIChart;
    @ViewChild("chartSocMileageEnergy")
    chartSocMileageEnergy: UIChart;

    constructor(
        private route: ActivatedRoute,
        private dataService: DataService,
    ) { }

    ngOnInit(): void {
        this.initData();
        this.loadVehicle();
    }

    private initData(): void {
        // Daily Mileage
        this.initMilageDateRangePicker();
        this.initMileageChartOption();
        this.initMileageChartData();

        // Daily SOC & Energy
        this.initSocEnergyDateRangePicker();
        this.initSocEnergyChartOption();
        this.initSocEnergyChartData();

        // Daily SOC, Mileage & Energy
        this.initSocMileageEnergyDateRangePicker();
        this.initSocMileageEnergyChartOption();
        this.initSocMileageEnergyChartData();
    }

    // private reloadData(): void {
    //     let endDate = new Date();
    //     let beginDate = this.dataService.getDateOfACoupleWeeksAgo(endDate);
    //     this.updateMileageChartData(beginDate, endDate);
    // }

    /*** Section - Daily Mileage ***/
    private initMilageDateRangePicker(): void {
        this.optionMileageDateRangePicker = this.getDefaultDateRangePickerOptions();
    }

    onMileageDateChanged(event: IMyDateRangeModel): void {
        if (event.beginJsDate && event.endJsDate) {
            this.updateMileageChartData(event.beginJsDate, event.endJsDate);
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

    private initMileageChartData(): void {
        let endDate = new Date();
        let beginDate = this.dataService.getDateOfACoupleWeeksAgo(endDate);
        let data = this.dataService.getVehicleDailySocEnergy(beginDate, endDate);
        this.dataMileageChart = {
            labels: this.dataService.getVehicleDailyMileage(beginDate, endDate).labels,
            datasets: [
                {
                    label: 'Daily Mileage',
                    data: this.dataService.getVehicleDailyMileage(beginDate, endDate).data,
                    borderColor: '#4bc0c0'
                }
            ]
        };
    }

    private updateMileageChartData(beginDate: Date, endDate: Date): void {
        let data = this.dataService.getVehicleDailyMileage(beginDate, endDate);
        let chartData = {
            labels: data.labels,
            datasets: [{
                label: 'Daily Mileage',
                data: data.data,
                boarderColor: '#4bc0c0'
            }]
        };
        this.chartMileage.data.labels = data.labels;
        this.chartMileage.data.datasets[0].data = data.data;
        // this.chartMileage.data = chartData;
        this.chartMileage.refresh();
    }

    /*** Section - Daily SOC & Energy ***/
    onSocEnergyDateChanged(event: IMyDateRangeModel): void {
        if (event.beginJsDate && event.endJsDate) {
            this.updateSocEnergyChartData(event.beginJsDate, event.endJsDate);
        }
    }

    private initSocEnergyDateRangePicker(): void {
        this.optionSocEnergyDateRangePicker = this.getDefaultDateRangePickerOptions();
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

    /*** Section - Daily SOC, Mileage & Energy ***/
    onSocMileageEnergyDateChanged(event: IMyDateRangeModel): void {
        if (event.beginJsDate && event.endJsDate) {
            this.updateSocMileageEnergyChartData(event.beginJsDate, event.endJsDate);
        }
    }

    private initSocMileageEnergyDateRangePicker(): void {
        this.optionSocMileageEnergyDateRangePicker = this.getDefaultDateRangePickerOptions();
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
                        max: 100
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
                        max: 100
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
                        max: 1
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
                        max: 25
                    }
               }]
            }
        };
        this.resetChartDefaultOptions(this.optionSocMileageEnergyChart);
    }

    private initSocMileageEnergyChartData(): void {
        let endDate = new Date();
        let beginDate = this.dataService.getDateOfACoupleWeeksAgo(endDate);
        let data = this.dataService.getVehicleDailySocMileageEnergy(beginDate, endDate);
        this.dataSocMileageEnergyChart = {
            labels: data.labels, 
            datasets: [{
                label: "SOC/Mileage",
                data: data.dataSocMileage,
                yAxisID: 'ySocMileage',
                fill: true,
                borderColor: '#4bc0c0',
                borderWidth: 1
            }, {
                label: "Mileage/SOC",
                data: data.dataMileageSoc,
                yAxisID: 'yMileageSoc',
                borderColor: '#565656',
                borderWidth: 1
            }, {
                label: "Mileage/Energy",
                data: data.dataMileageEnerg,
                yAxisID: 'yMileageEnergy',
                borderColor: '#4286f4',
                borderWidth: 1
            }, {
                label: "Energy/Mileage",
                data: data.dataEnergyMileag,
                yAxisID: 'yEnergyMileage',
                borderColor: '#f47d41',
                borderWidth: 1
            }]
        }
    }

    private updateSocMileageEnergyChartData(beginDate: Date, endDate: Date): void {
        let data = this.dataService.getVehicleDailySocMileageEnergy(beginDate, endDate);
        this.chartSocMileageEnergy.data.labels = data.labels;
        this.chartSocMileageEnergy.data.datasets[0].data = data.dataSocMileage;
        this.chartSocMileageEnergy.data.datasets[1].data = data.dataMileageSoc;
        this.chartSocMileageEnergy.data.datasets[2].data = data.dataMileageEnergy;
        this.chartSocMileageEnergy.data.datasets[3].data = data.dataEnergyMileage;
        this.chartSocMileageEnergy.refresh();
    }

    /*** Common Section ***/
    private loadVehicle(): void {
        this.route.params
            .switchMap((params: Params) => Rx.Observable.of(params["vname"]))
            .subscribe((vname: string) => { 
                this.vehicleID = vname;
                this.dataService.getAllVehiclesData$()
                    .map(el => el.find(v => v.vname === vname))
                    .map(v => v.fname)
                    .subscribe(fname => this.fleetID = fname);
            });
    }
    // private loadVehicle(): void {
    //     this.route.params
    //         .switchMap((params: Params) => Rx.Observable.create(ob=>ob.next(params["vid"])))
    //         .subscribe((vid: string) => { 
    //             this.vehicleID = vid;
    //             this.fleetID = this.dataService.getVehicleIdentity(vid).fid;
    //             // this.reloadData();
    //         });
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
        option.scales.xAxes = [{
            ticks: {
                callback: function(value, index, values) {
                    return moment(value).format('MM/DD');
                }
            }
        }];
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
