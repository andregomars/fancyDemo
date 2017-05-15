import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'geo'
})
export class GeoPipe implements PipeTransform {
  // transform(value: number, coordinateType: string): any {
  transform(value: number): any {
    //e.g. lat:34080347, lng:117557086;
    var coordinate = Math.abs(value);
    var degree = Math.floor(coordinate/1000000);
    var min = Math.floor((coordinate-degree*1000000)/10000)
    var sec = (coordinate-degree*1000000-min*10000)/100
    var output: number = +(degree + min/60 + sec/3600).toFixed(6)

    return value >= 0 ? output : -output;
    // let factor = 1000000;
    // switch(coordinateType) {
    //   case 'lat':
    //     return value < 90 && value > -90 ? value : value/factor;
    //   case 'lng':
    //     return value < 180 && value > -180 ? value : -value/factor;
    //   default:
    //     return value;  
    // }
  }

}
