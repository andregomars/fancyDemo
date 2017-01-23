import React from 'react';
import ReactDOM from 'react-dom';

import ProcessesView from './VehicleProgress.jsx';
import GaugesView from './VehicleGauge.jsx';

export default class Vehicle extends React.Component {
  render () {
  	return (
	    <div>
	    	<ProcessesView />
	    	<GaugesView />
	    </div>
	);
  }
}

ReactDOM.render(<Vehicle />, document.getElementById('vehicle'));