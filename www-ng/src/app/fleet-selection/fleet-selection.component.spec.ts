import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FleetSelectionComponent } from './fleet-selection.component';

describe('FleetSelectionComponent', () => {
  let component: FleetSelectionComponent;
  let fixture: ComponentFixture<FleetSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FleetSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FleetSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
