import { Component, Input, OnInit } from '@angular/core';
import { DataTableModule, ProgressBarModule, Message, GrowlModule } from 'primeng/primeng';

@Component({
  selector: 'datatable',
  moduleId: module.id,
  templateUrl: 'datatable.component.html'
})
export class DataTableComponent implements OnInit {
  @Input()
  items: any;

  msgs: Message[] = [];

  data: any[];
  // value: number = 30;

  public ngOnInit():void {
    this.data = this.items;
  }
  
  requestData(data: any) {
        this.msgs.push({severity:'success', summary:'Request Sent', detail:'VID: ' + data.vid});
    }
}

