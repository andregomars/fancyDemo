import { Component, Input, OnInit } from '@angular/core';
import { Ng2TableModule } from 'ng2-table/ng2-table';

@Component({
  selector: 'datatable',
  moduleId: module.id,
  templateUrl: 'datatable.component.html'
})
export class DataTableComponent implements OnInit {
  @Input()
  items: any;

  public rows:Array<any> = [];
  public columns:Array<any> = [
    {title: 'Vehicle#', name: 'vid', sort: 'asc'},
    {title: 'SOC', name: 'soc'},
    {title: 'Status', name: 'status'},
    {title: 'Range', name: 'range', sort: false},
    {title: 'Mileage', name: 'mileage', sort: false},
    {title: 'Updated', name: 'updated'}
  ];

  public config:any = {
    paging: false,
    sorting: {columns: this.columns},
  };

  public constructor() {
  }

  public ngOnInit():void {
    this.onChangeTable(this.config);
  }

  public changeSort(data:any, config:any):any {
    if (!config.sorting) {
      return data;
    }

    let columns = this.config.sorting.columns || [];
    let columnName:string = void 0;
    let sort:string = void 0;

    for (let i = 0; i < columns.length; i++) {
      if (columns[i].sort !== '' && columns[i].sort !== false) {
        columnName = columns[i].name;
        sort = columns[i].sort;
      }
    }

    if (!columnName) {
      return data;
    }

    // simple sorting
    return data.sort((previous:any, current:any) => {
      if (previous[columnName] > current[columnName]) {
        return sort === 'desc' ? -1 : 1;
      } else if (previous[columnName] < current[columnName]) {
        return sort === 'asc' ? -1 : 1;
      }
      return 0;
    });
  }

  public onChangeTable(config:any):any {
    if (config.sorting) {
      Object.assign(this.config.sorting, config.sorting);
    }

    let sortedData = this.changeSort(this.items, this.config);
    this.rows = sortedData;
  }
}

