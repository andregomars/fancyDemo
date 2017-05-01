import { Component, Input } from '@angular/core';
import { VehicleStatus } from '../models/vehicle-status';

@Component({
  selector: 'app-fleet-map',
  templateUrl: './fleet-map.component.html',
  styleUrls: ['./fleet-map.component.css']
})
export class FleetMapComponent { 
  @Input("items")
  statusList: Array<VehicleStatus>;

  /* markder sample
   {
		  lat: 51.673858,
		  lng: 7.815982,
		  label: 'A',
      title: 'A001',
		  draggable: true,
      icon: 'https://maps.google.com/mapfiles/kml/shapes/parking_lot_maps.png'
	  }
  */

}
