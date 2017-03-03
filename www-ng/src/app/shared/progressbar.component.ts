import { Component, Input } from '@angular/core';


@Component({
  selector: 'progress-bar',
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

