import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { DataService } from './shared/data.service';
import { VehicleIdentity } from './models/vehicle-identity';

@Component ({
    moduleId: module.id,
    selector: 'app-root',
    templateUrl: 'app.component.html',
		styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  user: string;
  ids: Array<VehicleIdentity>;

  constructor(
    private cookie: CookieService,
    private dataService: DataService,
  ) { }

  ngOnInit(): void {
    this.user = this.cookie.get('ioc_loggedin');

    this.dataService.getVehicleIdentitiesByLoginName(this.user)
      .subscribe(data => this.ids = data);

  }
}