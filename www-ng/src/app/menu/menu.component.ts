import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MenuModule, MenuItem } from 'primeng/primeng';
import { FleetTrackerService } from '../shared/fleet-tracker.service';
import { DataLocalService } from '../shared/data-local.service';
import { VehicleIdentity } from '../models/vehicle-identity'

@Component({
  selector: 'app-menu',
  moduleId: module.id,
  templateUrl: 'menu.component.html',
  styleUrls: [ 'menu.component.css' ],
  encapsulation: ViewEncapsulation.None
})
export class MenuComponent implements OnInit {

    fleetItems : MenuItem[];
    vehicleItems : MenuItem[];
    alertItems : MenuItem[];
    monthlyReportItem: any[];
    dailyReportItem: any[];

    constructor(
      private fleetTracker: FleetTrackerService,
      private dataService: DataLocalService
    ){}
    
    ngOnInit() {
      // this.fleetTracker.getFleetID().subscribe(fid => 
      //   {
      //     this.loadDailyAnalysisItems(fid);
      //     this.loadAlertAnalysisItems(fid);
      //     this.loadMonthlyReportItem(fid);
      //     this.loadDailyReportItem(fid);
      //   });
      
      // this.loadFleetItems();
      this.dataService.getAllVehiclesData$().subscribe(data =>
        this.loadFleetItems(data)
      );
    }

    private loadFleetItems(data: any): void {
      if (!data) return;
      var fleetIDs = 
        data.map(v => v.fid).filter((el, i, arr) => arr.indexOf(el) === i); 

      if (!fleetIDs) return;
      var fLinks = fleetIDs.map(fid => { 
        var vLinks = data.filter( el => el.fid === fid ).map(v => {
          return { label: v.vid, routerLink: ['/vehicle', v.vid]}
        });
        return {
          label: fid,
          routerLink: ['/fleet', fid],
          items: vLinks 
        };
      });

      this.fleetItems = fLinks;
    }

    // private loadFleetItems(): void {
    //   var data = this.dataService.getAllVehiclesData();
    //   var fleetIDs = this.dataService.getAllFleetID();
    //   if (!fleetIDs || !data) return;

    //   console.log('here');
    //   var fLinks = fleetIDs.map(fid => { 
    //     var vLinks = data.filter( el => el.fid === fid ).map(v => {
    //       return { label: v.vid, routerLink: ['/vehicle', v.vid]}
    //     });
    //     return {
    //       label: fid,
    //       routerLink: ['/fleet', fid],
    //       items: vLinks 
    //     };
    //   });
    //   this.fleetItems = fLinks;
    // }

    private loadDailyAnalysisItems(fid: string): void {
      var data = this.dataService.getVehiclesIdentityByFleet(fid);
      var vLinks = data.map(v => {
        return {
          label: v.vid,
          routerLink: ['/vehicledaily', v.vid]
        };
      });
      this.vehicleItems = vLinks;
    }

    private loadAlertAnalysisItems(fid: string): void {
      var data = this.dataService.getVehiclesIdentityByFleet(fid);
      var vLinks = data.map(v => {
        return {
          label: v.vid,
          routerLink: ['/vehiclealert', v.vid]
        };
      });
      this.alertItems = vLinks;
    }

    private loadMonthlyReportItem(fid: string): void {
      this.monthlyReportItem = ['/monthlyreport', fid];
    }

    private loadDailyReportItem(fid: string): void {
      this.dailyReportItem = ['/dailyreport', fid];
    }
}

/* loaded data examples
  this.fleetItem: [
        {
            label: 'LBT',
            routerLink: ['/fleet', 'LBT'],
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
            routerLink: ['/fleet', 'BYD'],
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

  this.vehicleItems = [
        {
            label: 'AZ01',
            routerLink: ['/vehicledaily', 'AZ01'],
        }, {
            label: 'AZ02',
            routerLink: ['/vehicledaily', 'AZ02'],
        }
    ];

  this.alertItems = [
    {
        label: 'AZ01',
        routerLink: ['/vehiclealert', 'AZ01'],
    }, {
        label: 'AZ02',
        routerLink: ['/vehiclealert', 'AZ02'],
    }
  ];
*/