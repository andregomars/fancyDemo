import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import * as moment from 'moment';

import { VehicleIdentity } from '../models/vehicle-identity';
import { VehicleStatus } from '../models/vehicle-status';
import { VehicleSnapshot } from '../models/vehicle-snapshot';
import { VehicleAlert } from '../models/vehicle-alert';
import { VehicleDailyUsage } from '../models/vehicle-daily-usage';

@Injectable()
export class DataRemoteService {
  private vehicleIdentities: Array<VehicleIdentity>;
  private URL_RemoteApiRoot: string = "http://localhost:5000";
  private Endpoint_VehicleIdentities: string = "/VehicleIdentity";
  private Endpoint_VehicleStatusByVehicleName: string = "/VehicleStatus/GetByVehicleName";
  private Endpoint_AllVehicleStatusByFleetName: string = "/VehicleStatus/GetAllByFleetName";
  private Endpoint_RecentAllVehicleStatusByVehicleName: string = 
    "/VehicleStatus/GetRecentAllByVehicleName";
  private Endpoint_VehicleSnapshotByVehicleName: string = "/VehicleSnapshot/GetByVehicleName";
  private Endpoint_WholeDayVehicleSnapshot: string = "/VehicleSnapshot/GetWholeDayByVehicleName";
  private Endpoint_RecentAllVehicleAlertByVehicleName: string = 
    "/VehicleAlert/GetRecentAllByVehicleName";
  private Endpoint_VehicleDailyUsageByDateScope: string = 
    "/VehicleDailyUsage/GetByDateRange";


  private URL_VehicleIdentities: string;
  private URL_VehicleStatusByVehicleName: string;
  private URL_AllVehicleStatusByFleetName: string;
  private URL_RecentAllVehicleStatusByVehicleName: string;
  private URL_VehicleSnapshotByVehicleName: string;
  private URL_WholeDayVehicleSnapshot: string;
  private URL_RecentAllVehicleAlertByVehicleName: string;
  private URL_VehicleDailyUsageByDateScope: string;

  constructor(private http: Http)
  { 
    this.initURLEndpoints();
  }

  private initURLEndpoints() {
    this.URL_VehicleIdentities = this.URL_RemoteApiRoot + this.Endpoint_VehicleIdentities;
    this.URL_VehicleStatusByVehicleName = this.URL_RemoteApiRoot + this.Endpoint_VehicleStatusByVehicleName;
    this.URL_AllVehicleStatusByFleetName = this.URL_RemoteApiRoot + this.Endpoint_AllVehicleStatusByFleetName;
    this.URL_RecentAllVehicleStatusByVehicleName = 
      this.URL_RemoteApiRoot + this.Endpoint_RecentAllVehicleStatusByVehicleName;
    this.URL_VehicleSnapshotByVehicleName = this.URL_RemoteApiRoot + this.Endpoint_VehicleSnapshotByVehicleName;
    this.URL_WholeDayVehicleSnapshot = this.URL_RemoteApiRoot + this.Endpoint_WholeDayVehicleSnapshot;
    this.URL_RecentAllVehicleAlertByVehicleName = 
      this.URL_RemoteApiRoot + this.Endpoint_RecentAllVehicleAlertByVehicleName;
    this.URL_VehicleDailyUsageByDateScope = 
      this.URL_RemoteApiRoot + this.Endpoint_VehicleDailyUsageByDateScope;
  }

  // api: $root/VehicleIdentities
  getVehicleIdentities$(): Observable<Array<VehicleIdentity>> {
    return this.http.get(this.URL_VehicleIdentities)
      .map(res => res.json())
      .catch(this.handleError);
  }

  getFleetIdentities$(): Observable<Array<string>> {
    return this.http.get(this.URL_VehicleIdentities)
      .map(res => res.json()
        .map(v => v.fname)
        .filter((el, i, arr) => arr.indexOf(el) === i)
      )
      .catch(this.handleError);
  }

  getVehicleStatus$(vname: string): Observable<VehicleStatus> {
    return this.http.get(`${this.URL_VehicleStatusByVehicleName}/${vname}`)
      .map(res => res.json())
      .catch(this.handleError);
  }

  getAllVehicleStatusByFleetName$(fname: string): Observable<Array<VehicleStatus>> {
    return this.http.get(`${this.URL_AllVehicleStatusByFleetName}/${fname}`)
      .map(res => res.json())
      .catch(this.handleError);
  }

  getRecentAllVehicleStatusByVehicleName$(vname: string): Observable<Array<VehicleStatus>> {
    return this.http.get(`${this.URL_RecentAllVehicleStatusByVehicleName}/${vname}`)
      .map(res => res.json())
      .catch(this.handleError);
  }

  getVehicleSnapshot$(vname: string): Observable<Array<VehicleSnapshot>> {
    return this.http.get(`${this.URL_VehicleSnapshotByVehicleName}/${vname}`)
      .map(res => res.json())
      .catch(this.handleError);
  }

  getWholeDayVehicleSnapshot$(vname: string, date: Date): Observable<Array<VehicleSnapshot>> {
    var dateOnly: string = moment(date).format('YYYY-MM-DD');
    return this.http.get(`${this.URL_WholeDayVehicleSnapshot}/${vname}/${dateOnly}`)
      .map(res => res.json())
      .catch(this.handleError);
  }

  getRecentAllVehicleAlertByVehicleName$(vname: string): Observable<Array<VehicleAlert>> {
    return this.http.get(`${this.URL_RecentAllVehicleAlertByVehicleName}/${vname}`)
      .map(res => res.json())
      .catch(this.handleError);
  }

  // date format: yyyy-mm-dd, e.g. 2017-05-03
  getVehicleDailyUsageByDateRange$(vname: string, 
    beginDate: Date, endDate: Date): Observable<Array<VehicleDailyUsage>> {
    var beginDay = moment(beginDate).startOf('day').format('YYYY-MM-DD');
    var endDay = moment(endDate).startOf('day').format('YYYY-MM-DD');
    return this.http.get(`${this.URL_VehicleDailyUsageByDateScope}/${vname}/${beginDay}/${endDay}`)
      .map(res => res.json())
      .catch(this.handleError);
  }

/*
  getVehicleIdentities(): Array<VehicleIdentity> {
    //if (!this.vehicleIdentities) return this.vehicleIdentities;

    var vehicleIdentities = new Array<VehicleIdentity>();
    this.http.get(this.URL_RemoteApiRoot + this.Endpoint_VehicleIdentities)
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
    return data.map(el => el.fname).filter((el, i, arr) => arr.indexOf(el) === i);
  }
*/

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
}
