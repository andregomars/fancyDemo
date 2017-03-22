import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleDailyLogComponent } from './vehicle-daily-log.component';

describe('VehicleDailyLogComponent', () => {
  let component: VehicleDailyLogComponent;
  let fixture: ComponentFixture<VehicleDailyLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleDailyLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleDailyLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
