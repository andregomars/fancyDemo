import { Component, Input } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'datacards',
  moduleId: module.id,
  templateUrl: 'datacards.component.html'
})
export class DataCardsComponent {
    @Input() 
    items: any;

}

