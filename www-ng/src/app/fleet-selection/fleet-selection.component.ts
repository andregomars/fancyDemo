import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';
import { VehicleIdentity } from '../models/vehicle-identity';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-fleet-selection',
  templateUrl: './fleet-selection.component.html',
  styleUrls: ['./fleet-selection.component.css']
})
export class FleetSelectionComponent implements OnInit {

  fleets: string[];
  fleets$: Observable<Array<string>>;

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.fleets$ = this.dataService.getAllFleetID$();
    // this.dataService.getAllFleetID$().subscribe(data => this.fleets = data);
    // this.fleets = 
    //   this.dataService.getAllFleetID();
    // let data = this.dataService.getAll();

    // this.fleets = 
      // data.map(el => el.fid).filter((el, i, arr) => arr.indexOf(el) === i);
  }
}
