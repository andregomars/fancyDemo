import { Injectable } from '@angular/core';
import { UtilityService } from './utility.service';
import { DailyNumber } from '../models/dailyNumber.model';
import { Vehicle } from '../models/vehicle.model';
import { Fleet } from '../models/fleet.model';
import { VehicleStatus } from '../models/vehicle-status';
import { VehicleIdentity } from '../models/vehicle-identity';

import * as moment from 'moment';
import * as _ from 'lodash';

@Injectable()
export class DataLocalService {

    private utility: UtilityService = new UtilityService();
    private allVehicles: Array<VehicleIdentity>;
    private allVehiclesStatus: Array<VehicleStatus>;

    consructor() {
      this.getAllVehiclesData();
      this.getAllVehicleStatusData();
    }

    getAllFleetsWithVehicles(): Array<Fleet> {
        let vehiclesAVTA = new Array<Vehicle>(); 
        vehiclesAVTA.push(new Vehicle("4370"));
        vehiclesAVTA.push(new Vehicle("4371"));

        let vehiclesLACMTA = new Array<Vehicle>(); 
        vehiclesLACMTA.push(new Vehicle("1001"));
        vehiclesLACMTA.push(new Vehicle("1002"));
        vehiclesLACMTA.push(new Vehicle("1003"));

        let vehiclesLBT = new Array<Vehicle>(); 
        vehiclesLBT.push(new Vehicle("1601"));
        vehiclesLBT.push(new Vehicle("1602"));
        vehiclesLBT.push(new Vehicle("1603"));
        vehiclesLBT.push(new Vehicle("1604"));
        vehiclesLBT.push(new Vehicle("1605"));
        
        let fleets = new Array<Fleet>();
        fleets.push(new Fleet('AVTA', vehiclesAVTA));
        fleets.push(new Fleet('LACMTA', vehiclesLACMTA));
        fleets.push(new Fleet('LBT', vehiclesLBT));

        return fleets;
    }

    getAllVehiclesData(): Array<VehicleIdentity> {
      if (this.allVehicles) return this.allVehicles;
      
      this.allVehicles = [{
                "fid": "AVTA",
                "vid": "4370"
            }, {
                "fid": "AVTA",
                "vid": "4371"
            }, {
                "fid": "BYDUPS",
                "vid": "UPS"
            }, {
                "fid": "LACMTA",
                "vid": "1001"
            }, {
                "fid": "LACMTA",
                "vid": "1002"
            }, {
                "fid": "LACMTA",
                "vid": "1003"
            }, {
                "fid": "LACMTA",
                "vid": "1004"
            }, {
                "fid": "LACMTA",
                "vid": "1005"
            }, {
                "fid": "LBT",
                "vid": "1601"
            }, {
                "fid": "LBT",
                "vid": "1602"
            }, {
                "fid": "LBT",
                "vid": "1603"
            }, {
                "fid": "LBT",
                "vid": "1604"
            }, {
                "fid": "LBT",
                "vid": "1605"
            }, {
                "fid": "LBT",
                "vid": "1606"
            }, {
                "fid": "LBT",
                "vid": "1607"
            }, {
                "fid": "LBT",
                "vid": "1608"
            }, {
                "fid": "LBT",
                "vid": "1609"
            }, {
                "fid": "LBT",
                "vid": "1610"
            }];

      return this.allVehicles;
    }

    getAllVehicleStatusData(): Array<VehicleStatus> {
      if (this.allVehiclesStatus) return this.allVehiclesStatus;

      this.allVehicles = this.getAllVehiclesData();
      this.allVehiclesStatus = this.allVehicles.map(v => this.utility.genRandomVehicleStatus(v));
      return this.allVehiclesStatus;
    }

    getVehicleStatus(vid: string): VehicleStatus {
      if (!this.allVehiclesStatus) this.getAllVehicleStatusData();
      return this.allVehiclesStatus.find(s => s.vid === vid);
    }

    getVehicleIdentity(vid: string): VehicleIdentity {
      if (!this.allVehicles) this.getAllVehiclesData();
      return this.allVehicles.find(v => v.vid === vid);
    }
    
