import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'geo'
})
export class GeoPipe implements PipeTransform {

  transform(value: number, coordinateType: string): any {
    let factor = 1000000;
    switch(coordinateType) {
      case 'lat':
        return value < 90 && value > -90 ? value : value/factor;
      case 'lng':
        return value < 180 && value > -180 ? value : -value/factor;
      default:
        return value;  
    }
  }

}
