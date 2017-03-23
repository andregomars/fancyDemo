import { NgModule }      from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DrillComponent } from './drill/drill.component';
import { FleetComponent } from './fleet/fleet.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { AnalysisDailyComponent } from './analysis-daily/analysis-daily.component';
import { AnalysisAlertComponent } from './analysis-alert/analysis-alert.component';
import { MonthlyReportComponent } from './monthly-report/monthly-report.component';
import { DailyReportComponent } from './daily-report/daily-report.component';

const routes: Routes = [
    { path: 'drill', component: DrillComponent },
    { path: 'fleet', component: FleetComponent },
    { path: 'vehicle/:vid', component: VehicleComponent },
    { path: 'vehicledaily/:vid', component: AnalysisDailyComponent },
    { path: 'vehiclealert/:vid', component: AnalysisAlertComponent },
    { path: 'monthlyreport', component: MonthlyReportComponent },
    { path: 'dailyreport', component: DailyReportComponent },
    { path: '', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
