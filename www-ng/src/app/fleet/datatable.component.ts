import { Component, Input, OnInit } from '@angular/core';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'datatable',
  moduleId: module.id,
  // templateUrl: 'datatable.component.html'
  template: `
    <ng2-smart-table [settings]="settings" [source]="items"></ng2-smart-table>
  `
})
export class DataTableComponent implements OnInit {
    @Input()
    items: any;

    source: LocalDataSource;

    constructor(private http: Http) {
      //this.source = new LocalDataSource(this.items);
    }

    ngOnInit() {
    }

    settings = {
      actions: {
        add: false,
        edit: false,
        delete: false
      },
      pager: {
        display: false,
        perPage: 0
      },
      columns: {
        vid: {
          title: 'Vehicle#',
          filter: false
        },
        soc: {
          title: 'SOC',
          filter: false
        },
        status: {
          title: 'Status',
          sort: false,
          filter: false
        },
        range: {
          title: 'Range',
          sort: false,
          filter: false
        },
        mileage: {
          title: 'Mileage',
          sort: false,
          filter: false
        },
        updated: {
          title: 'Updated',
          filter: false
        }
      }
    };

}

