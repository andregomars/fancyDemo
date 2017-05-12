import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { VehicleSnapshot } from '../models/vehicle-snapshot';
import { UIChart } from 'primeng/primeng';
import { YAxis } from '../models/yAxis.model';
import * as moment from 'moment';
import * as Rx from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-vehicle-dual-chart',
  templateUrl: './vehicle-dual-chart.component.html',
  styleUrls: ['./vehicle-dual-chart.component.css']
})
export class VehicleDualChartComponent implements OnInit {

  @Input("data")
  snapshotList$: Observable<Array<VehicleSnapshot>>;
  snapshotList: Array<VehicleSnapshot>;

  @ViewChild("chartSocRange")
  chartSocRange: UIChart;

  dataChart: any;
  optionsChart: any;
  // snapshotList$: Observable<Array<VehicleSnapshot>>;

  constructor() { }

  ngOnInit() {
    // this.snapshotList$ = Rx.Observable.of(this.snapshotList);
    if (this.snapshotList$)
      this.snapshotList$.subscribe(list => { 
        console.log("subed!");
        let leftY = new YAxis("SOC", "#4bc0c0", 0, 100);
        let rightY = new YAxis("kWh", "#565656", 0, 600);
        if (list && list.length > 1)
        {
          this.dataChart = this.getChartData(list);
          this.optionsChart = this.getChartOptions(leftY, rightY);
        }
      });
  }

  getChartData(list: VehicleSnapshot[]): any {
    var filtered_A = list.filter(e => e.code === '1E').slice(0, 10);
    var filtered_B = list.filter(e => e.code === '1J').slice(0, 10);

    var lables = filtered_A.map(el => moment(el.time).format('hh:mm'));
    var data_A = filtered_A.map(el => moment(el.value));
    var data_B = filtered_B.map(el => moment(el.value));

    return {
      labels: lables,
      datasets: [
        {
          type: 'line',
          label: 'SOC',
          data: data_A,
          yAxisID: 'ySOC',
          fill: false,
          borderColor: '#4bc0c0'
        }, {
          type: 'line',
          label: 'kWh',
          data: data_B,
          yAxisID: 'ykWh',
          fill: false,
          borderColor: '#565656',
          borderWidth: 1
        }
      ]
    }
  }

  getChartOptions(leftY: YAxis, rightY: YAxis): any {
    return {
      animation: {
        duration: 0
      },
      hover: {
        animationDuration: 0
      },
      scales: {
        yAxes: [{
          id: 'y' + leftY.label,
          scaleLabel: {
            display: false,
            labelString: leftY.label,
            fontColor: leftY.color
          },
          type: 'linear',
          position: 'left',
          ticks: {
            fontColor: leftY.color,
            max: leftY.max,
            min: leftY.min
          }
        }, {
          id: 'y' + rightY.label,
          scaleLabel: {
            display: false,
            labelString: rightY.label,
            fontColor: rightY.color
          },
          type: 'linear',
          position: 'right',
          ticks: {
            fontColor: rightY.color,
            max: rightY.max,
            min: rightY.min
          }
        }]
      }
    };
  }
}
