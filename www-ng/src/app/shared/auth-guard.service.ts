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

  user = 'default';
  vehicles: VehicleIdentity[];

  constructor(private router: Router,
    private cookie: CookieService,
    private dataService: DataService ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) 
    : Observable<boolean> | boolean {
    var userLoggedIn = this.cookie.get('ioc_loggedin');
    if (userLoggedIn === null ) return false;

    //get last segment of url 
    //e.g. index.php/hams/fleet/{id} or /vehicle/{id}
    var id: string = state.url.substr(state.url.lastIndexOf('/') + 1).toUpperCase(); 
    if (userLoggedIn !== this.user) {
      this.dataService.getVehicleIdentitiesByLoginName$(userLoggedIn)
        .map((data: VehicleIdentity[]) => {
          if(this.isQualifiedVehicleOrFleet(data, id)) {
            this.user = userLoggedIn;
            this.vehicles = data;
            this.router.navigate([state.url]);
            return Observable.of(true);
          }
          else {
            this.user = null;
            this.vehicles = null;
            return Observable.of(false);
          }
        }).first().subscribe();
    }
    else {
      return true;
    }

  }

  //check at least one of the vehicle name or fleet name matches
  isQualifiedVehicleOrFleet(vehicles: VehicleIdentity[], id: string): boolean {
    var filteredVehicles = vehicles.filter(x => x.fname.toUpperCase() === id || x.vname.toUpperCase() === id);
    return filteredVehicles.length > 0;
  }

}
