import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'

import { ProgressBarComponent } from '../shared/progressbar.component';
import { DataLocalService } from '../shared/data-local.service';

@Component({
  moduleId: module.id,
  templateUrl: 'vehicle.component.html'
})
export class VehicleComponent implements OnInit {
 vehicle: any;

 constructor(
		private route: ActivatedRoute,
    private dataService: DataLocalService
 ) {

 }

 ngOnInit(): void {
   var vehicles = this.getData();
   this.getVehicle(vehicles);
 }

 getVehicle(vehicles) {
    if (!vehicles || vehicles.length === 0) return;
    var vid = this.route.snapshot.params["vid"]
    var vFiltered = vehicles.filter( function(item) {
      return item.vid === vid;
    });
    console.dir(vFiltered);
    if (vFiltered.length > 0) 
      this.vehicle = vFiltered[0];
  }

  getData(): void {
    return this.dataService.getFleet();
  }
}

