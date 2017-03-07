import { TestBed, inject } from '@angular/core/testing';

import { UtilityService } from './utility.service';

describe('UtilityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UtilityService]
    });
  });

  it('should ...', inject([UtilityService], (service: UtilityService) => {
    let n = 24;
    let array = service.getRandomNumberList(n, 0, 100);
    console.log(array);

    expect(array.length).toBe(n);
  }));
});
