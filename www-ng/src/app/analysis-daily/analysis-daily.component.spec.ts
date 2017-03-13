import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisDailyComponent } from './analysis-daily.component';

describe('AnalysisDailyComponent', () => {
  let component: AnalysisDailyComponent;
  let fixture: ComponentFixture<AnalysisDailyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalysisDailyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisDailyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
