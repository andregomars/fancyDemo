import { Component, OnInit, OnChanges } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { DataService } from './shared/data.service';
import { FleetIdentity } from './models/fleet-identity';

@Component ({
    moduleId: module.id,
    selector: 'app-root',
    templateUrl: 'app.component.html',
		styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnChanges {
  userLoginName: string;
  ids: Array<FleetIdentity>;
  showMenu: boolean;

  constructor(
    private cookie: CookieService,
    private dataService: DataService,
  ) { }

  ngOnInit(): void {
    this.userLoginName = this.cookie.get('ioc_loggedin');

    this.dataService.getFleetIdentitiesByLoginName$(this.userLoginName)
      .subscribe(data => 
        {
          this.ids = data;
          if (data && data.length > 0) this.showMenu = true;
        });

  }

  ngOnChanges(): void {
  //   this.userLoginName = this.cookie.get('ioc_loggedin');

  //   this.dataService.getFleetIdentitiesByLoginName$(this.userLoginName)
  //     .subscribe(data => this.ids = data);

  }
}