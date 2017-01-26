import React from 'react';
import ReactDOM from 'react-dom';
import { Chart } from 'react-google-charts';

export default class VehicleChartsStatic extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		    "chartType": "LineChart",
		    "columns": [
		        {
		            "label": "time",
		            "p": {},
		            "type": "string"
		        },
		        {
		            "label": "Energy",
		            "type": "number"
		        },
		        {
		            "label": "Voltage",
		            "type": "number"
		        },
		        {
		            "label": "Current",
		            "type": "number"
		        },
		        {
		            "label": "Temperature",
		            "type": "number"
		        }
		    ],
		    "options": {
		    		"title": "Energy | Voltage | Current | Temperature",
		        "hAxis": {
		            "title": "Time",
		            "format": "h:mm a"
		        },
		        "legend": true,
		        "vAxis": {
		            "title": "Percentage"
		        }
		    },
		    "rows": [
		        [
		            "10:49",
		            80,
		            70,
		            40,
		            30,
		        ],
		        [
		            "11:49",
		            50,
		            60,
		            40,
		            60
		        ],
		        [
		            "12:49",
		            30,
		            55,
		            50,
		            70
		        ],
		        [
		            "13:49",
		            25,
		            35,
		            40,
		            80
		        ],
		        [
		            "14:49",
		            25,
		            22,
		            40,
		            65
		        ],
		        [
		            "15:49",
		            45,
		            35,
		            40,
		            45
		        ],
		        [
		            "16:49",
		            30,
		            60,
		            40,
		            40
		        ]
		    ],
		    "width": "100%",
		    "height": "300px"
		}	
	}

	render() {
		return (
			<div> 
			  <Chart 
					chartType="LineChart" 
					graph_id="LineChart"
					columns={this.state.columns}
					options={this.state.options}
					rows={this.state.rows}
					width={this.state.width}
					height={this.state.height}
					legend_toggle
			   />
			</div>
			)
	}
}