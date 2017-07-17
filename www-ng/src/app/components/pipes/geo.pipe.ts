import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'geo'
})
export class GeoPipe implements PipeTransform {
  transform(value: number): any {
    //e.g. lat:34080347, lng:117557086;
    var coordinate = Math.abs(value);
    var degree = Math.floor(coordinate/1000000);
    var min = coordinate - degree * 1000000;
    var output: number = +(degree + min/600000).toFixed(6);
    // var min = Math.floor((coordinate-degree*1000000)/10000);
    // var sec = (coordinate-degree*1000000-min*10000)/100;
    // var output: number = +(degree + min/60 + sec/3600).toFixed(6);

    return value >= 0 ? output : -output;

  }

}
