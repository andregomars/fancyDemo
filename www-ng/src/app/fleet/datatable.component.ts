import { Component, Input, OnInit } from '@angular/core';
import { DataTableModule, ProgressBarModule } from 'primeng/primeng';

@Component({
  selector: 'datatable',
  moduleId: module.id,
  templateUrl: 'datatable.component.html'
})
export class DataTableComponent implements OnInit {
  @Input()
  items: any;

  data: any[];
  value: number = 30;

  public ngOnInit():void {
    this.data = this.items;
  }

}

