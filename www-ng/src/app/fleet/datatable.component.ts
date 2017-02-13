import { Component, Input } from '@angular/core';

@Component({
  selector: 'datatable',
  moduleId: module.id,
  templateUrl: 'datatable.component.html'
})
export class DataTableComponent {
    @Input()
    items: any;
}

