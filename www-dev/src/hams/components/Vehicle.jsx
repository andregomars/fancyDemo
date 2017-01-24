import React from 'react';
import ReactDOM from 'react-dom';

import ProcessesView from './VehicleProgress.jsx';
import GaugesView from './VehicleGauge.jsx';


const vehicles = [
  {
    id: 0,
    name: "V-000",
    voltage: 50,
    speed: 75
  },
  {
    id: 1,
    name: "V-001",
    voltage: 110,
    speed: 45
  },
  {
    id: 2,
    name: "V-002",
    voltage: 220,
    speed: 100
  },
  {
    id: 3,
    name: "V-003",
    voltage: 300,
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
	    	speed: 0
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
	    <div>
	    	<ProcessesView vehicle={this.state.vehicle} />
	    	<GaugesView vehicle={this.state.vehicle} />
	    </div>
	);
  }
}

ReactDOM.render(<Vehicle />, document.getElementById('vehicle'));