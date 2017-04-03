import { TestBed, inject } from '@angular/core/testing';

import { FleetTrackerService } from './fleet-tracker.service';

describe('FleetTrackerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FleetTrackerService]
    });
  });

  // it('should ...', inject([FleetTrackerService], (service: FleetTrackerService) => {
  //   expect(service).toBeTruthy();
  // }));
});
