import { Injectable } from '@angular/core';
import * as moment from 'moment';
import * as _ from 'lodash';
import { DailyNumber } from '../models/dailyNumber.model';
import { VehicleStatus } from '../models/vehicle-status';
import { VehicleIdentity } from '../models/vehicle-identity'

@Injectable()
export class UtilityService {

  constructor() { }

  getRandomNumberList(length: number, min: number, max: number): Array<number> {
    if (length < 0 || min > max) return [];
    
    let array = new Array<number>();
    let i = 0;
    while (i < length) {
      array.push(this.getRandomInt(min, max));
      i++;
    }
    return array;
  }

  getRandomFloatList(length: number, min: number, max: number): Array<number> {
    if (length < 0 || min > max) return [];
    
    let array = new Array<number>();
    let i = 0;
    while (i < length) {
      array.push(this.getRandomFloat(min, max));
      i++;
    }
    return array;
  }

  getDailyNumberList(startDate: Date, endDate: Date, min: number, max: number): Array<DailyNumber> {
    let startMoment = moment(startDate).startOf('day');
    let endMoment = moment(endDate).startOf('day');
    if (startMoment > endMoment) return [];
    
    let array = new Array<DailyNumber>();
    let idxMoment = startMoment.clone();

    while (idxMoment <= endMoment )
    {
      array.push(new DailyNumber(idxMoment.toDate(), this.getRandomInt(min, max)));
      idxMoment.add(1, 'day');
    }

    return array;
  }

  getDateList(startDate: Date, endDate: Date): Array<Date> {
    let startMoment = moment(startDate).startOf('day');
    let endMoment = moment(endDate).startOf('day');
    if (startMoment > endMoment) return [];
    
    let array = new Array<Date>();
    let idxMoment = startMoment.clone();

    while (idxMoment <= endMoment )
    {
      array.push(idxMoment.toDate());
      idxMoment.add(1, 'day');
    }

    return array;
  }

  getBackwardDateList(backwardDays: number, endDate: Date): Array<Date> {
    let startDate = this.getStartDateBackward(backwardDays, endDate);
    return this.getDateList(startDate, endDate);
  }

  getStartDateBackward(backwardDays: number, endDate: Date): Date {
    return moment(endDate).clone().subtract(backwardDays-1, 'day').toDate();
  }

  getRatioList(numerators: Array<DailyNumber>, denominators: Array<DailyNumber>): Array<any> {
    return numerators.map(
      (nRow, index) => 
        {
          let dRow = denominators[index];
          let ratio = dRow.value === 0? 99999.99 : nRow.value / dRow.value;
          return { date: nRow.date, value: ratio };
        } 
      ); 
  }

  getEventList(maxLength: number, eventCodes: Array<string>, 
      min: number, max: number, 
      beginDate: Date, endDate: Date,): Array<any> {
    let n = _.random(1, maxLength);
    let types = new Array<string>(n);
    let i = n;
    while(i--) types[i] = _.sample(eventCodes);

    let values = new Array<number>(n);
    i = n;
    while(i--) values[i] = _.random(min, max);

    let dates = new Array<Date>(n);
    i = n;
    let days = this.getDateList(beginDate, endDate);
    while(i--) dates[i] = _.sample(days);

    let alertKeys = ["type", "value", "time"];
    let alertValues = _.zip<string|number|Date>(types, values, dates);
    let events = alertValues.map((vRow)=>_.zipObject(alertKeys, vRow));

    return events;
  }
  

  getLatestMonths(length: number): Array<string> {
    let array = new Array(length);
    while(length--) { 
      let month = moment().startOf('month').subtract(length, 'month');
      array[length] = { 
        name: month.format('MMM'),
        value: month.toDate()
      }
    }
    return array;
  }

  getMonthsByYear(year: number): Array<any> {
  	//no months return if input year is over this year
  	if (year > moment().year()) return [];

    var n = 12;
    var jan = moment().year(year).startOf('year');

    //current year, only load months till this month
    if (year === moment().year()) 
      n = moment().startOf('month').diff(jan, 'months') + 1;

    return new Array(n).fill(jan)
    	.map((m,i)=>moment(m).add(i,'months'))
    	.map(x=> {
    		return {
    			name: x.format('MMM'),
    			value: x.toDate()
    		}
    	});
  }

  getDatesInMonth(date: Date): Array<Date> {
    let beginDate = moment(date).startOf('month');
    let lastDayOfMonth = moment(date).endOf('month').startOf('day');
    let endDate = moment() < lastDayOfMonth ? moment().startOf('day') : lastDayOfMonth; 
    let size = endDate.diff(beginDate, 'days');
    let array = new Array(size);
    do { 
      array[size] = beginDate.clone().add(size, 'days').toDate();
    } while(size--)

    return array;
  }

  genRandomVehicleStatus(vehicle: VehicleIdentity): VehicleStatus {
      let soc: number = _.random(0, 100, false);
      // let status: string = _.sample(['Charging', 'N/A']);
      let status: number = _.random(0, 1, false);
      let range: number = +_.random(0, 250, true).toFixed(1);
      let mileage: number = +_.random(0, 250, true).toFixed(1);
      let voltage: number = _.random(0, 800, false);
      let current: number = _.random(-400, 400, false);
      let temperaturehigh: number = _.random(-40, 80, false);
      let temperaturelow: number = _.random(80, 220, false);
      let speed: number = _.random(0, 65, false);
      let remainingenergy: number = _.random(0, 60, false);
      let actualdistance: number = _.random(0, 200, false);
      let updated: Date = moment().subtract(_.random(300,3600), 'seconds').toDate(); 
      // let updated: string = moment().subtract(_.random(300,3600), 'seconds').format('MM/DD/YYYY hh:mm:ss'); 
      let lat: number = 40.734593;
      let lng: number = -73.994646;

      return new VehicleStatus('00000000-0000-0000-0000-000000000000',
        vehicle.vid, vehicle.vname, vehicle.fid, vehicle.fname, 
        'bus', lat, lng, 0, 0, 0, soc, status, range, mileage, voltage, current, 
        temperaturehigh, temperaturelow, speed, remainingenergy, actualdistance, 0, updated);
    }

  //*** private helper methods ***
  private getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  private getRandomFloat(min: number, max: number): number {
    return +(Math.random() * (max - min) + min).toFixed(2);
  }
}

