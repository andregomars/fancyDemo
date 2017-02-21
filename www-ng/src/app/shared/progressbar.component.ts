import { Component, Input } from '@angular/core';


@Component({
  selector: 'progress-bar',
  moduleId: module.id,
  templateUrl: 'progressbar.component.html'
})
export class ProgressBarComponent {
    @Input() 
    value: Number = 0;
    @Input()
    maxValue: Number;
    @Input()
    unit: String;
}

