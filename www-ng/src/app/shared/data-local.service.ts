import { Injectable } from '@angular/core';

@Injectable()
export class DataLocalService {

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
                    label: 'SOC',
                    data: [100, 99, 90, 85, 80, 78, 
                           70, 69, 65, 60, 55, 54,
                           52, 49, 47, 42, 40, 38,
                           34, 33, 30, 55, 80, 100],
                    yAxisID: 'ySOC',
                    fill: false,
                    borderColor: '#4bc0c0'
                }, {
                    label: 'Range',
                    data: [250, 250, 240, 230, 220, 210,
                           200, 200, 190, 180, 175, 175,
                           170, 165, 160, 155, 150, 147,
                           140, 138, 135, 180, 220, 250],
                    yAxisID: 'yRange',
                    fill: false,
                    borderColor: '#565656'
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
                    label: 'Estimate Distance',
                    data: [52, 49, 47, 42, 40, 38,
                           34, 33, 30, 55, 80, 100,
                           100, 99, 90, 85, 80, 78, 
                           70, 69, 65, 60, 55, 54],
                    yAxisID: 'yEstimateDistance',
                    fill: false,
                    borderColor: '#4bc0c0'
                }, {
                    label: 'Actual Distance',
                    data: [170, 165, 160, 155, 150, 147,
                           140, 138, 135, 180, 220, 250,
                           250, 250, 240, 230, 220, 210,
                           200, 200, 190, 180, 175, 175 ],
                    yAxisID: 'yActualDistance',
                    fill: false,
                    borderColor: '#565656'
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
                    label: 'Charging Status',
                    data: [52, 49, 47, 42, 40, 38,
                           100, 99, 90, 85, 80, 78, 
                           34, 33, 30, 55, 80, 100,
                           70, 69, 65, 60, 55, 54],
                    yAxisID: 'yChargingStatus',
                    fill: false,
                    borderColor: '#4bc0c0'
                }, {
                    label: 'Running Status',
                    data: [170, 165, 160, 155, 150, 147,
                           250, 250, 240, 230, 220, 210,
                           140, 138, 135, 180, 220, 250,
                           200, 200, 190, 180, 175, 175 ],
                    yAxisID: 'yRunningStatus',
                    fill: false,
                    borderColor: '#565656'
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
}