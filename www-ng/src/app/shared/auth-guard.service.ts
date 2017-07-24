import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { DataService } from './data.service';
import { VehicleIdentity } from '../models/vehicle-identity';

@Injectable()
export class AuthGuardService implements CanActivate {

  user: string;
  vehicles: VehicleIdentity[];

  constructor(private router: Router,
    private cookie: CookieService,
    private dataService: DataService ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) 
    : Observable<boolean> | boolean {
    var userLoggedIn = this.cookie.get('ioc_loggedin');
    if (userLoggedIn === null ) return false;

    var url: string = state.url.toUpperCase();
    //get last segment of url 
    //e.g. index.php/hams/fleet/{id} or /vehicle/{id}
    var id: string = url.substr(url.lastIndexOf('/') + 1).toUpperCase(); 

    if (userLoggedIn !== this.user) {
      this.dataService.getVehicleIdentitiesByLoginName$(userLoggedIn)
        .map((data: VehicleIdentity[]) => {
          if(this.isQualifiedVehicleOrFleet(data, id)) {
            this.user = userLoggedIn;
            this.vehicles = data;
            return true;
          }
          else {
            this.user = null;
            this.vehicles = null;
            return true;
          }
        }).first();
    }

  }

  //check at least one of the vehicle name or fleet name matches
  isQualifiedVehicleOrFleet(vehicles: VehicleIdentity[], id: string): boolean {
          console.log('call me');
    var filteredVehicles = vehicles.filter(x => x.fname === id || x.vname === id);
    return filteredVehicles.length > 0;
  }

}
