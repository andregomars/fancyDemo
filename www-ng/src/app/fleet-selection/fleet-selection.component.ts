import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { DataService } from '../shared/data.service';
import { FleetIdentity } from '../models/fleet-identity';

@Component({
  selector: 'app-fleet-selection',
  templateUrl: './fleet-selection.component.html',
  styleUrls: ['./fleet-selection.component.css'],
})
export class FleetSelectionComponent implements OnInit {

  showFleets: boolean = false;
  fleets: Array<FleetIdentity>;
  fleets$: Observable<Array<FleetIdentity>>;

  constructor(
    private cookie: CookieService,
    private dataService: DataService
  ) { }

  ngOnInit() {
    var userLoginName = this.cookie.get('ioc_loggedin');
    this.dataService.getFleetIdentitiesByLoginName$(userLoginName)
      .subscribe((data: Array<FleetIdentity>) => {
        this.fleets = data;
        if(data && data.length > 0) this.showFleets = true;
      });
  }

}
