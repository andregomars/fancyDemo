<template>
	<div>
		<div class="container">
			<div class="row" align-items-center no-gutters 
				style="padding:20px;margin:10px">
		    	<div class="col-sm-2" />
		    	<div class="col-sm-2">
		    		<VehicleProgress label="Voltage" :value="vehicle.voltage" 
              :processScope="voltageScope" />
		    	</div>
		    	<div class="col-sm-1" />
		    	<div class="col-sm-2">
		    		<VehicleProgress label="Current" :value="vehicle.current" 
              :processScope="currentScope" />
		    	</div>
		    	<div class="col-sm-1" />
		    	<div class="col-sm-2">
		    		<VehicleProgress label="Temperature" :value="vehicle.temperature" 
              :processScope="temperatureScope" />
		    	</div>
		    	<div class="col-sm-2" />
			</div>
			<div class="row">
		    	<div class="col-sm-1" />
		    	<div class="col-sm-10 text-center">
		    		<VehicleGauge :vehicle="vehicle" />
		    	</div>
		    	<div class="col-sm-1" />
			</div>
			<div class="row align-items-center ">
		    	<div class="col-sm-1" />
		    	<div class="col-sm-10 text-center">
		    		<VehicleChartsStatic />
		    	</div>
		    	<div class="col-sm-1" />
			</div>
		</div>	
	</div>
</template>

<script>
import VehicleProgress from './VehicleProgress'
import VehicleGauge from './VehicleGauge'
import VehicleChartsStatic from './VehicleChartsStatic'

export default {
  name: 'vehicle',
  components: { VehicleProgress, VehicleGauge, VehicleChartsStatic },
  created() {
  	var vid = this.getUrlParam("vid", 0);
    var vFiltered = this.vehicles.filter( function(item) {
      return item.id == vid;
    });
    if (vFiltered.length > 0) 
      this.vehicle = vFiltered[0];
  },
  methods: {
  	  getUrlParam(key, defaultVal) {
	    if (!key) return defaultVal;

	    var searchParams = new URLSearchParams(window.location.search);
	    if (!searchParams || searchParams.length < 1) return defaultVal;

	    for (let p of searchParams) {
	      if (p[0] === key) return p[1];
	    }

	    return defaultVal;
	  }
  },
  data () {
    return {
      msg: 'Welcome to Vehicle Page!',
      vehicles : [
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
	  }],
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
    }
  }
}
</script>
