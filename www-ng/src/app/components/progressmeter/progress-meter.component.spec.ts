import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressMeterComponent } from './progress-meter.component';

describe('ProgressMeterComponent', () => {
  let component: ProgressMeterComponent;
  let fixture: ComponentFixture<ProgressMeterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressMeterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressMeterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
