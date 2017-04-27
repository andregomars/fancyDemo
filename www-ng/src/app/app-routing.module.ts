import { NgModule }      from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DrillComponent } from './drill/drill.component';
import { FleetComponent } from './fleet/fleet.component';
import { FleetSelectionComponent } from './fleet-selection/fleet-selection.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { AnalysisDailyComponent } from './analysis-daily/analysis-daily.component';
import { AnalysisAlertComponent } from './analysis-alert/analysis-alert.component';
import { MonthlyReportComponent } from './monthly-report/monthly-report.component';
import { DailyReportComponent } from './daily-report/daily-report.component';

const routes: Routes = [
    { path: 'drill', component: DrillComponent },
    { path: 'fleet', component: FleetSelectionComponent },
    { path: 'fleet/:fname', component: FleetComponent },
    { path: 'vehicle/:vname', component: VehicleComponent },
    { path: 'vehicledaily/:vname', component: AnalysisDailyComponent },
    { path: 'vehiclealert/:vname', component: AnalysisAlertComponent },
    { path: 'monthlyreport/:fname', component: MonthlyReportComponent },
    { path: 'dailyreport/:fname', component: DailyReportComponent },
    { path: '', redirectTo: '/fleet', pathMatch: 'full' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