    getVehiclesIdentityByFleet(fid: string): Array<VehicleIdentity> {
      if (!this.allVehicles) this.getAllVehiclesData();
      return this.allVehicles.filter(v => v.fid === fid);
    }

    getVehiclesStatusByFleet(fid: string): Array<VehicleStatus> {
      if (!this.allVehiclesStatus) this.getAllVehicleStatusData();
      return this.allVehiclesStatus.filter(s => s.fid === fid);
    }



    getLineChart(): any {
        return {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'Energy',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    yAxisID: 'ySOC',
                    fill: false,
                    borderColor: '#4bc0c0'
                }, {
                    label: 'Voltage',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    yAxisID: 'yRange',
                    fill: false,
                    borderColor: '#565656'
                }, {
                    label: 'Current',
                    data: [10, 12, 16, 20, 12, 12, 16],
                    yAxisID: 'yCurrent',
                    fill: false,
                    borderColor: '#4286f4'
                }, {
                    label: 'Temperature',
                    data: [45, 30, 80, 96, 127, 134, 150],
                    yAxisID: 'yTemperature',
                    fill: false,
                    borderColor: '#f47d41'
                }
            ]
        }
    }

    getSocRangeChartData(): any {
        return {
            labels: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', 
                     '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', 
                     '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', 
                     '18:00', '19:00', '20:00', '21:00', '22:00', '23:00' ],
            datasets: [
                {
                    type: 'line',
                    label: 'SOC',
                    data: this.utility.getRandomNumberList(24, 0, 100),
                    yAxisID: 'ySOC',
                    fill: false,
                    borderColor: '#4bc0c0'
                }, {
                    type: 'bar',
                    label: 'Range',
                    data: this.utility.getRandomNumberList(24, 0, 250),
                    yAxisID: 'yRange',
                    // fill: false,
                    borderColor: '#565656',
                    borderWidth: 1
                }
            ]
        }
    }

    getEstActualDistanceData(): any {
        return {
            labels: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', 
                     '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', 
                     '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', 
                     '18:00', '19:00', '20:00', '21:00', '22:00', '23:00' ],
            datasets: [
                {
                    type: 'line',
                    label: 'Estimate Distance',
                    data: this.utility.getRandomNumberList(24, 0, 100),
                    yAxisID: 'yEstimateDistance',
                    fill: false,
                    borderColor: '#4bc0c0'
                }, {
                    type: 'bar',
                    label: 'Actual Distance',
                    data: this.utility.getRandomNumberList(24, 0, 250),
                    yAxisID: 'yActualDistance',
                    fill: false,
                    borderColor: '#565656',
                    borderWidth: 1
                }
            ]
        }
    }

    getChargingRunningStatusData(): any {
        return {
            labels: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', 
                     '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', 
                     '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', 
                     '18:00', '19:00', '20:00', '21:00', '22:00', '23:00' ],
            datasets: [
                {
                    type: 'line',
                    label: 'Charging Status',
                    data: this.utility.getRandomNumberList(24, 0, 100),
                    yAxisID: 'yChargingStatus',
                    fill: false,
                    borderColor: '#4bc0c0'
                }, {
                    type: 'bar',
                    label: 'Running Status',
                    data: this.utility.getRandomNumberList(24, 0, 250),
                    yAxisID: 'yRunningStatus',
                    fill: false,
                    borderColor: '#565656',
                    borderWidth: 1
                }
            ]
        }
    }

    getVehicleStatusData(): any {
        return [{
            "TypeCode": "0E",
            "Name": "Left Charge Gun",
            "Value": "0 bit"
        }, {
            "TypeCode": "0E",
            "Name": "Left Charge Gun",
            "Value": "0 bit"
        }, {
            "TypeCode": "0F",
            "Name": "Right Charge Gun",
            "Value": "0 bit"
        }, {
            "TypeCode": "1D",
            "Name": "Vehicle Speed",
            "Value": "0 mph"
        }, {
            "TypeCode": "1E",
            "Name": "SOC",
            "Value": "68.7 %"
        }, {
            "TypeCode": "1F",
            "Name": "Total Voltage",
            "Value": "620 V"
        }, {
            "TypeCode": "2F",
            "Name": "Total current",
            "Value": "3.7 A"
        }, {
            "TypeCode": "1G",
            "Name": "Lowest Battery Temp",
            "Value": "82.4 F"
        }, {
            "TypeCode": "2G",
            "Name": "Highest Battery Temp",
            "Value": "95 F"
        }, {
            "TypeCode": "1H",
            "Name": "Total Mileage",
            "Value": "5647.2 miles"
        }, {
            "TypeCode": "2H",
            "Name": "Range",
            "Value": "105.6 miles"
        }, {
            "TypeCode": "1I",
            "Name": "Charging Status",
            "Value": "Initialization"
        }, {
            "TypeCode": "1J",
            "Name": "kWh Usage",
            "Value": "177.3 kWh"
        }, {
            "TypeCode": "1K",
            "Name": "High Voltage",
            "Value": "1 bit"
        }, {
            "TypeCode": "1L",
            "Name": "Motor Input Voltage",
            "Value": "608 V"
        }, {
            "TypeCode": "2L",
            "Name": "Motor RPM",
            "Value": "0 RPM"
        }, {
            "TypeCode": "1M",
            "Name": "WAVE Status",
            "Value": "N/A"
        }]
    }

    getLatestAlertsData() {
        return [{
            "type": "Slow Charging",
            "value": "1000 A",
            "time": "2017-03-02 19:36:57"
        }, {
            "type": "Slow Charging",
            "value": "1000 A",
            "time": "2017-03-02 19:36:57"
        }, {
            "type": "Low Temp",
            "value": "35 F",
            "time": "2017-03-02 00:22:13"
        }, {
            "type": "Low Voltage",
            "value": "80 V",
            "time": "2017-03-01 12:26:07"
        }, {
            "type": "Slow Charging",
            "value": "1000 A",
            "time": "2017-02-27 10:07:25"
        }, {
            "type": "Slow Charging",
            "value": "1000 A",
            "time": "2017-02-22 07:25:33"
        }, {
            "type": "Low Temp",
            "value": "35 F",
            "time": "2017-02-20 17:36:57"
        }, {
            "type": "Low Voltage",
            "value": "80 V",
            "time": "2017-02-11 19:36:57"
        }, {
            "type": "Slow Charging",
            "value": "1000 A",
            "time": "2017-02-10 19:36:57"
        }, {
            "type": "Slow Charging",
            "value": "1000 A",
            "time": "2017-01-11 19:36:57"
        }, {
            "type": "Low Temp",
            "value": "35 F",
            "time": "2017-01-10 19:36:57"
        }]
    }

    getLatestSnapshotsData() {
        return [{
            "time": "2017-03-02 00:22:13"
        }, {
            "time": "2017-03-02 00:22:13"
        }, {
            "time": "2017-03-01 12:26:07"
        }, {
            "time": "2017-03-02 19:36:57"
        }, {
            "time": "2017-02-27 10:07:25"
        }, {
            "time": "2017-02-22 07:25:33"
        }, {
            "time": "2017-02-20 17:36:57"
        }, {
            "time": "2017-02-11 19:36:57"
        }, {
            "time": "2017-02-10 19:36:57"
        }, {
            "time": "2017-01-11 19:36:57"
        }, {
            "time": "2017-01-10 19:36:57"
        }]
    }

    getBackwardDaysVehicleDailyMileage(backwardDays: number): any {
        return {
            labels: this.utility.getBackwardDateList(backwardDays, new Date()),
            datasets: [
                {
                    label: 'Daily Mileage',
                    data: this.utility.getRandomNumberList(backwardDays, 0, 100),
                    //fill: false,
                    borderColor: '#4bc0c0'
                }
            ]
        }
    }

    getVehicleDailyMileage(beginDate: Date, endDate: Date): any {
        let dict: Array<DailyNumber> = 
            this.utility.getDailyNumberList(beginDate, endDate, 0, 100);
        let days: Array<Date> = [];
        let numbers: Array<number> = [];
        dict.forEach((item: DailyNumber) => { 
            days.push(item.date); 
            numbers.push(item.value);
        });

        return {
            labels: days,
            data: numbers            
        }
    }

    getVehicleDailySocEnergy(beginDate: Date, endDate: Date): any {
        let dictSoc: Array<DailyNumber> = 
            this.utility.getDailyNumberList(beginDate, endDate, 0, 100);
        let dictEnergy: Array<DailyNumber> = 
            this.utility.getDailyNumberList(beginDate, endDate, 0, 2500);
        let days: Array<Date> = [];

        let numbersSocCharged: Array<number> = [];
        let numbersSocUsed: Array<number> = [];
        let numbersEnergyCharged: Array<number> = [];
        let numbersEnergyUsed: Array<number> = [];

        dictSoc.forEach((item: DailyNumber) => { 
            days.push(item.date); 
            numbersSocCharged.push(item.value);
            numbersSocUsed.push(100 - item.value);
        });
        
        dictEnergy.forEach((item: DailyNumber) => { 
            numbersEnergyCharged.push(item.value);
            numbersEnergyUsed.push(2500 - item.value);
        });
        
        return {
            labels: days,
            dataSocCharged: numbersSocCharged,            
            dataSocUsed: numbersSocUsed,            
            dataEnergyCharged: numbersEnergyCharged,            
            dataEnergyUsed: numbersEnergyUsed            
        }
    }

    getVehicleDailySocMileageEnergy(beginDate: Date, endDate: Date): any {
        let dictSoc: Array<DailyNumber> = 
            this.utility.getDailyNumberList(beginDate, endDate, 1, 100);
        let dictMileage: Array<DailyNumber> = 
            this.utility.getDailyNumberList(beginDate, endDate, 1, 100);
        let dictEnergy: Array<DailyNumber> = 
            this.utility.getDailyNumberList(beginDate, endDate, 0, 2500);
        let days: Array<Date> = [];

        let numbersSocMileage: Array<number> = []; 
        let numbersMileageSoc: Array<number> = [];
        let numbersMileageEnergy: Array<number> = [];
        let numbersEnergyMileage: Array<number> = [];

        let raitoListSocMileage = this.utility.getRatioList(dictSoc, dictMileage);
        raitoListSocMileage.forEach((item: DailyNumber) => {
            days.push(item.date);
            numbersSocMileage.push(item.value)
        });

        let raitoListMileageSoc = this.utility.getRatioList(dictMileage, dictSoc);
        raitoListMileageSoc.forEach((item: DailyNumber) => {
            numbersMileageSoc.push(item.value)
        });

        let raitoListMileageEnergy = this.utility.getRatioList(dictMileage, dictEnergy);
        raitoListMileageEnergy.forEach((item: DailyNumber) => {
            numbersMileageEnergy.push(item.value)
        });

        let ratioListEnergyMileage = this.utility.getRatioList(dictEnergy, dictMileage);
        ratioListEnergyMileage.forEach((item: DailyNumber) => {
            numbersEnergyMileage.push(item.value)
        });

        return {
            labels: days,
            dataSocMileage: numbersSocMileage,            
            dataMileageSoc: numbersMileageSoc,            
            dataMileageEnergy: numbersMileageEnergy,            
            dataEnergyMileage: numbersEnergyMileage            
        }
    }

    getVehicleAlertStats(beginDate: Date, endDate: Date): any {
        let eventCodes = ['Slow Charging', 'Low Temp', 'Low Voltage'];
        let maxLength = 10, min = 1, max = 100;
        let events = this.utility.getEventList(10, eventCodes, min, max, beginDate, endDate);
        let stats = _.countBy(events, 'type');
        return {
            labels: _.keys(stats),
            data: _.values(stats)
        }
    }

    getFleetAlertStats(beginDate: Date, endDate: Date, fleetID: string): any {
        // let eventCodes = ['AZ01', 'AZ02'];
        let eventCodes = this.getVehiclesIdentityByFleet(fleetID).map(v => v.vid);
        let maxLength = 20, min = 1, max = 100;
        let events = this.utility.getEventList(10, eventCodes, min, max, beginDate, endDate);
        let stats = _.countBy(events, 'type');
        return {
            labels: _.keys(stats),
            data: _.values(stats)
        }
    }

    getDateOfACoupleWeeksAgo(endDate: Date): Date {
        return this.utility.getStartDateBackward(14, endDate);
    }

    getRandomMonthlyData(): any {
        let socCharged = _.random(100, 3000);
        let socUsed = _.random(10, socCharged);
        let actualDistance = _.random(500, 7500);
        let socMile = (socUsed / actualDistance).toFixed(2);
        let mileSoc = (actualDistance / socUsed).toFixed(2);

        return {
            socCharged: socCharged,
            socUsed: socUsed, 
            actualDistance: actualDistance,
            socMile: socMile,
            mileSoc: mileSoc
        }
    }

    getRandomMonthlyDataSetWithVehicles(vehicles: Array<Vehicle>): Array<any> {
       let array = vehicles.map(v => Object.assign({}, v, this.getRandomMonthlyData()));
       let socChargedSum = array.map(el => el.socCharged).reduce((sum, value) => sum + value); 
       let socUsedSum = array.map(el => el.socUsed).reduce((sum, value) => sum + value); 
       let actualDistanceSum = 
            array.map(el => el.actualDistance).reduce((sum, value) => sum + value); 
        let socMileAvg = (socUsedSum / actualDistanceSum).toFixed(2);
        let mileSocAvg = (actualDistanceSum / socUsedSum).toFixed(2)
        
        //insert total line in first element of the array
        array.unshift({
            id: "All",
            socCharged: socChargedSum,
            socUsed: socUsedSum, 
            actualDistance: actualDistanceSum,
            socMile: socMileAvg,
            mileSoc: mileSocAvg
        });

       return array; 
    }

    getLogsInMonthOfDate(date: Date): Array<any> {
        let days = this.utility.getDatesInMonth(date);
        let array = days.map(d => { 
            return {
                date: moment(d).format('YYYY-MM-DD'),
                fileName: moment(d).format('YYYYMMDD')
            }
        }); 

        return array;
    } 

    getLogsInMonthOfDateByVehicles(vehicles: Array<Vehicle>, date: Date): Array<any> {
        let logs = this.getLogsInMonthOfDate(date);
        let array = logs.map(log =>  
            vehicles.map(v => 
                Object.assign({}, v, log)
                )
            ).reduce((a, b) => a.concat(b));    //use reduce to turn nested array flat, e.g. [[a,b],[c,d]] => [a,b,c,d]
        return array;
    }
}

