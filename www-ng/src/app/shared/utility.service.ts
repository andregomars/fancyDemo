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
  
  private getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
}
