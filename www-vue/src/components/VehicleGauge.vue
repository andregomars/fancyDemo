<template>
	<div>
		<div class="container">
			<div class="row">
				<div class="col-sm-2" />
				<div class="col-sm-3">
			    	<canvas data-type="radial-gauge"
					data-title="SOC"
					data-minValue="0"
					data-maxValue="150"
					:data-value="vehicle.speed"   
					data-valueInt="3"
					data-valueDec="0"
					data-width="200" />
				</div>
				<div class="col-sm-2" />
				<div class="col-sm-3">
			    	<canvas data-type="radial-gauge"
					data-title="MPH"
					data-minValue="0"
					data-maxValue="100"
					:data-value="vehicle.speed"   
					data-valueInt="3"
					data-valueDec="0"
					data-width="200" />
				</div>
				<div class="col-sm-2" />
			</div>
		</div>
	</div>
</template>

<script>
import RadialGauge from 'canvas-gauges';

export default {
	name: "vehicle-gauge",
	props: {
		vehicle: {
			type: Object
		}
	}
}
</script>

