import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { DataService } from './shared/data.service';
import { FleetIdentity } from './models/fleet-identity';

@Component ({
    moduleId: module.id,
    selector: 'app-root',
    templateUrl: 'app.component.html',
		styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  userLoginName: string;
  ids: Array<FleetIdentity>;

  constructor(
    private cookie: CookieService,
    private dataService: DataService,
  ) { }

  ngOnInit(): void {
    console.log(this.cookie.getAll());
    this.userLoginName = this.cookie.get('ioc_loggedin');

    this.dataService.getFleetIdentitiesByLoginName$(this.userLoginName)
      .subscribe(data => this.ids = data);

  }
}