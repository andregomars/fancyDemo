<script>
import Vue from 'vue'
import VueResource from 'vue-resource';

import DataTable from './components/DataTable'
import Cards from './components/Cards'


Vue.use(VueResource);

Vue.component("cards-view-button", {
  template: `
    <button class="btn btn-link" v-on:click="say('hi')" >
      <i class="fa fa-th-large fa-2x" />
    </button>
  `,
  props: ["click"],
  methods: {
    say(msg) {
      alert(msg);
    } 
  }

})

Vue.component("table-view-button", {
  template: `
    <button className="btn btn-link" >
      <i className="fa fa-list fa-2x" />
    </button>
  `
})

new Vue({
  el: '#app',
  template: `
    <div class="container">
      <div class="row m-3">
        <div class="col text-right">
          <div class="btn-group">
            <cards-view-button v-if="viewComponent === 'tableview'"
              click=this.$root.handleCardsViewToggle />
            <table-view-button v-else-if="viewComponent === 'cardsview'"
              v-on:click="handleTableViewToggle" />
            <div v-else />
          </div>
        </div>
      </div>
      <div class="row m-3">
        <div class="col">
          <DataTable v-if="viewComponent === 'tableview'" :items="list"  />
          <Cards v-else-if="viewComponent === 'cardsview'" :items="list"  />
          <div v-else />
        </div>
      </div>
    </div>
  `,
  components: { DataTable, Cards },
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
    handleCardsViewToggle() {
      viewComponent = "cardsview";
    },
    handleTableViewToggle() {
      viewComponent = "tableview";
    }, 

  },
  data () {
    return {
      list: [],
      viewComponent: "tableview"
    }
  }
})
</script>


