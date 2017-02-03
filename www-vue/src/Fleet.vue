<template>
  <div id="fleet">
  	<div id="fleet">
  		<datatable :items="list"/>
  		<h1>head</h1>
  	</div>
  </div>
</template>

<script>
import Vue from 'vue'
import DataTable from './components/DataTable'

// var list = [{
//             "name": "Andre Shen",
//             "selected": true,
//             "status": "Employed"
//         },
//         {
//             "name": "Carol Liu",
//             "status": "Unemployed"
//         },
//         {
//             "name": "Steve Jobs",
//             "selected": true,
//             "status": "Employed"
//         }]

/* eslint-disable no-new */
new Vue({
  el: '#app',
  //template: '<DataTable :items="list" />',
  template: '#fleet',
  components: { DataTable },
  data () {
    return {
      list: [
        {
            "name": "Andre Shen",
            "selected": true,
            "status": "Employed"
        },
        {
            "name": "Carol Liu",
            "status": "Unemployed"
        },
        {
            "name": "Steve Jobs",
            "selected": true,
            "status": "Employed"
        }]
    }
  }
})
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
