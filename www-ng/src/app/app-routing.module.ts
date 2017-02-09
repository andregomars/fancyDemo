import { NgModule }      from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FleetComponent } from './fleet.component';
import { VehicleComponent } from './vehicle.component';

const routes: Routes = [
    { path: 'fleet', component: FleetComponent },
    { path: 'vehicle', component: VehicleComponent },
    { path: '', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
