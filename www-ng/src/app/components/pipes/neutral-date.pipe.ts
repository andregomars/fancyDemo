import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'ndate'
})
export class NeutralDatePipe implements PipeTransform {

  transform(value: Date, format: string): string {
    return moment(value).format(format);
  }

}
