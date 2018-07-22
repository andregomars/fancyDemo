import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'environments/environment';

@Pipe({
  name: 'measure'
})
export class MeasurePipe implements PipeTransform {
  transform(fname: string, imperial: string, metric: string): string {
    if (environment.fleetsInMetric.indexOf(fname.toUpperCase()) > -1) {
      return metric;
    } else {
      return imperial;
    }
  }
}