/*
	getFleet(): any {
        return [{
            "vid": "AZ01",
            "fid": "LBT",
            "soc": 80,
            "status": "Charging",
            "range": 252,
            "mileage": 8788.1,
            "voltage": 50,
            "current": 20,
            "temperature": 150,
            "speed": 75,
            "updated": "02/10/2017 10:23:41"
        }, {
            "vid": "AZ02",
            "fid": "LBT",
            "soc": 20,
            "status": "N/A",
            "range": 40,
            "mileage": 16750.8,
            "voltage": 110,
            "current": 15,
            "temperature": 225,
            "speed": 45,
            "updated": "02/10/2017 11:13:10"
        }, {
            "vid": "NJ",
            "fid": "LBT",
            "soc": 100,
            "status": "Charging",
            "range": 300,
            "mileage": 645.2,
            "voltage": 220,
            "current": 60,
            "temperature": 110,
            "speed": 0,
            "updated": "02/10/2017 10:40:52"
        }, {
            "vid": "P01",
            "fid": "LBT",
            "soc": 50,
            "status": "N/A",
            "range": 150,
            "mileage": 4000.5,
            "voltage": 110,
            "current": 90,
            "temperature": 80,
            "speed": 35,
            "updated": "02/10/2017 12:02:33"
        }, {
            "vid": "P02",
            "fid": "LBT",
            "soc": 38,
            "status": "N/A",
            "range": 110,
            "mileage": 15500.2,
            "voltage": 220,
            "current": 90,
            "temperature": 80,
            "speed": 45,
            "updated": "02/10/2017 12:02:33"
        }, {
            "vid": "P03",
            "fid": "LBT",
            "soc": 70,
            "status": "N/A",
            "range": 189,
            "mileage": 37009.1,
            "voltage": 110,
            "current": 90,
            "temperature": 80,
            "speed": 39,
            "updated": "02/10/2017 12:02:33"
        }, {
            "vid": "Z001",
            "fid": "LBT",
            "soc": 10,
            "status": "Charging",
            "range": 30,
            "mileage": 10023.9,
            "voltage": 220,
            "current": 20,
            "temperature": 75,
            "speed": 40,
            "updated": "02/10/2017 12:02:33"
        }, {
            "vid": "Z002",
            "fid": "LBT",
            "soc": 47,
            "status": "N/A",
            "range": 140,
            "mileage": 2300.9,
            "voltage": 220,
            "current": 20,
            "temperature": 75,
            "speed": 40,
            "updated": "02/10/2017 12:02:33"
        }, {
            "vid": "Z003",
            "fid": "LBT",
            "soc": 47,
            "status": "N/A",
            "range": 140,
            "mileage": 2300.9,
            "voltage": 220,
            "current": 20,
            "temperature": 75,
            "speed": 40,
            "updated": "02/10/2017 12:02:33"
        }, {
            "vid": "Z004",
            "fid": "LBT",
            "soc": 47,
            "status": "N/A",
            "range": 140,
            "mileage": 2300.9,
            "voltage": 220,
            "current": 20,
            "temperature": 75,
            "speed": 40,
            "updated": "02/10/2017 12:02:33"
        }, {
            "vid": "Z005",
            "fid": "LBT",
            "soc": 47,
            "status": "N/A",
            "range": 140,
            "mileage": 2300.9,
            "voltage": 220,
            "current": 20,
            "temperature": 75,
            "speed": 40,
            "updated": "02/10/2017 12:02:33"
        }, {
            "vid": "Z006",
            "fid": "LBT",
            "soc": 47,
            "status": "N/A",
            "range": 140,
            "mileage": 2300.9,
            "voltage": 220,
            "current": 20,
            "temperature": 75,
            "speed": 40,
            "updated": "02/10/2017 12:02:33"
        }, {
            "vid": "Z007",
            "fid": "LBT",
            "soc": 35,
            "status": "N/A",
            "range": 105,
            "mileage": 11054.9,
            "voltage": 220,
            "current": 20,
            "temperature": 75,
            "speed": 40,
            "updated": "02/10/2017 12:02:33"
        }, {
            "vid": "Z008",
            "fid": "LBT",
            "soc": 35,
            "status": "N/A",
            "range": 105,
            "mileage": 11054.9,
            "voltage": 220,
            "current": 20,
            "temperature": 75,
            "speed": 40,
            "updated": "02/10/2017 12:02:33"
        }, {
            "vid": "Z009",
            "fid": "LBT",
            "soc": 35,
            "status": "N/A",
            "range": 105,
            "mileage": 11054.9,
            "voltage": 220,
            "current": 20,
            "temperature": 75,
            "speed": 40,
            "updated": "02/10/2017 12:02:33"
        }, {
            "vid": "Z010",
            "fid": "LBT",
            "soc": 35,
            "status": "N/A",
            "range": 105,
            "mileage": 11054.9,
            "voltage": 220,
            "current": 20,
            "temperature": 75,
            "speed": 40,
            "updated": "02/10/2017 12:02:33"
        }, {
            "vid": "Z011",
            "fid": "LBT",
            "soc": 35,
            "status": "N/A",
            "range": 105,
            "mileage": 11054.9,
            "voltage": 220,
            "current": 20,
            "temperature": 75,
            "speed": 40,
            "updated": "02/10/2017 12:02:33"
        }, {
            "vid": "Z012",
            "fid": "LBT",
            "soc": 35,
            "status": "N/A",
            "range": 105,
            "mileage": 11054.9,
            "voltage": 220,
            "current": 20,
            "temperature": 75,
            "speed": 40,
            "updated": "02/10/2017 12:02:33"
        }, {
            "vid": "Z013",
            "fid": "LBT",
            "soc": 35,
            "status": "N/A",
            "range": 105,
            "mileage": 11054.9,
            "voltage": 220,
            "current": 20,
            "temperature": 75,
            "speed": 40,
            "updated": "02/10/2017 12:02:33"
        }]
    }
*/