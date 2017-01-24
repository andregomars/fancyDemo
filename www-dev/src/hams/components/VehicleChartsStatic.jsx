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
		            "label": "SOC",
		            "type": "number"
		        },
		        		        {
		            "label": "Range",
		            "type": "number"
		        }
		    ],
		    "options": {
		    		"title": "SOC | Range",
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
		            70
		        ],
		        [
		            "11:49",
		            50,
		            30
		        ],
		        [
		            "12:49",
		            30,
		            55
		        ],
		        [
		            "13:49",
		            5,
		            15
		        ],
		        [
		            "14:49",
		            25,
		            22
		        ],
		        [
		            "15:49",
		            45,
		            35
		        ],
		        [
		            "16:49",
		            30,
		            60
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