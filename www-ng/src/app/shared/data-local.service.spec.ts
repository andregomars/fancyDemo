import { TestBed, inject } from '@angular/core/testing';
import { DataLocalService } from './data-local.service';
import { Vehicle } from '../models/vehicle.model';
import { Fleet } from '../models/fleet.model';

describe('DataLocalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataLocalService]
    });
  });

  it('should have a list of random monthly dataset', inject([DataLocalService], (service: DataLocalService) => {
    let vehicles: Array<Vehicle> = service.getAllFleetsWithVehicles()[0].vehicles;
    let array = service.getRandomMonthlyDataSetWithVehicles(vehicles);

    // console.log(array);
    expect(true).toBeTruthy();
  }));

  it('should have a list of log', inject([DataLocalService], (service: DataLocalService) => {
    // let array = service.getLogsInMonthOfDate(new Date());
    let array = service.getLogsInMonthOfDate(new Date('2017-01-23'));

    // array.map(x=>console.log(x));
    expect(true).toBeTruthy();
  }));

  it('should have a list of log with vehicles', inject([DataLocalService], (service: DataLocalService) => {
    // let array = service.getLogsInMonthOfDate(new Date());
    let vehicles: Array<Vehicle> = service.getAllFleetsWithVehicles()[0].vehicles;
    let array = service.getLogsInMonthOfDateByVehicles(vehicles, new Date('2017-01-23'));

    // array.map(x=>console.log(x));
    expect(true).toBeTruthy();
  }))

});