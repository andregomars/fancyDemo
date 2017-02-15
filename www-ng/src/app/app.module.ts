import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import './shared/rxjs-extensions';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FleetComponent } from './fleet/fleet.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { DataTableComponent } from './fleet/datatable.component';
import { DataCardsComponent } from './fleet/datacards.component';
import { DataService } from './shared/data.service';
import { DataLocalService } from './shared/data-local.service';

@NgModule({
  declarations: [
    AppComponent,
    FleetComponent,
    VehicleComponent,
    DataTableComponent,
    DataCardsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    Ng2SmartTableModule
  ],
  providers: [
    DataService,
    DataLocalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
