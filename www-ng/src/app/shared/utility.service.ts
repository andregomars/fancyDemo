import { Injectable } from '@angular/core';

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
    let v = new DailyNumber(new Date(), 12);
    let array = new Array<DailyNumber>();
    array.push(v);

    return array;
  }
  
  private getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
}

class DailyNumber {
    readonly date: Date;
    readonly value: number;

    constructor (date: Date, value: number) {
        this.date = date;
        this.value = value;
    }
}
