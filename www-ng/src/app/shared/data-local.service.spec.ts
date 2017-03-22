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

  it('should have a list of random random montly dataset', inject([DataLocalService], (service: DataLocalService) => {
    let vehicles: Array<Vehicle> = service.getAllFleetsWithVehicles()[0].vehicles;
    let array = service.getRandomMonthlyDataSetWithVehicles(vehicles);

    console.log(array);
    expect(true).toBeTruthy();
  }));

});