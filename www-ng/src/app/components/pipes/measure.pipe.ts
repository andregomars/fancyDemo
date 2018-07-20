import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'measure'
})
export class MeasurePipe implements PipeTransform {

  transform(fname: string, qulifier: string): string {
    let output = '';
    const specialFleet = 'STAT';

    switch (qulifier) {
      case 'temperature':
        if (fname.toUpperCase() === specialFleet) {
          output = 'C';
        } else {
          output = 'F';
        }
        break;
      case 'distance':
        if (fname.toUpperCase() === specialFleet) {
          output = 'km';
        } else {
          output = 'Miles';
        }
        break;
      default:
        break;
    }

    return output;
  }

}
