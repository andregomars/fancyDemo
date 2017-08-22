import { NgModule }      from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import { DrillComponent } from './drill/drill.component';
import { FleetComponent } from './fleet/fleet.component';
import { FleetSelectionComponent } from './fleet-selection/fleet-selection.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { AnalysisDailyComponent } from './analysis-daily/analysis-daily.component';
import { AnalysisAlertComponent } from './analysis-alert/analysis-alert.component';
import { DailyReportComponent } from './daily-report/daily-report.component';
import { MonthlyReportComponent } from './monthly-report/monthly-report.component';
import { DailyLogComponent } from './daily-log/daily-log.component';
import { AuthGuardService } from './shared/auth-guard.service';

const routes: Routes = [
    // { path: 'drill', component: DrillComponent },
    { path: 'fleet', component: FleetSelectionComponent },
    { path: 'fleet/:fname', component: FleetComponent, canActivate: [AuthGuardService] },
    { path: 'vehicle/:vname', component: VehicleComponent, canActivate: [AuthGuardService] },
    { path: 'vehicledaily/:vname', component: AnalysisDailyComponent, canActivate: [AuthGuardService] },
    { path: 'vehiclealert/:vname', component: AnalysisAlertComponent, canActivate: [AuthGuardService] },
    { path: 'dailyreport/:fname', component: DailyReportComponent, canActivate: [AuthGuardService] },
    { path: 'monthlyreport/:fname', component: MonthlyReportComponent, canActivate: [AuthGuardService] },
    { path: 'dailylog/:fname', component: DailyLogComponent, canActivate: [AuthGuardService] },

    { path: 'ioc/index.php/fleet', component: FleetSelectionComponent },
    { path: 'ioc/index.php/fleet/:fname', component: FleetComponent },
    { path: 'ioc/index.php/vehicle/:vname', component: VehicleComponent },
    { path: 'ioc/index.php/vehicledaily/:vname', component: AnalysisDailyComponent },
    { path: 'ioc/index.php/vehiclealert/:vname', component: AnalysisAlertComponent },
    { path: 'ioc/index.php/dailyreport/:fname', component: DailyReportComponent },
    { path: 'ioc/index.php/monthlyreport/:fname', component: MonthlyReportComponent },
    { path: 'ioc/index.php/dailylog/:fname', component: DailyLogComponent },

    { path: '', redirectTo: '/fleet', pathMatch: 'full' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  providers: [ AuthGuardService ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
