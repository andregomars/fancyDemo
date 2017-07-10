import { Component, Input, OnInit } from '@angular/core';
import { VehicleStatus } from '../models/vehicle-status';

@Component({
  selector: 'app-fleet-map',
  templateUrl: './fleet-map.component.html',
  styleUrls: ['./fleet-map.component.css']
})
export class FleetMapComponent implements OnInit { 
  @Input("items")
  statusList: Array<VehicleStatus>;

  clusterIcon: string = 
    "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m";
  markerIcon: string = 
    "http://cloud.iocontrols.com/online2017/hams/images/mapicon/oi_map_marker.yellow.46px.png";

  ngOnInit() {

  }
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
