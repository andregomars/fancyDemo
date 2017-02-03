<script>
import Vue from 'vue'
import DataTable from './components/DataTable'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: `<DataTable :items="list" />`,
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


