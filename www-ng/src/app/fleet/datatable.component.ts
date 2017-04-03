import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { DataTableModule, ProgressBarModule, Message } from 'primeng/primeng';

@Component({
  selector: 'datatable',
  moduleId: module.id,
  templateUrl: 'datatable.component.html',
  styleUrls: [ 'datatable.component.css' ],
  encapsulation: ViewEncapsulation.None
})
export class DataTableComponent implements OnInit {
  @Input("items")
  data: any[];

  msgs: Message[] = [];

  public ngOnInit():void {
  }

}

