import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MenuModule, MenuItem } from 'primeng/primeng';

@Component({
  selector: 'app-menu',
  moduleId: module.id,
  templateUrl: 'menu.component.html',
  styleUrls: [ 'menu.component.css' ],
  encapsulation: ViewEncapsulation.None
})
export class MenuComponent implements OnInit {

    private fleetList : MenuItem[];
    private vehicleList : MenuItem[];
    private alertList : MenuItem[];

    ngOnInit() {
      this.fleetList = [
            {
                label: 'LBT',
                routerLink: ['/fleet'],
                items: [
                    { 
                      label: 'AZ01',
                      routerLink: ['/vehicle', 'AZ01'],
                    }, { 
                      label: 'AZ02',
                      routerLink: ['/vehicle', 'AZ02'],
                    }
                ]
            },
            {
                label: 'BYD',
                routerLink: ['/fleet'],
                items: [
                    { 
                      label: 'P01',
                      routerLink: ['/vehicle', 'P01'],
                    }, { 
                      label: 'P02',
                      routerLink: ['/vehicle', 'P02'],
                    }
                ]
            }
        ];

        this.vehicleList = [
            {
                label: 'AZ01',
                routerLink: ['/vehicledaily', 'AZ01'],
            }, {
                label: 'AZ02',
                routerLink: ['/vehicledaily', 'AZ02'],
            }
        ];

        this.alertList = [
            {
                label: 'AZ01',
                routerLink: ['/vehiclealert', 'AZ01'],
            }, {
                label: 'AZ02',
                routerLink: ['/vehiclealert', 'AZ02'],
            }
        ];
    }
}