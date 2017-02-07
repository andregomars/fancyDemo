<template>
   <div>
    {{label}}: 
    <div class="progress" >
      <div :class="processClass" :style="processStyle">
        {{value}}{{processScope.unit}}
      </div>
    </div>
  </div> 
</template>

<script>
export default {
  name: "vehicle-progress",
  computed: {
    processStyle: function() {
      var percentage = this.getProcessPercentage();
      return "width: " + percentage + "%";
    },
    processClass: function() {
      var color = this.getProgressColor();
      return "progress-bar progress-bar-striped " + color;
    }
  },
  methods: {
    getProcessPercentage() {
      var max = this.processScope.maxVal;
      var val = this.value;
      return val > max ? 100 : Math.round(val*100/max);
    },

    getProgressColor() {
      var val = this.value;
      if (val < this.processScope.warningVal) return this.bgStyle.success;
      else if (val > this.processScope.dangerVal) return this.bgStyle.danger;
      else return this.bgStyle.warning;
    }
  },
  props: {
    label: {
      type: String
    },
    value: {
      type: Number
    },
    processScope: {
      type: Object
    }
  },
  data() {
    return {
      bgStyle: {
        success: "bg-success",
        warning: "bg-warning",
        danger: "bg-danger"
      }
    }
  }
}
</script>



