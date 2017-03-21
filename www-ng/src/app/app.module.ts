import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { DataTableModule, ProgressBarModule, 
        ChartModule, MegaMenuModule, TieredMenuModule } from 'primeng/primeng';
import { MyDatePickerModule } from 'mydatepicker';
import { MyDateRangePickerModule } from 'mydaterangepicker';
import { JustgageModule } from 'angular2-justgage';
import './shared/rxjs-extensions';
import './shared/vendor';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DrillComponent } from './drill/drill.component';
import { FleetComponent } from './fleet/fleet.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { DataTableComponent } from './fleet/datatable.component';
import { DataCardsComponent } from './fleet/datacards.component';
import { MenuComponent } from './menu/menu.component';
import { ProgressBarComponent } from './components/progressbar/progressbar.component';

import { DataService } from './shared/data.service';
import { DataLocalService } from './shared/data-local.service';
import { AnalysisDailyComponent } from './analysis-daily/analysis-daily.component';
import { AnalysisAlertComponent } from './analysis-alert/analysis-alert.component';
import { MonthlyReportComponent } from './monthly-report/monthly-report.component';

@NgModule({
  declarations: [
    AppComponent,
    DrillComponent,
    FleetComponent,
    VehicleComponent,
    DataTableComponent,
    DataCardsComponent,
    MenuComponent,
    ProgressBarComponent,
    AnalysisDailyComponent,
    AnalysisAlertComponent,
    MonthlyReportComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    DataTableModule,
    ProgressBarModule,
    ChartModule,
    MyDatePickerModule,
    MyDateRangePickerModule,
    TieredMenuModule,
    MegaMenuModule,
    JustgageModule
  ],
  providers: [
    DataService,
    DataLocalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
