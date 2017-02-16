import { Component, Input } from '@angular/core';

@Component({
  selector: 'datacards',
  moduleId: module.id,
  templateUrl: 'datacards.component.html',
  styleUrls: ['datacards.component.css']
})
export class DataCardsComponent {
    @Input() 
    items: any;

}

