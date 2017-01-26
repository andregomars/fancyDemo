import React from 'react';
import ReactDOM from 'react-dom';

import ProcessesView from './VehicleProgress.jsx';
import GaugesView from './VehicleGauge.jsx';
import ChartsStatic from './VehicleChartsStatic.jsx';


const vehicles = [
  {
    id: 0,
    name: "V-000",
    voltage: 50,
    current: 20,
    temperature: 150,
    speed: 75
  },
  {
    id: 1,
    name: "V-001",
    voltage: 110,
    current: 15,
    temperature: 225,
    speed: 45
  },
  {
    id: 2,
    name: "V-002",
    voltage: 220,
    current: 60,
    temperature: 110,
    speed: 100
  },
  {
    id: 3,
    name: "V-003",
    voltage: 300,
    current: 90,
    temperature: 80,
    speed: 35
  }
];

export default class Vehicle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
	    vehicle : {
	    	id: 0,
	    	name: "",
	    	voltage: 0,
        current: 0,
        temperature: 0,
	    	speed: 0
    	},
      voltageScope: {
        unit: "V",
        defaultVal: 0,
        maxVal: 300,
        minVal: 0,
        warningVal: 200,
        dangerVal: 240
      },
      currentScope: {
        unit: "A",
        defaultVal: 0,
        maxVal: 100,
        minVal: 0,
        warningVal: 20,
        dangerVal: 90
      },
      temperatureScope: {
        unit: "F",
        defaultVal: 0,
        maxVal: 250,
        minVal: 0,
        warningVal: 105,
        dangerVal: 212
      } 
    };

  }

  componentWillMount() {
    var vid = this.getUrlParam("vid", 0);
    var vFiltered = vehicles.filter( function(item) {
      return item.id == vid;
    });
    if (vFiltered.length > 0) 
      this.setState({vehicle: vFiltered[0]});
  }

  getUrlParam(key, defaultVal) {
    if (!key) return defaultVal;

    var searchParams = new URLSearchParams(window.location.search);
    if (!searchParams || searchParams.length < 1) return defaultVal;

    for (let p of searchParams) {
      if (p[0] === key) return p[1];
    }

    return defaultVal;
  }

  render () {
  	return (
	    <div className="container">
	    	<div className="row" align-items-center no-gutters 
	    		style={{padding: "20px", margin: "10px"}}>
		    	<div className="col-sm-2" />
		    	<div className="col-sm-2">
		    		<ProcessesView label="Voltage" value={this.state.vehicle.voltage} 
              processScope={this.state.voltageScope}/>
		    	</div>
		    	<div className="col-sm-1" />
		    	<div className="col-sm-2">
		    		<ProcessesView label="Current" value={this.state.vehicle.current} 
              processScope={this.state.currentScope}/>
		    	</div>
		    	<div className="col-sm-1" />
		    	<div className="col-sm-2">
		    		<ProcessesView label="Temperature" value={this.state.vehicle.temperature} 
              processScope={this.state.temperatureScope}/>
		    	</div>
		    	<div className="col-sm-2" />
	    	</div>
	    	<div className="row">
		    	<div className="col-sm-1" />
		    	<div className="col-sm-10 text-center">
		    		<GaugesView vehicle={this.state.vehicle} />
		    	</div>
		    	<div className="col-sm-1" />
	    	</div>
	    	<div className="row align-items-center ">
		    	<div className="col-sm-1" />
		    	<div className="col-sm-10 text-center">
		    		<ChartsStatic />
		    	</div>
		    	<div className="col-sm-1" />
	    	</div>
	    </div>
	);
  }
}

ReactDOM.render(<Vehicle />, document.getElementById('vehicle'));