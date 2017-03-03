import { Injectable } from '@angular/core';

@Injectable()
export class DataLocalService {

	getFleet(): any {
        return [{
            "vid": "AZ01",
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
                    label: 'SOC',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    borderColor: '#4bc0c0'
                },
                {
                    label: 'Range',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    borderColor: '#565656'
                }
            ]
        }
    }
}