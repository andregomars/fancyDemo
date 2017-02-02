<template>
  <div id="app">
  </div>
</template>

<script>
import Vue from 'vue'
import Hello from './components/Hello'
import DataTable from './components/DataTable'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<DataTable/>',
  components: { DataTable }
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
