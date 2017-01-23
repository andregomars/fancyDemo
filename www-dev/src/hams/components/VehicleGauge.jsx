import React from 'react';
import ReactDOM from 'react-dom';
import RadialGauge from 'canvas-gauges';

export default class VehicleGauge extends React.Component {
  render () {
    return (
    	<div className="container">
    		<div className="row">
    			<div className="col-sm-4">
			    	<canvas data-type="radial-gauge"
					data-title="MPH"
					data-minValue="0"
					data-maxValue="100"
					data-value="30"   
					data-valueInt="3"
					data-valueDec="0"
					data-width="200" />
				</div>
				<div className="col-sm-8">
				</div>
			</div>
		</div>
	);
  }
}

