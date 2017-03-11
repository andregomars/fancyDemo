import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-progressbar',
  moduleId: module.id,
  templateUrl: 'progressbar.component.html'
})
export class ProgressBarComponent {
    @Input() 
    value: number = 0;
    @Input()
    max: number = 100;
    @Input()
    unit: string
    
}

