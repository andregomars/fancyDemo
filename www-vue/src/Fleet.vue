<script>
import Vue from 'vue'
import DataTable from './components/DataTable'
import VueResource from 'vue-resource';

Vue.use(VueResource);

new Vue({
  el: '#app',
  template: `<DataTable :items="list" />`,
  components: { DataTable },
  created: function() {
    this.getData();
  },
  methods: {
    getData() {
      var url = this.getUrl();
      var resource = this.$resource(url);
      resource.get().then(response => {
        this.list = response.body;
      });
    },
    getUrl() {
      let urls = [
        "http://www.mocky.io/v2/58789d370f0000a71f0d49ed"
        ,"http://www.mocky.io/v2/587d44fc0f00004e0c5df626"
        ,"http://www.mocky.io/v2/587d47d50f0000930c5df627"
        ,"http://www.mocky.io/v2/587d49050f0000aa0c5df629"
        ,"http://www.mocky.io/v2/587d49960f0000bd0c5df62a"
        ];
      return urls[Math.floor(Math.random()*urls.length)];
    },
  },
  data () {
    return {
      list: []
    }
  }
})
</script>


