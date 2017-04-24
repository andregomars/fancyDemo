import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
// import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { VehicleIdentity } from '../models/vehicle-identity';

// const URL_VehicleIdentities = "http://www.mocky.io/v2/58e926392a000014022dbbb4";
const URL_VehicleIdentities = "http://localhost:5000/api/VehicleIdentity";

@Injectable()
export class DataRemoteService {
  private vehicleIdentities: Array<VehicleIdentity>;

  constructor(private http: Http)
  { }


  getVehicleIdentities$(): Observable<Array<VehicleIdentity>> {
    return this.http.get(URL_VehicleIdentities)
      .map(res => res.json())
      .catch(this.handleError);
  }

  getFleetIdentities$(): Observable<Array<string>> {
    return this.http.get(URL_VehicleIdentities)
      .map(res => res.json()
        .map(v => v.fid)
        .filter((el, i, arr) => arr.indexOf(el) === i)
      )
      .catch(this.handleError);
  }

  getVehicleIdentities(): Array<VehicleIdentity> {
    //if (!this.vehicleIdentities) return this.vehicleIdentities;

    var vehicleIdentities = new Array<VehicleIdentity>();
    this.http.get(URL_VehicleIdentities)
      // .flatMap(data => data.json() as Array<VehicleIdentity>)
      // .subscribe(data => this.vehicleIdentities.push(data));
			// .map(data => data.json())
			// .subscribe(data => { vehicleIdentities = data; console.log('tell me why')});
			.toPromise()
			.then(res => vehicleIdentities = res.json());
    return vehicleIdentities;
  }

  getFleetIdentities(): Array<string> {
    var data: Array<VehicleIdentity> = this.getVehicleIdentities();
    if (!data) return null;
    return data.map(el => el.fid).filter((el, i, arr) => arr.indexOf(el) === i);
  }

  //helper methods
  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private handleError(error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }



  // getUrl(): string {
  //     let urls = [
  //         "http://www.mocky.io/v2/589ebc1f270000ab24ed0efe"
  //     // "http://www.mocky.io/v2/58789d370f0000a71f0d49ed"
  //     // ,"http://www.mocky.io/v2/587d44fc0f00004e0c5df626"
  //     // ,"http://www.mocky.io/v2/587d47d50f0000930c5df627"
  //     // ,"http://www.mocky.io/v2/587d49050f0000aa0c5df629"
  //     // ,"http://www.mocky.io/v2/587d49960f0000bd0c5df62a"
  //     ];
  //     return urls[Math.floor(Math.random()*urls.length)];
  // }

  // getFleet(): Promise<any> {
  //     var url = this.getUrl();
  // 	return this.http.get(url)
  // 		.toPromise()
  // 		.then(response => response.json())
  // 		// .then(response => {console.dir(response);return response.json()})
  // 		.catch(this.handleError);
  // }

  // private handleError(error: any): Promise<any> {
  // 	console.error('An error occured', error);
  // 	return Promise.reject(error.message || error);
  // }

}
