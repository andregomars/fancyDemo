<template>
  <table class="table">
    <thead>
      <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Status</th>
      </tr>
    </thead>
    <tbody>
        <tr v-for="(row, index) in items">
          <th>{{index}}</th>
          <td>{{row.name}}</td>
          <td>{{row.status}}</td>
        </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'datatable',
  props: {
    items: {
      type: Array
    }
  },
  // data () {
  //   return {
  //     items: [
  //       {
  //           "name": "Andre Shen",
  //           "selected": true,
  //           "status": "Employed"
  //       },
  //       {
  //           "name": "Carol Liu",
  //           "status": "Unemployed"
  //       },
  //       {
  //           "name": "Steve Jobs",
  //           "selected": true,
  //           "status": "Employed"
  //       }]
  //   }
  // }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
