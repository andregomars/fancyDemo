import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { DailyNumber } from '../models/dailyNumber.model';

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
  
  private getRandomInt(min, max): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
}

