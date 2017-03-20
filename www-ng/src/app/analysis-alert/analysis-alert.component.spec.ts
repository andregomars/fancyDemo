import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisAlertComponent } from './analysis-alert.component';

describe('AnalysisAlertComponent', () => {
  let component: AnalysisAlertComponent;
  let fixture: ComponentFixture<AnalysisAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalysisAlertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
