import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { DataTableModule, ProgressBarModule, Message } from 'primeng/primeng';
import { VehicleStatus } from '../models/vehicle-status';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'datatable',
  moduleId: module.id,
  templateUrl: 'datatable.component.html',
  styleUrls: [ 'datatable.component.css' ],
  encapsulation: ViewEncapsulation.None
})
export class DataTableComponent implements OnInit {
  @Input("items")
  data: Array<VehicleStatus>;

  msgs: Message[] = [];

  constructor(
    private dataService: DataService,
  ) {}

  public ngOnInit():void {
  }

  addRequest(status: VehicleStatus): void {
    this.dataService.postSmsRequest$(status.vname);
  }
}

