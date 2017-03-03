import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { DataTableModule, ProgressBarModule } from 'primeng/primeng';
import { JustgageModule } from 'angular2-justgage';
import './shared/rxjs-extensions';
import './shared/vendor';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FleetComponent } from './fleet/fleet.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { DataTableComponent } from './fleet/datatable.component';
import { DataCardsComponent } from './fleet/datacards.component';
import { MenuComponent } from './menu/menu.component';
import { ProgressBarComponent } from './shared/progressbar.component';

import { DataService } from './shared/data.service';
import { DataLocalService } from './shared/data-local.service';

@NgModule({
  declarations: [
    AppComponent,
    FleetComponent,
    VehicleComponent,
    DataTableComponent,
    DataCardsComponent,
    MenuComponent,
    ProgressBarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    DataTableModule,
    ProgressBarModule,
    JustgageModule
  ],
  providers: [
    DataService,
    DataLocalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
