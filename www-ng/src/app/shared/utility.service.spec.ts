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
});
