<template>
	<div> 
	  <vue-chart 
			:chart-type="chartType" 
			:graph-id="LineChart"
			:columns="columns"
			:options="options"
			:rows="rows"
			:width="width"
			:height="height"
	   />
	</div>
</template>

<script>
import Vue from 'vue'
import VueCharts from 'vue-charts'

Vue.use(VueCharts)

export default {
	name: "vehicle-charts-static",
	data() {
		return {
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
}
</script>
