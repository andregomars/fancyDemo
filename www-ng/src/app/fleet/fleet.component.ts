import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';
import { DataLocalService } from '../shared/data-local.service';

@Component({
  moduleId: module.id,
  templateUrl: 'fleet.component.html'
})
export class FleetComponent implements OnInit {
	viewComponent:string = "cards";
  data: any;

  constructor (
    // private dataService: DataService
    private dataService: DataLocalService
  ) {}
  
  ngOnInit() {
    this.getData();
  }

  toggleView(view: string) {
    this.viewComponent = view;
  }

  isShown(view: string) {
    return this.viewComponent === view;
  }

  getData(): void {
    // this.dataService.getFleet().then(data => this.data = data);
    this.data = this.dataService.getFleet();
  }
}

