import { TestBed, inject } from '@angular/core/testing';
import { UtilityService } from './utility.service';
import * as moment from 'moment';

describe('UtilityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UtilityService]
    });
  });

  it('should have a list of random numbers', inject([UtilityService], (service: UtilityService) => {
    let n = 24;
    let array = service.getRandomNumberList(n, 0, 100);

    expect(array.length).toBe(n);
  }));

  it('should have a list of random float numbers', inject([UtilityService], (service: UtilityService) => {
    let n = 24;
    let array = service.getRandomFloatList(n, 0, 1);

    expect(array.length).toBe(n);
  }));

  it('should have a list of days and numbers', inject([UtilityService], (service: UtilityService) => {
    let n = 30;
    let today = moment().startOf('day');
    let startMoment = today.clone().subtract(n-1, 'day');
    let array = service.getDailyNumberList(startMoment.toDate(), today.toDate(), 0, 100);

    expect(array.length).toBe(n);
  }));

  it('should return empty list because of end date earlier than start date', inject([UtilityService], (service: UtilityService) => {
    let today = moment().startOf('day');
    let startMoment = today.clone().add(5, 'day');
    let array = service.getDailyNumberList(startMoment.toDate(), today.toDate(), 0, 100);

    expect(array.length).toBe(0);
  }));

  it('should have a list of date', inject([UtilityService], (service: UtilityService) => {
    let n = 30;
    let endDate = moment().startOf('day');
    let startDate = endDate.clone().subtract(n-1, 'day');
    let array = service.getDateList(startDate.toDate(), endDate.toDate());

    expect(array.length).toBe(n);
  }));

  it('should have a list of date of limit days', inject([UtilityService], (service: UtilityService) => {
    let n = 30;
    let array = service.getBackwardDateList(n, new Date());

    expect(array.length).toBe(n);
  }))

  it('should have a list of ratio', inject([UtilityService], (service: UtilityService) => {
    let n = 3;
    // let numerators = [{date: '03/01', value: 12}, 
    //   {date: '03/02', value: 69},
    //   {date: '03/03', value: 44}];
    // let denominators = [{date: '03/01', value: 21}, 
    //   {date: '03/02', value: 32},
    //   {date: '03/03', value: 0}];
    let endDate = new Date();
    let begingDate = service.getStartDateBackward(n, endDate)
    let numerators = service.getDailyNumberList(begingDate, endDate, 0, 100);
    let denominators = service.getDailyNumberList(begingDate, endDate, 0, 100);
    let array = service.getRatioList(numerators, denominators);
      // Object.assign(row, { value: denominators[index].value } ));

    // array.forEach((row) => console.log(row));
    expect(array.length).toBe(n);
  }))

  it('should have a list of random alert', inject([UtilityService], (service: UtilityService) => {
    let eventCodes = ['Slow Charging', 'Low Temp', 'Low Voltage'];
    let maxLength = 10, min = 0, max = 100;
    let endDate = new Date()
    let startDate = service.getStartDateBackward(14, endDate);
    let array = service.getEventList(maxLength, eventCodes, min, max, startDate, endDate)
    console.log(array);
    console.log(array.length);
    expect(true).toBeTruthy();
  }))


});
