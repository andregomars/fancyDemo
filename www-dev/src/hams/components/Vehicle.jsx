import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import ProcessesView from './VehicleProgress.jsx';
import GaugesView from './VehicleGauge.jsx';
import ChartsStatic from './VehicleChartsStatic.jsx';

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
    this.getData();
  }

  getData() {
    $.ajax({
      url: "http://www.mocky.io/v2/589ebc1f270000ab24ed0efe",
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.getVehicle(data);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }

  getVehicle(vehicles) {
    if (!vehicles || vehicles.length === 0) return;
    var vid = this.getUrlParam("vid", 0);
    var vFiltered = vehicles.filter( function(item) {
      return item.vid === vid;
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